import './MentorCard.css'
import ProfilePicture from '../../User/ProfilePicture';
import SendIcon from '@mui/icons-material/Send';
import { db, firebase } from '../../../config/firebase';
import { useAuth } from '../../../hooks/useAuth';
import { forwardRef, useState } from 'react';
import history from '../../../hooks/history';
import Spinner from '../../Loader/Spinner';
import { getMessageUserRoom } from '../../../utils/chats';
import { logEvent } from '../../../utils/analytics';

const MentorCard = forwardRef(({ id, name, school, major, bio, highlight1, highlight2, isMtr=true }, ref) => {
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
                senderUsername: userDetails.name,
                roomName: {
                    [user.uid]: name,
                    [id]: userDetails.name
                },
                read: {
                    [user?.uid]: true,
                    [id]: false
                }
            })
            logEvent('connected_mentor', {
                mentorId: id,
                createdRoom: targetRoomId,
                sentMessage: message || "Hi 👋"
            })
            history.push(`/messages/${targetRoomId}`)
        } catch (e) {
            setSendingMessage(false)
            console.error(e)
        }
    }

    return (
        <div ref={ref} className="bg-white rounded-lg shadow-lg flex flex-col items-center p-3 mt-16 min-h-80 transition-transform transform hover:scale-105 duration-200 cursor-pointer" style={{flex: "1 0 30%", width: '17.5rem'}}>
            <ProfilePicture uid={id} alt="mentor" className="w-28 h-28 transform rounded-full -mt-16 border-white border-8 border-solid shadow-lg" style={{aspectRatio: '1'}} onClick={() => history.push(`/profile/${id}`)}/>
            <div className="mt-2 space-y-2 h-full flex flex-col w-full">
                <div className="space-y-1 text-center transform" onClick={() => history.push(`/profile/${id}`)}>
                    <h3 className="font-semibold text-xl">{name}</h3>
                    <p className="text-md text-gray-600">{isMtr?"Mentor":"Student"} @ {school}</p>
                </div>
                <div className="space-y-1 text-center flex-1 transform" onClick={() => history.push(`/profile/${id}`)}>
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
                        className="shadow-lg rounded-xl px-2 py-3 border-0 flex-1 focus:border-0 text-sm" 
                        placeholder="Break the ice. Say Hi 👋" 
                        disabled={sendingMessage}
                        value={message} 
                        onChange={e => setMessage(e.target.value)}/>
                    <button 
                        type="button"
                        disabled={sendingMessage}
                        className="shadow-lg rounded-xl py-2 px-3 bg-yellow-500 border-0 ml-2 cursor-pointer"  
                        onClick={connectWithMentor}>
                        {!sendingMessage?<SendIcon className="text-xl text-white"/>: <Spinner className="w-6 h-6 text-white"/>}
                    </button>
                </div>
            </div>
        </div>
    );
})

export default MentorCard;
