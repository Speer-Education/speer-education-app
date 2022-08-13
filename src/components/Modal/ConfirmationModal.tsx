import React from 'react';
import { makeStyles } from '@mui/styles'
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';


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
      //@ts-ignore
      backgroundColor: theme.palette.background.paper,
      border: 'transparent',
      //@ts-ignore
      boxShadow: theme.shadows[5],
      //@ts-ignore
      padding: theme.spacing(2, 4, 3),
      display: "flex ",
      justifyContent: "center",
      flexDirection: "column",
    },
  }));

//TODO: Use unstyled modal to fix bug of modal background being extremely dark when there are multiplee comments.

// If there is no additional inputs for handleDelete, leave deleteParam balnk. Otherwise, if there is input required
// for handleDelete function such as an id of the thing to delete, put it in the deleteParam field.
// As an example, PostCard component does not need a deleteParam, but PostComments does.
function ConfirmationModal({open, setOpen, contentType, handleDelete, deleteParam = ""}) {

    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <div style={modalStyle} className={classes.paper}>
                <h2 className="text-center mb-5">Are you sure you want to delete this {contentType}?</h2>
                <div className="flex justify-around">

                    <Button 
                        variant="contained" 
                        color="error" 
                        startIcon={<DeleteIcon />} 
                        onClick={() => {
                            // If there is a deleteParam, use it for the handleDelete function.
                            deleteParam?  handleDelete(deleteParam) : handleDelete()
                            setOpen(false);
                        }}>
                    Delete </Button>
                    <Button variant="contained" onClick={() => setOpen(false)}>Cancel</Button>
                </div>
            </div>
        </Modal>
    )
}

export default ConfirmationModal
