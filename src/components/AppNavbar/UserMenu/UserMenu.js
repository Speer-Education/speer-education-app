import history from '../../../hooks/history';
import { useAuth } from '../../../hooks/useAuth';


const UserMenu = () => {
    const { user } = useAuth();
    if (!user) return <div></div>;
    return <div className="relative" >
        <div className="flex flex-col px-3 cursor-pointer" onClick={() => history.push('/app/profile')}>
            <img className="w-6 h-6 lg:w-10 lg:h-10 overflow-hidden shadow-xl object-cover " src={user.photoURL} alt="avatar" />
            <button className="border-none bg-transparent cursor-pointer">
                <span className="pr-1 lg:text-base text-xs">Me</span><i className="fas fa-caret-down" style={{color: "#F58A07"}}></i>
            </button>
        </div>
    </div>
}

export { UserMenu }