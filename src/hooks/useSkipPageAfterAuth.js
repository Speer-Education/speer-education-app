import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import history from './history';

export const useSkipPageAfterAuth = () => {
    const auth = useAuth();
    useEffect(() => {
        if (auth.user) {
            history.push(`/app`);
        }
    }, [auth]);
};
