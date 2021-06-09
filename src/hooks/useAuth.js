import { useState, useEffect, useContext, createContext } from "react";
import { auth, db, rtdb, firebase } from "../config/firebase";
import history from './history';

import {
    useHistory,
    useLocation
} from "react-router-dom";
const authContext = createContext({ user: {} });
const { Provider } = authContext;


export function AuthProvider({ children }) {
    const auth = useAuthProvider();
    return <Provider value={auth}>{children}</Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

const useAuthProvider = () => {
    const [user, setUser] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    let lastCommitted;

    const signInWithEmailAndPassword = async ({ email, password }) => {
        let response = await auth
            .signInWithEmailAndPassword(email, password)
            .catch((error) => {
                return { error };
            });
        console.log("sign in successful");
    };
    const initGoogleSignIn = async () => {
        let response = await auth
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
    const initFacebookSignIn = async () => {
        let response = await auth
            .signInWithRedirect(new firebase.auth.FacebookAuthProvider())
            .catch((error) => {
                return { error };
            });
        console.log("sign in successful");
    };
    const getUserTokenResult = async (refresh) => {
        if (!user) return;
        let { claims } = await user.getIdTokenResult(refresh);
        if (!claims.finishSetup) {
            console.log(history.location.pathname)
            history.push('/onboarding');
        } else if(history.location.pathname.startsWith('/onboarding')) {
            history.push('/main-app');
        }
        return claims
    };

    const handleAuthStateChanged = (user) => {
        if (user) {
            setUser(user);
            console.log("sign in successful");
        } else {
            setUser(false);
        }
    };

    useEffect(() => {
        const unsub = auth.onAuthStateChanged(handleAuthStateChanged);
        return () => unsub();
    }, []);

    useEffect(() => {
        if (user?.uid) {
            return db.doc(`user_claims/${user.uid}`).onSnapshot(async (snap) => {
                const data = snap.data();
                if (lastCommitted && !data._lastCommitted.isEqual(lastCommitted)) {
                    setUserDetails({ ...userDetails, ... await getUserTokenResult(true) })
                    console.log("Refreshing token");
                }
                lastCommitted = data._lastCommitted;
            });
        }
    }, [user]);

    useEffect(() => {
        if (user?.uid) {
            // Subscribe to user document on mount
            const unsubscribe = db
                .collection("users")
                .doc(user.uid)
                .onSnapshot(async (doc) => {
                    setUserDetails({ ...doc.data(), ... await getUserTokenResult() })
                });
            return () => unsubscribe();
        }
    }, [user]);

    // Debug Use
    // useEffect(() => {
    //     console.log(userDetails)
    // }, [userDetails])

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
