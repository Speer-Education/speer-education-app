import { functions } from "../config/firebase";
import { getRoomId } from "./relationships"

const getMessageUserRoom = async (receiver, sender) => {
    let finalRoomId = await getRoomId(receiver, sender);
    if (finalRoomId) return finalRoomId;
    try {
        let res = await functions.httpsCallable('createRoom')({ profileId: receiver })
        .catch((error) => {
            console.error(error)
        })
        if(!res) throw Error('error')
        const { data: targetRoomId } = res;
        return targetRoomId
    } catch (e) {
        console.error(e)
    }
}

export { getMessageUserRoom }