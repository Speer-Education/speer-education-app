import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import styles from './UserMenu.css'

const UserAvatar = ({ url, setOpen }) => {
    return <button className="lg:w-12 lg:h-12 rounded-full w-10 h-10 border-blue-500 border-2 overflow-hidden shadow-xl cursor-pointer" onClick={() => setOpen(prevOpen => !prevOpen)}>
        <img className="h-full w-full object-cover" src={url} alt="avatar" />
    </button>
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
    
    return <div ref={wrapperRef} className={`${open ? 'block' : 'hidden'} absolute break-words right-0 w-40 mt-1 py-2 bg-white dark:bg-gray-800 rounded shadow-2xl z-50 ${styles.dropdown_menu}`}>
        <p className="dark:text-gray-400 font-light text-xs px-4 py-2">{user.email}</p>
        <a href="/app" className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 dark:text-gray-100 rounded dark:hover:bg-blue-700 hover:bg-blue-300">
            Dashboard
        </a>
        <a href="/app/mentors" className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 dark:text-gray-100 rounded dark:hover:bg-blue-700 hover:bg-blue-300">
            Connect With Mentors
        </a>
        <a href="/app/editProfile" className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 dark:text-gray-100 rounded dark:hover:bg-blue-700 hover:bg-blue-300">
            Edit Profile
        </a>
        <a href="/app/messages" className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 dark:text-gray-100 rounded dark:hover:bg-blue-700 hover:bg-blue-300">
            Messages
        </a>
        <a href="/" className="cursor-pointer transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 dark:text-gray-100 rounded dark:hover:bg-blue-700 hover:bg-blue-300"
            onClick={() => signOut()}>
            Logout
        </a>
    </div>
}

const UserMenu = () => {
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    if (!user) return <a className="text-red-800 font-semibold" href="/login">Sign In</a>;
    return <div className="relative" >
        <UserAvatar url={user.photoURL} setOpen={setOpen}/>
        <UserDropdown user={user} open={open} setOpen={setOpen}/>
    </div>
}

export { UserMenu }