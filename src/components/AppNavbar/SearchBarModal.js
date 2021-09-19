import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import SearchBar from './SearchBar';

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
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #f58a07',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      zIndex: 0,
    },
  }));

function SearchBarModal({open, setOpen}) {

    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    return (
        <>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                  <SearchBar isModal={open}/>
                </div>
            </Modal>
        </>
    )
}

export default SearchBarModal
