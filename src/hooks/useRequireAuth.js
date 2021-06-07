import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

export const useRequireAuth = () => {
    const auth = useAuth();
    useEffect(() => {
        if (auth.user === false) {
            console.log('user not signed in')
            //Do something if user is not signed in like route to login page?
        }
    }, [auth]);

    return auth;
};
