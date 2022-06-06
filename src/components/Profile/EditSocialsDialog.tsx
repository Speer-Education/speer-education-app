//@ts-nocheck
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { db, firebase } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import DialogBase from '../Dialog/DialogBase';
import { InputField } from '../Forms/Inputs';
import Spinner from '../Loader/Spinner'
import { logEvent } from "../../utils/analytics";

const EditSocialsDialog = ({open, onClose}) => {

    const {user, userDetails} = useAuth();
    const [form, setForm] = useState({})
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        const { socials } = userDetails || {};
        setForm(socials)
    },[userDetails])

    const { github, youtube, personal } = form || {};
    
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    }

    const handleSelectInput = (name, value) => {
        setForm({ ...form, [name]: value })
    }

    const handleSaveDetails = () => {
      if(!user) return;
      logEvent('updated_socials')
      setSaving(true)
      const submittingForm = JSON.parse(JSON.stringify(form));
      db.doc(`users/${user.uid}`).update({
        socials: submittingForm,
        _updatedOn: firebase.firestore.Timestamp.now()
      })
      setSaving(false)
      onClose();
    }

    return (
        <DialogBase open={open} onClose={onClose}>
            <div className="space-y-2 inline-block w-full max-w-lg p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg max-h-screen overflow-y-auto">
                <DialogTitle
                  className="text-xl font-semibold leading-6 text-center text-gray-900"
                >
                  Edit Details
                </DialogTitle>
                <div className="mt-2 h-full space-y-2 py-2">
                    <InputField 
                        type="text" 
                        className="md:w-full mb-6 md:mb-0" 
                        label="Personal Website Link" 
                        id="personal" 
                        name="personal" 
                        value={personal} 
                        onChange={handleFormChange}/>
                    <InputField 
                        type="text" 
                        className="md:w-full mb-6 md:mb-0" 
                        label="Youtube" 
                        id="youtube" 
                        name="youtube" 
                        value={youtube} 
                        onChange={handleFormChange}/>
                    <InputField 
                        type="text" 
                        className="md:w-full mb-6 md:mb-0" 
                        label="Github" 
                        id="github" 
                        name="github" 
                        value={github} 
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

export default EditSocialsDialog;
