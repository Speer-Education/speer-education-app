import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import styles from './UserMenu.css'

const UserAvatar = ({ url, setOpen }) => {
    return <button className="lg:w-12 lg:h-12 rounded-full w-10 h-10 border-blue-500 border-2 overflow-hidden shadow-xl" onClick={() => setOpen(prevOpen => !prevOpen)}>
        <img className="h-full w-full object-cover" src={url} alt="avatar" />
    </button>
}

const UserDropdown = ({ user, open }) => {
    const { signOut } = useAuth();
    return <div className={`${open ? 'block' : 'hidden'} absolute break-words right-0 w-40 mt-1 py-2 bg-white dark:bg-gray-800 rounded shadow-2xl z-50 ${styles.dropdown_menu}`}>
        <p className="dark:text-gray-400 font-light text-xs px-4 py-2">{user.email}</p>
        <a href="#" className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 dark:text-gray-100 rounded dark:hover:bg-blue-700 hover:bg-blue-300">
            Student Info
        </a>
        <a className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 dark:text-gray-100 rounded dark:hover:bg-blue-700 hover:bg-blue-300"
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
        <UserDropdown user={user} open={open} />
    </div>
}

export { UserMenu }