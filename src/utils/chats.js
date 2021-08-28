import { functions } from "../config/firebase";
// import history from "../hooks/history";
import { getRoomId } from "./relationships"

const getMessageUserRoom = async (receiver, sender) => {
    let finalRoomId = await getRoomId(receiver, sender);
    if (finalRoomId) return finalRoomId;
    try {
        let { data: targetRoomId } = await functions.httpsCallable('createRoom')({ profileId: receiver })
        .catch((error) => {
            console.error(error)
        })
        return targetRoomId
    } catch (e) {
        console.error(e)
    }
}

export { getMessageUserRoom }