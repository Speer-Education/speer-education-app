import React, { useState, useEffect } from "react";
import {db, functions, docConverter} from '../../config/firebase';
import { useAuth } from "../../hooks/useAuth";
import {SimpleUserDetails, UserID, PublicUserDoc} from '../../types/User';
import { Avatar, Button, DialogActions, DialogContent } from "@mui/material";
import {Link, useNavigate, useParams} from 'react-router-dom';
import ProfilePicture from "../User/ProfilePicture";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import IconButton from "@mui/material/IconButton";
import { AddRounded, MoreVertRounded } from "@mui/icons-material";
import { useDialog } from "../../hooks/useDialog";
import { httpsCallable } from "firebase/functions";
import { RoomID } from "../../types/Messaging";
import { useSnackbar } from "notistack";
import AddGroupMembersForm from "../Forms/AddGroupMembersForm";
import {useDocumentData} from 'react-firebase-hooks/firestore';
import { doc } from "firebase/firestore";

const GroupProfileCard = ({ roomExists, roomUsers }: {
  roomExists: boolean,
  roomUsers: string[],
}) => {
  const [openDialog, closeDialog] = useDialog();
  const { roomId } = useParams();

  const showAddGroupMembers = () => {
    openDialog({
      children: <AddGroupMembersForm onClose={closeDialog} existing={roomUsers} roomId={roomId!} />,
    })
  }

  //In case room doesn't exist.
  if (!roomExists) {
    return (
      <div className="p-2 m-2 shadow-lg rounded-md bg-white bg-opacity-90 space-y-2">
        <h3 className="text-gray-500">{roomExists ? "Loading" : "N/A"}</h3>
      </div>
    );
  }
  //Room Exists (So we spawn the room user ids)
  return (
    <div className="p-2 m-2 shadow-lg rounded-md bg-white bg-opacity-90">
      <div className="flex flex-row w-full items-center">
        <h3 className="p-2 flex-1">Group Members:</h3>
        <IconButton onClick={showAddGroupMembers}>
          <AddRounded/>
        </IconButton>
      </div>
      {/* Keep in mind roomUsers is an Array of strings not an array of objects. */}
      {roomUsers.map((roomUserId) => (
        <GroupUserSmallProfileCard key={roomUserId} id={roomUserId} />
      ))}
    </div>
  );
};

const GroupUserSmallProfileCard = ({ id }: {
  id: string,
}) => {
  const { user } = useAuth();
  const [details, loading, error] = useDocumentData<PublicUserDoc>(user && doc(db, 'usersPublic', id).withConverter(docConverter));
  const [openDialog, closeDialog] = useDialog();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { roomId } = useParams();

  const handleKick = (user: SimpleUserDetails) => {
    openDialog({
      children: <>
        <DialogContent>Are you sure you want to kick {user.name}?</DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button color="error" onClick={async () => {
            closeDialog();
            await httpsCallable<{roomId: RoomID, kickedUserId: UserID}, boolean>(functions, 'KickUserFromGroup')({
              roomId: roomId!, //! Doesn't work, should have a room provider for easyy data acess.
              kickedUserId: user.id,
            }).catch(e => {
              enqueueSnackbar(e.message, { variant: "error" });
            })
          }}>Continue</Button>
        </DialogActions>
      </>
    })
  }

  //If still loading
  if (loading) {
    return (
      <div className="px-2 py-1 shadow-lg rounded-md bg-white bg-opacity-90 space-y-6">
        <h3 className="text-gray-500">Loading</h3>
      </div>
    );
  }

  //Pass id to profile picture, which will fetch the picture.
  return (
    <div className={`px-2 py-1 transition-colors hover:bg-gray-100 flex flex-row w-full`}>
      <Avatar
        src={`https://storage.googleapis.com/speer-education-dev.appspot.com/users/${details!.id}/thumb-profilePicture.png`}
      />
      <div className="pl-3 flex-1">
        <h3>{details!.name}</h3>
      </div>
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <IconButton
              aria-label="more"
              {...bindTrigger(popupState)}
              aria-haspopup="true"
            >
              <MoreVertRounded />
            </IconButton>
            <Menu {...bindMenu(popupState)}>
              <MenuItem onClick={() => navigate(`/profile/${details!.id}`)}>View Profile</MenuItem>
              <MenuItem onClick={() => {
                handleKick(details!)
                popupState.close();
              }}>
                <span className="text-red-600">Kick User</span>
              </MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
      
    </div>
  );
};

export default GroupProfileCard;

//Define type for each component
