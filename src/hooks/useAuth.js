import { useState, useEffect, useContext, createContext } from "react";
import { auth, db, firebase } from "../config/firebase";
import history from './history';
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
const useAuthProvider = () => {
    const [user, setUser] = useState(null); 
    const [userDetails, setUserDetails] = useState(null);
    const [lastCommitted, setLastCommitted] = useLocalStorage("lastCommited", 0);  //The last committed state of our user claims document, decides if token needs to update if outdated

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
        console.log("sign in successful");
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
        console.log("sign in successful");
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
        console.log("sign in successful");
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
        if (!claims.finishSetup) {
            console.log(history.location.pathname)
            history.push('/onboarding');
        } else if(history.location.pathname.startsWith('/onboarding')) { //If user completed setup but is on onboarding page, redirect to app
            history.push('/app');
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
            console.log("sign in successful");
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
        if (user?.uid) {
            return db.doc(`user_claims/${user.uid}`).onSnapshot(async (snap) => {
                console.log(lastCommitted)
                const data = snap.data();
                if (lastCommitted && !data._lastCommitted.isEqual(lastCommitted)) {
                    setUserDetails({ ...await getUserTokenResult(true), ...userDetails })
                    console.log("Refreshing token");
                }
                setLastCommitted(data?._lastCommitted);
            });
        }
    }, [user?.uid]); //Only reattach if user uid is updated :(

    //Attaches the user document to listen for changes in the document
    useEffect(() => {
        if (user?.uid) {
            // Subscribe to user document on mount
            const unsubscribe = db
                .collection("users")
                .doc(user.uid)
                .onSnapshot(async (doc) => {
                    setUserDetails({ ...await getUserTokenResult(), ...doc.data() })
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
        return auth.signOut().then(() => setUser(false));
    };

    return {
        user,
        userDetails,
        signInWithEmailAndPassword,
        signOut,
        initGoogleSignIn,
        initFacebookSignIn,
    };
};
