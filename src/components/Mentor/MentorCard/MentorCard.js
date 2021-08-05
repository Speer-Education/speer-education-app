import './MentorCard.css'
import ProfilePicture from '../../User/ProfilePicture';
import SendIcon from '@material-ui/icons/Send';
import { db, firebase, functions } from '../../../config/firebase';
import { useAuth } from '../../../hooks/useAuth';
import { useState } from 'react';
import history from '../../../hooks/history';
import Spinner from '../../Loader/Spinner';
import { followUser } from '../../../utils/relationships';

const MentorCard = ({ id, name, school, major, bio }) => {
    const [message, setMessage] = useState("");
    const { user, userDetails } = useAuth();
    const [sendingMessage, setSendingMessage] = useState(false);


    const connectWithMentor = async () => {
        /* Send Mentor ID to backend for checking and room creation */
        if(!user?.uid || !userDetails || sendingMessage) return;
        setSendingMessage(true)
        //send it in as profile id instead of mentor id (will need to change the backend so this still works)
        try {
            let { data: targetRoomId } = await functions.httpsCallable('createRoom')({ profileId: id })
            .catch((error) => {
                console.error(error)
            })
            await followUser(user.uid, id)
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
        <div className="bg-white rounded-lg shadow-lg flex flex-col items-center p-3 w-72 mt-16 min-h-96" style={{flex: "1 0 30%"}}>
            <ProfilePicture uid={id} alt="mentor" className="w-28 h-28 transform -translate-y-16 rounded-full border-white border-8 border-solid shadow-lg"/>
            <div className="mt-2 space-y-2 h-full flex flex-col w-full">
                <div className="space-y-1 text-center transform -translate-y-16">
                    <h3 className="font-medium">{name}</h3>
                    <p className="text-md text-gray-600">Mentor @ {school}</p>
                </div>
                <div className="space-y-1 text-center flex-1 transform -translate-y-16">
                    <p className="text-md text-gray-600">{major}</p>
                    <p className="text-sm text-gray-600">{bio.substring(0, 125)}</p>

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
