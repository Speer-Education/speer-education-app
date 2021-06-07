import {
    useState,
    useEffect,
    useContext,
    createContext,
} from 'react';
import {  auth, db, rtdb } from '../config/firebase';
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
        return user.getIdTokenResult(true).then(({ claims:{ user_id, studentId, userGroups, email} }) => {
            setUser({
                uid:user_id,
                studentid:studentId,
                userGroups:userGroups,
                email:email
            });
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
            rtdb.ref(`refreshtoken/${user.uid}`).on('value', snap => {
                if (snap.val() > 0) {
                    console.log('Updating user claims')
                    rtdb.ref(`refreshtoken/${user.uid}`).set(0);
                    getUserAdditionalData(user);
                }
            })
            return () => rtdb.ref(`refreshtoken/${user.uid}`).off();
        }
    }, []);

    useEffect(() => {
        if (user?.uid) {
            // Subscribe to user document on mount
            const unsubscribe = db
                .collection('users')
                .doc(user.uid)
                .onSnapshot((doc) => setUser(doc.data()));
            return () => unsubscribe();
        }
    }, []);

    const signOut = () => {
        return auth.signOut().then(() => setUser(false));
    };

    return { user, signInWithEmailAndPassword, signOut, initGoogleSignIn, initFacebookSignIn };
};