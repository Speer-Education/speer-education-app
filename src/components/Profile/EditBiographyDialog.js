import { Dialog } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { db, firebase } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import DialogBase from '../Dialog/DialogBase';
import { InputAreaField } from '../Forms/Inputs';
import Spinner from '../Loader/Spinner'

const EditBiographyDialog = ({open, onClose}) => {

    const {user, userDetails} = useAuth();
    const [form, setForm] = useState({})
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        const { bio } = userDetails || {};
        setForm({bio})
    },[userDetails])
    
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    }

    const handleSelectInput = (name, value) => {
        setForm({ ...form, [name]: value })
    }

    const handleSaveDetails = () => {
      if(!user) return;
      setSaving(true)
      const submittingForm = JSON.parse(JSON.stringify(form));
      console.log('Submitting Update Request to db')
      db.doc(`users/${user.uid}`).update({
        ...submittingForm,
        _updatedOn: firebase.firestore.Timestamp.now()
      })
      setSaving(false)
      onClose();
    }
    const { bio } = form;

    return (
        <DialogBase open={open} onClose={onClose}>
            <div className="space-y-2 inline-block w-full max-w-lg p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg max-h-screen overflow-y-auto">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-semibold leading-6 text-center text-gray-900"
                >
                  Edit Biography
                </Dialog.Title>
                <div className="mt-2 h-full space-y-2 py-2">
                    <InputAreaField 
                        style={{ resize: "none"}} 
                        rows="3" 
                        maxLength="300"
                        type="text" 
                        className="md:w-full mb-6 md:mb-0" 
                        label="Short Description about yourself" 
                        id="bio" 
                        name="bio" 
                        value={bio} 
                        onChange={handleFormChange}/>

                </div>
                <div className="mt-4 pt-2">
                  <button
                    type="button"
                    className="ml-2 inline-flex justify-center px-4 py-2 float-right text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={handleSaveDetails}
                  >
                    {saving?<Spinner/>:"Save"}
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 float-right text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
            </div>
        </DialogBase>
    );
}

export default EditBiographyDialog;
