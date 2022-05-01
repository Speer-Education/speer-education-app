//@ts-nocheck
import { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { useAuth } from "../../hooks/useAuth";
import { SimpleUserDetails } from "../../types/User";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

const GroupProfileCard = ({ roomExists, roomUsers: roomUsersIds }) => {
  //In case room doesn't exist.
  if (!roomExists) {
    return (
      <div className="p-3 m-2 shadow-lg rounded-md bg-white bg-opacity-90 space-y-6">
        <h3 className="text-gray-500">{roomExists ? "Loading" : "N/A"}</h3>
      </div>
    );
  }
  //Room Exists (So we spawn the room user ids)
  return (
    <div className="p-3 m-2 shadow-lg rounded-md bg-white bg-opacity-90 space-y-6">
      <div className="pb-2">
        <h2>Group Members:</h2>
      </div>
      {roomUsersIds.map((roomUserId) => (
        <GroupUserSmallProfileCard key={roomUserId} id={roomUserId} />
      ))}
    </div>
  );
};

const GroupUserSmallProfileCard = ({ id }) => {
  const { user } = useAuth();
  const [details, setDetails] = useState<SimpleUserDetails>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //If no user, then return
    if (!user) return;
    setLoading(true);

    return db.doc(`users/${id}`).onSnapshot((snap) => {
      setDetails({
        id: snap.id,
        name: snap.get("name"),
      });
      setLoading(false);
    });
  }, [user, id]);

  //If still loading
  if (loading) {
    return (
      <div className="p-3 m-2 shadow-lg rounded-md bg-white bg-opacity-90 space-y-6">
        <h3 className="text-gray-500">Loading</h3>
      </div>
    );
  }

  //Pass id to profile picture, which will fetch the picture.
  return (
    <div className={`p-3 pr-5 transition-colors hover:bg-gray-100`}>
      <Link className="flex items-center" to={`/profile/${details.id}`}>
        <Avatar
          src={`https://storage.googleapis.com/speer-education-dev.appspot.com/users/${details.id}/thumb-profilePicture.png`}
        />
        <div className="pl-3 w-100">
          <h3>{details.name}</h3>
        </div>
      </Link>
    </div>
  );
};

export default GroupProfileCard;

//Define type for each component
