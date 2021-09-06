import { Dialog } from '@headlessui/react';
import { Button } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { db, firebase } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import { countryOptions } from '../../pages/Onboarding/OnboardingConfig';
import DialogBase from '../Dialog/DialogBase';
import { InputField, InputSelect } from '../Forms/Inputs';
import Picker from 'emoji-picker-react';
import Spinner from '../Loader/Spinner';



const FormRow = ({ children }) => (
  <div class="flex flex-wrap mb-6">{children}</div>
)

const EditDetailsDialog = ({open, onClose}) => {

    const {user, userDetails} = useAuth();
    const [form, setForm] = useState({})
    const [saving, setSaving] = useState(false);
    const [showPicker1, setShowPicker1] = useState(false);
    const [showPicker2, setShowPicker2] = useState(false);

    useEffect(() => {
        const { name, school, major, country, highlight1, highlight2 } = userDetails || {};
        let formState = { name, school, major, country: countryOptions.filter(mod => mod.label == country)[0], highlight1, highlight2 }
        if(formState === form) return;
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

    const handleHighlight1Emoji = (event, emojiObject) => {
      setForm({ ...form, highlight1: {
          emoji: emojiObject.emoji,
          description: highlight1.description
      }})
      setShowPicker1(false)
  };

  const handleHighlight2Emoji = (event, emojiObject) => {
    setForm({ ...form, highlight2: {
        emoji: emojiObject.emoji,
        description: highlight2.description
    }})
    setShowPicker2(false)
};

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
                    {/* Highlight Edit Section */}
                    <p className="block titlecase tracking-wide text-gray-700 text-xs font-bold mb-2 px-3" style={{color: "#2596be"}}>
                        Give us the two things you are most proud of <span className="text-red-600">*</span>
                    </p>  
                    <FormRow>
                      <div className="px-3">
                          <Button 
                            variant="outlined" 
                            style={{height: "40px", width: "40px"}} 
                            id="highlight1Emoji"
                            onClick={() => setShowPicker1(!showPicker1)} 
                          >
                              {highlight1?.emoji || "Pick an emoji"}
                          </Button>
                      </div>
                      {showPicker1 ? <Picker onEmojiClick={handleHighlight1Emoji} pickerStyle={{ zIndex:1, position:"absolute",left: "105px", bottom: "35px" }} /> : null}
                      <InputField 
                        required 
                        type="text" 
                        className="md:w-3/4 mb-6 md:mb-0" 
                        autoWidth 
                        placeholder="Where you work, study etc..." 
                        id="highlight2" 
                        name="highlight2" 
                        value={highlight1?.description}
                        onChange={(e) => setForm({...form, highlight1: {emoji: highlight1?.emoji, description: e.target.value}})}
                      />                      
                    </FormRow>
                    <FormRow>
                      <div className="px-3">
                          <Button 
                            variant="outlined" 
                            style={{height: "40px", width: "40px"}} 
                            id="highlight1Emoji" 
                            onClick={() => setShowPicker2(!showPicker2)} 
                          >
                            {highlight2?.emoji || "Pick an emoji"}
                          </Button>
                      </div>
                      {showPicker2 ? <Picker onEmojiClick={handleHighlight2Emoji} pickerStyle={{ zIndex:1, position:"absolute", left: "105px", bottom: "12px" }} /> : null}
                      <InputField 
                        required 
                        type="text" 
                        className="md:w-3/4 mb-6 md:mb-0" 
                        autoWidth 
                        placeholder="Where you work, study etc..." 
                        id="highlight2" 
                        name="highlight2" 
                        value={highlight2?.description}
                        onChange={(e) => setForm({...form, highlight2: {emoji: highlight2?.emoji, description: e.target.value}})}
                      />                      
                    </FormRow>
                </div>
                <div className="mt-4 pt-2">
                  <button
                    type="button"
                    className="cursor-pointer ml-2 inline-flex justify-center px-4 py-2 float-right text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={handleSaveDetails}
                  >
                    {saving?<Spinner/>:"Save"}
                  </button>
                  <button
                    type="button"
                    className="cursor-pointer inline-flex justify-center px-4 py-2 float-right text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
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
