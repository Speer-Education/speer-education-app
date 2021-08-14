import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import history from '../../../hooks/history';
import { useAuth } from '../../../hooks/useAuth';
import styles from './UserMenu.css'

const UserAvatar = ({ url, setOpen }) => {
    return <div className="flex flex-col px-3">
                <img className="w-6 h-6 lg:w-10 lg:h-10 overflow-hidden shadow-xl object-cover " src={url} alt="avatar" />
                <button className="border-none bg-transparent cursor-pointer" onClick={() => history.push('/app/profile')}>
                    <span className="pr-1 lg:text-base text-xs">Me</span><i className="fas fa-caret-down" style={{color: "#F58A07"}}></i>
                </button>
            </div>
}

const UserDropdown = ({ user, open, setOpen }) => {
    const { signOut } = useAuth();
    const wrapperRef = useRef(null);
    useEffect(() => {
        if(!open) return;
        
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setOpen(false);
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open, wrapperRef]);
    
    return <div ref={wrapperRef} className={`${open ? 'block' : 'hidden'} absolute break-words right-0 max-w-min mt-1 py-2 bg-white dark:bg-gray-800 rounded shadow-2xl z-50 ${styles.dropdown_menu}`}>
        <b className="whitespace-nowrap overflow-hidden dark:text-gray-400 font-light text-xs px-4 py-2">{user.email}</b>
        <br></br>
        <a href="/app/editProfile" className="no-underline transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 dark:text-gray-100 rounded dark:hover:bg-blue-700 hover:bg-blue-300">
                Edit Profile
        </a>
        <a href="/" className="cursor-pointer transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 dark:text-gray-100 rounded dark:hover:bg-blue-700 hover:bg-blue-300 no-underline"
            onClick={() => signOut()}>
            Log out
        </a>
    </div>
}

const UserMenu = () => {
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    if (!user) return <div></div>;
    return <div className="relative" >
        <UserAvatar url={user.photoURL} setOpen={setOpen}/>
        <UserDropdown user={user} open={open} setOpen={setOpen}/>
    </div>
}

export { UserMenu }