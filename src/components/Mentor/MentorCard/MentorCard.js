import './MentorCard.css'
import ProfilePicture from '../../User/ProfilePicture';
import SendIcon from '@material-ui/icons/Send';
import { db, firebase } from '../../../config/firebase';
import { useAuth } from '../../../hooks/useAuth';
import { useState } from 'react';
import history from '../../../hooks/history';
import Spinner from '../../Loader/Spinner';
import { getMessageUserRoom } from '../../../utils/chats';

const MentorCard = ({ id, name, school, major, bio, highlight1, highlight2 }) => {
    const [message, setMessage] = useState("");
    const { user, userDetails } = useAuth();
    const [sendingMessage, setSendingMessage] = useState(false);


    const connectWithMentor = async () => {
        /* Send Mentor ID to backend for checking and room creation */
        if(!user?.uid || !userDetails || sendingMessage) return;
        setSendingMessage(true)
        //send it in as profile id instead of mentor id (will need to change the backend so this still works)
        try {
            const targetRoomId = await getMessageUserRoom(id, user.uid)
            await db.collection(`rooms/${targetRoomId}/messages`).add({
                date: firebase.firestore.Timestamp.now(),
                message: message || "Hi 👋",
                senderId: user?.uid,
                messageType: "text",
                recipientIds: [ id ],
                senderUsername: userDetails.name
            })
            history.push(`/app/messages/${targetRoomId}`)
        } catch (e) {
            setSendingMessage(false)
            console.error(e)
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-lg flex flex-col items-center p-3 mt-16 min-h-80 transition-transform transform hover:scale-105 duration-200 cursor-pointer" style={{flex: "1 0 30%", width: '17.5rem'}}>
            <ProfilePicture uid={id} alt="mentor" className="w-28 h-28 transform rounded-full -mt-16 border-white border-8 border-solid shadow-lg" style={{aspectRatio: '1'}} onClick={() => history.push(`/app/profile/${id}`)}/>
            <div className="mt-2 space-y-2 h-full flex flex-col w-full">
                <div className="space-y-1 text-center transform" onClick={() => history.push(`/app/profile/${id}`)}>
                    <h3 className="font-medium">{name}</h3>
                    <p className="text-md text-gray-600">Mentor @ {school}</p>
                </div>
                <div className="space-y-1 text-center flex-1 transform" onClick={() => history.push(`/app/profile/${id}`)}>
                    <p className="text-md text-gray-600">{major}</p>
                    <p className="text-sm text-gray-600">{bio.substring(0, 125)}</p>
                    <p>
                        <span className="text-sm text-gray-600 pr-1">{highlight1?.emoji}</span>
                        <span className="text-sm text-gray-600">{highlight1?.description}</span>
                    </p>
                    <p>
                        <span className="text-sm text-gray-600 pr-1">{highlight2?.emoji}</span>
                        <span className="text-sm text-gray-600">{highlight2?.description}</span>
                    </p>
                </div>
                <div className="flex flex-row w-full">
                    <input 
                        className="shadow-lg rounded-xl px-2 py-3 border-0 flex-1 focus:border-0" 
                        placeholder="Break the ice. Say Hi 👋" 
                        disabled={sendingMessage}
                        value={message} 
                        onChange={e => setMessage(e.target.value)}/>
                    <button 
                        type="button"
                        disabled={sendingMessage}
                        className="shadow-lg rounded-xl p-2 bg-yellow-500 border-0 ml-2" 
                        onClick={connectWithMentor}>
                        {!sendingMessage?<SendIcon className="w-8 h-8 text-white"/>: <Spinner className="w-6 h-6 text-white"/>}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MentorCard;
