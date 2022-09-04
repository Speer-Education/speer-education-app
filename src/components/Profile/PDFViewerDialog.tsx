import { Button, DialogActions } from "@mui/material";
import { FC } from "react";

const PDFViewerDialog: FC<{ onClose: () => void, url: string }> = ({ onClose, url }) => {
    return <>
        <iframe title="pdf" src={url} className="w-screen h-[calc(100vh-60px)] " />
        <DialogActions>
            <Button onClick={onClose} color="primary">Close</Button>
        </DialogActions>
    </>
}

export default PDFViewerDialog;