import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';


const UserMenu = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    if (!user) return <div></div>;
    return <div className="relative" >
        <div className="flex flex-col px-3 cursor-pointer" onClick={() => navigate('/profile')}>
            <img 
                className={`w-6 h-6 lg:w-10 lg:h-10 overflow-hidden transition-all duration-150 shadow-lg hover:shadow-xl object-cover rounded-full  ${('/profile' === location.pathname) ? 'border-2 border-solid border-[#F58A07]' : ''}`} 
                src={`${user.photoURL}?${Date.now()}`} 
                alt="avatar" />
        </div>
    </div>
}

export { UserMenu }