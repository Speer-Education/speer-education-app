import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const useSkipPageAfterAuth = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (auth.user) {
            navigate(`/`);
        }
    }, [auth]);
};
