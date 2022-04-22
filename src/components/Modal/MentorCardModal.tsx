//@ts-nocheck
import React from 'react';
import { makeStyles } from '@mui/styles'
import Modal from '@mui/material/Modal';
import MentorCard from '../Mentor/MentorCard/MentorCard';


function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: "98vw",
      maxWidth: "400px",
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      display: "flex",
      justifyContent: "center",
      borderRadius: "25px",
    },
  }));


function MentorCardModal({open, setOpen, mentorSelected}) {

    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <div style={modalStyle} className={classes.paper}>
                <MentorCard {...mentorSelected}/>
            </div>
        </Modal>
    )
}

export default MentorCardModal
