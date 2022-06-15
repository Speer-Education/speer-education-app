//@ts-nocheck
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { db, firebase } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import DialogBase from '../Dialog/DialogBase';
import { InputAreaField } from '../Forms/Inputs';
import Spinner from '../Loader/Spinner'
import { logEvent } from "../../utils/analytics";
import { DialogActions, DialogContent } from '@mui/material';

const EditBiographyDialog = ({ open, onClose }) => {

  const { user, userDetails } = useAuth();
  const [form, setForm] = useState({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const { biography } = userDetails || {};
    setForm({ biography })
  }, [userDetails])

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value })
  }

  const handleSelectInput = (name, value) => {
    setForm({ ...form, [name]: value })
  }

  const handleSaveBio = () => {
    if (!user) return;
    logEvent('updated_biography')
    setSaving(true)
    const submittingForm = JSON.parse(JSON.stringify(form));
    db.doc(`users/${user.uid}`).update({
      ...submittingForm,
      _updatedOn: firebase.firestore.Timestamp.now()
    })
    setSaving(false)
    onClose();
  }
  const { biography } = form;

  return (
    <DialogBase
      open={open}
      onClose={onClose}
    >
      <DialogTitle
        className="text-xl font-semibold leading-6 text-center text-gray-900"
      >
        Edit Biography
      </DialogTitle>
      <DialogContent>
        <InputAreaField
          style={{ resize: "none" }}
          rows="3"
          maxLength="300"
          type="text"
          className="sm:w-96 mb-6 md:mb-0"
          label="Short Description about yourself"
          id="biography"
          name="biography"
          value={biography}
          onChange={handleFormChange} />
      </DialogContent>
      <DialogActions>
        <button
          type="button"
          className="ml-2 inline-flex justify-center px-4 py-2 float-right text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          onClick={handleSaveBio}
        >
          {saving ? <Spinner /> : "Save"}
        </button>
        <button
          type="button"
          className="inline-flex justify-center px-4 py-2 float-right text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          onClick={onClose}
        >
          Close
        </button>
      </DialogActions>
    </DialogBase>
  );
}

export default EditBiographyDialog;
