import { Dialog } from '@headlessui/react';
import { useEffect, useMemo, useState } from 'react';
import { db, firebase } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import { countryOptions } from '../../pages/Onboarding/OnboardingConfig';
import DialogBase from '../Dialog/DialogBase';
import { InputField, InputSelect } from '../Forms/Inputs';
import Spinner from '../Loader/Spinner'

const EditDetailsDialog = ({open, onClose}) => {

    const {user, userDetails} = useAuth();
    const [form, setForm] = useState({})
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        const { name, school, major, country, highlight1, highlight2 } = userDetails || {};
        let formState = { name, school, major, country: countryOptions.filter(mod => mod.label == country)[0], highlight1, highlight2 }
        if(formState == form) return;
        setForm(formState)
    },[userDetails])

    const { name, school, major, country, highlight1, highlight2 } = form;
    
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
      submittingForm.country = submittingForm.country.label;
      console.log('Submitting Update Request to db')
      db.doc(`users/${user.uid}`).update({
        ...submittingForm,
        _updatedOn: firebase.firestore.Timestamp.now()
      })
      setSaving(false)
      onClose();
    }

    return (
        <DialogBase open={open} onClose={onClose}>
            <div className="space-y-2 inline-block w-full max-w-lg p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg max-h-screen overflow-y-auto">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-semibold leading-6 text-center text-gray-900"
                >
                  Edit Details
                </Dialog.Title>
                <div className="mt-2 h-full space-y-2 py-2">
                    <InputField 
                        required 
                        type="text" 
                        className="md:w-full mb-6 md:mb-0" 
                        label="Full Name" 
                        placeholder="John Doe" 
                        id="name" 
                        name="name" 
                        value={name} 
                        onChange={handleFormChange}/>
                    <InputField 
                        required 
                        type="text" 
                        className="md:w-full mb-6 md:mb-0" 
                        label="Major" 
                        placeholder="Economics?" 
                        id="major" 
                        name="major" 
                        value={major} 
                        onChange={handleFormChange}/>
                    <InputField 
                        required 
                        type="text" 
                        className="md:w-full mb-6 md:mb-0" 
                        label="School" 
                        placeholder="Harvard University" 
                        id="school" 
                        name="school" 
                        value={school} 
                        onChange={handleFormChange}/>
                    <InputSelect 
                        required 
                        className="md:w-full mb-6 md:mb-0" 
                        label="Country of Residence" 
                        id="country" 
                        name="country" 
                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        menuPortalTarget={document.body}
                        options={countryOptions} 
                        value={country} 
                        onChange={value => handleSelectInput('country',value)} />

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

export default EditDetailsDialog;
