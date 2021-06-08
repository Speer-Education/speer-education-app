import {
    useState,
    useEffect,
    useContext,
    createContext,
} from 'react';
import {  auth, db, rtdb, firebase } from '../config/firebase';
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
    let lastCommitted;

    const signInWithEmailAndPassword = ({email, password}) => {
        return auth.signInWithEmailAndPassword(email, password)
            .then((response) => {
                console.log('sign in successful');
                getUserAdditionalData(response.user);
                return response.user;
            })
            .catch((error) => {
                return { error };
            });
    };
    const initGoogleSignIn = () => {
        return auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider().setCustomParameters({
            prompt: 'select_account'
         }))
            .then((response) => {
                console.log('sign in successful');
                getUserAdditionalData(response.user);
                return response.user;
            })
            .catch((error) => {
                return { error };
            });
    };
    const initFacebookSignIn = () => {
        return auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
            .then((response) => {
                console.log('sign in successful');
                getUserAdditionalData(response.user);
                return response.user;
            })
            .catch((error) => {
                return { error };
            });
    };
    const getUserAdditionalData = (user) => {
        if(!user) return;
        return user.getIdTokenResult(true).then(({ claims }) => {
            setUser(user,...claims);
        })
    };

    const handleAuthStateChanged = (user) => {
        if (user) {
            console.log('sign in successful');
            getUserAdditionalData(user);
        } else {
            setUser(false)
        }
    };

    useEffect(() => {
        const unsub = auth.onAuthStateChanged(handleAuthStateChanged);
        return () => unsub();
    }, []);

    useEffect(() => {
        if (user?.uid) {
            return db.doc(`user_claims/${user.uid}`).onSnapshot( snap => {
                const data = snap.data()
                if (data) {
                    if (lastCommitted &&
                            !data._lastCommitted.isEqual(lastCommitted)) {
                        // Force a refresh of the user's ID token
                        console.log('Refreshing token')
                        user.getIdToken(true)
                    }
                    lastCommitted = data._lastCommitted
                    getUserAdditionalData(user);
                }
            })
        }
    }, [user]);

    useEffect(() => {
        if (user?.uid) {
            // Subscribe to user document on mount
            const unsubscribe = db
                .collection('users')
                .doc(user.uid)
                .onSnapshot((doc) => setUser(...user,doc.data()));
            return () => unsubscribe();
        }
    }, [user]);

    const signOut = () => {
        return auth.signOut().then(() => setUser(false));
    };

    return { user, signInWithEmailAndPassword, signOut, initGoogleSignIn, initFacebookSignIn };
};