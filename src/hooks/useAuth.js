import { useState, useEffect, useContext, createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, db, firebase, rtdb } from "../config/firebase";
import { logEvent, setUserProperties } from "../utils/analytics";
import { useLocalStorage } from "./useHooks";

const authContext = createContext({ user: {} });
const { Provider } = authContext;

/**
 * @component
 * @param {props} props children that require access to the useAuth hook
 * @returns {Provider}
 */
export function AuthProvider({ children }) {
    const auth = useAuthProvider();
    return <Provider value={auth}>{children}</Provider>;
}

/**
 * The hook which contains the current state of user authentication
 * @returns authContext
 */
export const useAuth = () => {
    return useContext(authContext);
};

/**
 * Logic required to run the auth methods for Firebase
 * @returns { user, userDetails, signInWithEmailAndPassword, signOut, initGoogleSignIn, initFacebookSignIn }
 */

//Use variable as userDetails might be immediately needed before react even renders
let latestUserDetails = {}
let appInstance = Date.now();

const useAuthProvider = () => {
    const [user, setUser] = useState(null); 
    const [userDetails, setUserDetails] = useState(null);
    const [lastCommitted, setLastCommitted] = useLocalStorage("lastCommited", 0);  //The last committed state of our user claims document, decides if token needs to update if outdated
    const navigate = useNavigate();
    const location = useLocation();
    
    /**
     * Sign in user with email and password login
     * @param {*} params Email and Password  
     */
    const signInWithEmailAndPassword = async ({ email, password }) => {
        await auth
            .signInWithEmailAndPassword(email, password)
            .catch((error) => {
                return { error };
            });
    };

    /**
     * Sign in user with a Google Account with a redirect
     */
    const initGoogleSignIn = async () => {
        await auth
            .signInWithRedirect(
                new firebase.auth.GoogleAuthProvider().setCustomParameters({
                    prompt: "select_account",
                })
            )
            .catch((error) => {
                return { error };
            });
    };

    /**
     * Sign in user with a Facebook Account with a redirect
     */
    const initFacebookSignIn = async () => {
        await auth
            .signInWithRedirect(new firebase.auth.FacebookAuthProvider())
            .catch((error) => {
                return { error };
            });
    };

    /**
     * Get firebase user tokens with custom claims for permission use, only refreshes if is true
     * @param {boolean} refresh 
     * @returns userClaims
     */
    const getUserTokenResult = async (refresh) => {
        if (!user) return;
        let { claims } = await user.getIdTokenResult(refresh);
        
        //If user hasn't completed setup, redirect to onboarding page
        if (!claims.finishSetup && !location.pathname.startsWith('/onboarding')) {
            navigate('/onboarding');
        } else if(claims.finishSetup && (location.pathname.startsWith('/onboarding') || location.pathname.startsWith('/login'))) { //If user completed setup but is on onboarding page, redirect to app
            navigate('/');
            if(location.pathname.startsWith('/onboarding')) logEvent('Completed Onboarding');
        }
        return claims
    };

    /**
     * Handles when onAuthStateChanged is called, and sets user into User State
     * @param {firebase.auth.User} user 
     */
    const handleAuthStateChanged = (user) => {
        if (user) {
            setUser(user);
        } else {
            setUser(false);
        }
    };

    //Attaches the onAuthStateChanged to listen for changes in authentication eg: login, signout etc.
    useEffect(() => {
        const unsub = auth.onAuthStateChanged(handleAuthStateChanged);
        return () => unsub();
        }, []);
    
    //Attaches user claims documents to listen for changes in user permissions, if yes update token to ensure no permission errors
    useEffect(() => {
        if (!user) return;
        return db.doc(`user_claims/${user.uid}`).onSnapshot(async (snap) => {
            const data = snap.data();
            
            if(!data?._lastCommitted) return;

            if (lastCommitted && !(data?._lastCommitted || {}).isEqual(lastCommitted)) {
                setUserDetails({ ...(await getUserTokenResult(true)), ...latestUserDetails })
            }
            setLastCommitted(data?._lastCommitted);
        },
        error => {
            console.log(error)
        });
    }, [user?.uid]); //Only reattach if user uid is updated :(

    //Attaches the user document to listen for changes in the document
    useEffect(() => {
        if (user?.uid) {
            // Subscribe to user document on mount
            const unsubscribe = db
                .collection("users")
                .doc(user.uid)
                .onSnapshot(async (doc) => {
                    latestUserDetails = { ...(await getUserTokenResult()), ...doc.data() }

                    //For analytics
                    setUserProperties(user.uid, latestUserDetails);

                    setUserDetails(latestUserDetails)
                });
            var userStatusDatabaseRef = rtdb.ref('/status/' + user.uid);

            var isOfflineForDatabase = {
                version: process.env.REACT_APP_VERSION,
                state: 'offline',
                last_changed: firebase.database.ServerValue.TIMESTAMP,
            };

            var isOnlineForDatabase = {
                version: process.env.REACT_APP_VERSION,
                state: 'online',
                last_changed: firebase.database.ServerValue.TIMESTAMP,
            };
            firebase.database().ref('.info/connected').on('value', function(snapshot) {
                // If we're not currently connected, don't do anything.
                if (snapshot.val() == false) return;

                userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function() {
                    userStatusDatabaseRef.set(isOnlineForDatabase);
                });
            });

            return () => unsubscribe();
        }
    }, [user]);

    // Debug Use
    // useEffect(() => {
    //     console.log(userDetails)
    // }, [userDetails])

    /**
     * Signs out the current user
     * @returns null
     */
    const signOut = () => {
        return auth.signOut().then(() => {
            setUser(false);
            logEvent('logout');
            window.location.replace('https://speeredu.com')
        });
    };

    return {
        user,
        userDetails,
        getUserTokenResult,
        appInstance,
        signInWithEmailAndPassword,
        signOut,
        initGoogleSignIn
    };
};
