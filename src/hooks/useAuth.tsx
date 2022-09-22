import { useState, useEffect, useContext, createContext, PropsWithChildren } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, db, rtdb } from "../config/firebase";
import { UserClaims, UserDetailsDocument } from "../types/User";
import { logEvent, setUserProperties } from "../utils/analytics";
import { useLocalStorage } from "./useHooks";
import { useAuthState } from "react-firebase-hooks/auth";
import {
    EmailAuthProvider,
    ParsedToken,
    reauthenticateWithCredential,
    signOut,
    updatePassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithCredential,
} from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { onDisconnect, onValue, ref, serverTimestamp, set } from "firebase/database";
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { Capacitor } from "@capacitor/core";
import {useSnackbar} from 'notistack';


//@ts-ignore //TODO: FIX THIS
const authContext = createContext<ReturnType<typeof useAuthProvider>>(null);
const { Provider } = authContext;

/**
 * @component
 * @param {props} props children that require access to the useAuth hook
 * @returns {Provider}
 */
export function AuthProvider({ children }: PropsWithChildren<{}>) {
    const auth = useAuthProvider();
    return <Provider value={auth}>{children}</Provider>;
}

/**
 * The hook which contains the current state of user authentication
 * @returns authContext
 */
export const useAuth = () => {
    return useContext<ReturnType<typeof useAuthProvider>>(authContext);
};

/**
 * Logic required to run the auth methods for Firebase
 * @returns { user, userDetails, signInWithEmailAndPassword, signOut, initGoogleSignIn, initFacebookSignIn }
 */


//Use variable as userDetails might be immediately needed before react even renders
let appInstance = Date.now();

const useAuthProvider = () => {
    //@ts-ignore
    const [user, authing, authError] = useAuthState(auth); 
    const [userDetails, setUserDetails] = useState<UserDetailsDocument>();
    const [userToken, setUserToken] = useState<UserClaims>();
    const [lastCommitted, setLastCommitted] = useLocalStorage("lastCommited", 0);  //The last committed state of our user claims document, decides if token needs to update if outdated
    const navigate = useNavigate();
    const location = useLocation();
    const { enqueueSnackbar } = useSnackbar();
    
    useEffect(() => {
        if (authError) enqueueSnackbar(authError.message, { variant: 'error' });
    }, [authError, enqueueSnackbar]);

    /**
     * Sign in user with email and password login
     * @param {*} params Email and Password  
     */
    const emailSignIn = async ({ email, password }: { email: string, password: string }) => {
        await signInWithEmailAndPassword(auth, email, password)
            .catch((error) => {
                return { error };
            });
    };

    /**
     * Sign in user with a Google Account with a redirect
     */
    const initGoogleSignIn = async () => {
        const result = await FirebaseAuthentication.signInWithGoogle();
        // 2. Sign in on the web layer using the id token
        const credential = GoogleAuthProvider.credential(result.credential?.idToken);
        auth.onAuthStateChanged(user => {
            console.log('User: ' + user);
        });
        await signInWithCredential(auth, credential);
    };

    const isUsingPasswordLogin = () => {
        if(!user) return;
        return !!user.providerData.find((provider) => provider.providerId === "password");
    }

    const changePassword = async (oldPassword: string, newPassword: string) => {
        if(!user) return;
        if(!isUsingPasswordLogin()) throw new Error("Cannot change password without password login");
        await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email!, oldPassword));
        await updatePassword(user, newPassword);
    }

    /**
     * Get firebase user tokens with custom claims for permission use, only refreshes if is true
     * @param {boolean} refresh 
     * @returns userClaims
     */
    const getUserTokenResult = async (refresh: boolean = false) => {
        if (!user) return;
        let { claims } = await user.getIdTokenResult(refresh);
        //If user hasn't completed setup, redirect to onboarding page
        if (user && user != null && !user.emailVerified) {
            navigate("/verify");
        }
        else if (!claims.finishSetup && !location.pathname.startsWith('/onboarding')) {
            navigate('/onboarding');
        } else if((claims.finishSetup && location.pathname.startsWith('/onboarding'))) { //If user completed setup but is on onboarding page, redirect to app
            navigate('/');
            logEvent('Completed Onboarding');
        }
        return claims as ParsedToken & UserClaims;
    };

    useEffect(() => {
        if(!authing && user && location.pathname.startsWith('/login')) {
            navigate('/');
        }
    }, [user])

    //Attaches user claims documents to listen for changes in user permissions, if yes update token to ensure no permission errors
    useEffect(() => {
        if (!user) return;
        return onSnapshot(doc(db,`user_claims/${user.uid}`), async (snap) => {
            const data = snap.data();
            
            if(!data?._lastCommitted) return;

            if (lastCommitted && !(data?._lastCommitted || {}).isEqual(lastCommitted)) {
                const claims = await getUserTokenResult(true);
                if(claims) setUserToken(claims)
            }
            setLastCommitted(data?._lastCommitted);
        },
        error => {
            // console.log(error)
        });
    }, [user?.uid]); //Only reattach if user uid is updated :(

    //Attaches the user document to listen for changes in the document
    useEffect(() => {
        if (user?.uid) {
            // Subscribe to user document on mount
            const unsubscribe = onSnapshot(doc(db, "users", user.uid),
                async (doc) => {
                    //For analytics
                    setUserToken(await getUserTokenResult())
                    setUserDetails(doc.data() as UserDetailsDocument)
                    setUserProperties(user.uid, doc.data());
                });
            var userStatusDatabaseRef = ref(rtdb, '/status/' + user.uid);

            var isOfflineForDatabase = {
                version: process.env.REACT_APP_VERSION,
                state: 'offline',
                last_changed: serverTimestamp(),
            };

            var isOnlineForDatabase = {
                version: process.env.REACT_APP_VERSION,
                state: 'online',
                last_changed: serverTimestamp(),
            };
            onValue(ref(rtdb, '.info/connected'), function(snapshot) {
                // If we're not currently connected, don't do anything.
                if (snapshot.val() == false) return;
                
                onDisconnect(userStatusDatabaseRef).set(isOfflineForDatabase).then(function() {
                    set(userStatusDatabaseRef, isOnlineForDatabase);
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
    const signOutUser = () => {
        return signOut(auth).then(() => {
            logEvent('logout');
            if(!Capacitor.isNativePlatform()){
                window.location.replace('https://speeredu.com')
            } else {
                navigate('/login');
            }
            
        });
    };

    return {
        user: authing? undefined: user,
        userDetails,
        userToken,
        getUserTokenResult,
        appInstance,
        signInWithEmailAndPassword: emailSignIn,
        signOut: signOutUser,
        changePassword,
        get isUsingPasswordLogin() {
            return isUsingPasswordLogin();
        },
        initGoogleSignIn,
        authing
    };
};
