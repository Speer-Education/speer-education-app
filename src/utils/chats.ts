import { functions } from "../config/firebase";
import { getRoomId } from "./relationships"
import {UserID} from '../types/User';
import { httpsCallable } from "firebase/functions";

const getMessageUserRoom = async (receiver: UserID, sender: UserID) => {
    let finalRoomId = await getRoomId(receiver, sender);
    if (finalRoomId) return finalRoomId;
    try {
        let res = await httpsCallable(functions, 'createRoom')({ profileId: receiver })
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