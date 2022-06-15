//@ts-nocheck
import DialogTitle from '@mui/material/DialogTitle';
import { Button, DialogActions, DialogContent } from '@mui/material';
import { useEffect, useState } from 'react';
import { db, firebase } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import { countryOptions } from '../../pages/Onboarding/OnboardingConfig';
import DialogBase from '../Dialog/DialogBase';
import { InputField, InputSelect } from '../Forms/Inputs';
import Picker from 'emoji-picker-react';
import Spinner from '../Loader/Spinner';
import { logEvent } from "../../utils/analytics";
import { Controller, useForm } from 'react-hook-form';


const FormRow = ({ children }) => (
  <div class="flex flex-wrap mb-6">{children}</div>
)

const EditDetailsDialog = ({ open, onClose }) => {
  //FIXME: BROKEN FROM NEW FORMAT
  //! This Edit is Broken from the new format
  const { user, userDetails } = useAuth();
  const { register, control, handleSubmit, watch, setValue, formState: { isValid, isSubmitting } } = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      name: "",
      hsGradYear: {
        value: "",
        label: ""
      },
      country: {
        value: "",
        label: ""
      },
      school: "",
      major: "",
      biography: "",
      highlight1: {
        emoji: "🚀",
        description: ""
      },
      highlight2: {
        emoji: "🗣",
        description: ""
      },
      socials: {
        github: "",
        personal: "",
        youtube: "",
      }
    }
  });
  const [saving, setSaving] = useState(false);
  const [showPicker1, setShowPicker1] = useState(false);
  const [showPicker2, setShowPicker2] = useState(false);

  useEffect(() => {
    const { name, school, major, country, highlight1, highlight2 } = userDetails || {};
    let formState = { name, school, major, country: countryOptions.filter(mod => mod.label == country)[0], highlight1, highlight2 }
    if (formState === form) return;
    setForm(formState)
  }, [userDetails])

  const { name, school, major, country, highlight1, highlight2 } = form;

  const handleHighlight1Emoji = (event, emojiObject) => {
    setForm({
      ...form, highlight1: {
        emoji: emojiObject.emoji,
        description: highlight1.description
      }
    })
    setShowPicker1(false)
  };

  const handleHighlight2Emoji = (event, emojiObject) => {
    setForm({
      ...form, highlight2: {
        emoji: emojiObject.emoji,
        description: highlight2.description
      }
    })
    setShowPicker2(false)
  };

  const handleSaveDetails = () => {
    if (!user) return;
    logEvent('updated_details')
    setSaving(true)
    const submittingForm = JSON.parse(JSON.stringify(form));
    submittingForm.country = submittingForm.country.label;
    db.doc(`users/${user.uid}`).update({
      ...submittingForm,
      _updatedOn: firebase.firestore.Timestamp.now()
    })
    setSaving(false)
    onClose();
  }

  return (
    <DialogBase open={open} onClose={onClose}>
      <DialogTitle
        className="text-xl font-semibold leading-6 text-center text-gray-900"
      >
        Edit Details
      </DialogTitle>
      <DialogContent>
        <InputField {...register('name', { required: true })} required type="text" className="md:w-64 mb-6 md:mb-0" label="What is your full name" placeholder="John Doe" />
        <InputField {...register('major', { required: true })} required type="text" className="md:w-64 mb-6 md:mb-0" label="Current/Intended Major" placeholder="Economics, Business ...." id="major" name="major" />
        <InputField {...register('school', { required: true })} required type="text" className="md:w-64 mb-6 md:mb-0" label="Name of Your School" id="school" name="school" placeholder="Harvard University" />
        <Controller
          control={control}
          name="country"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <InputSelect
              required
              className="md:w-1/2 mb-6 md:mb-0"
              label="Country of Residence"
              options={countryOptions}
              value={value}
              onChange={onChange} />
          )} />
        {/* Highlight Edit Section */}
        <p className="block titlecase tracking-wide text-gray-700 text-xs font-bold mb-2" style={{ color: "#2596be" }}>
          Show the world what you're proud of <span className="text-red-600">*</span>
        </p>
        <FormRow>
          {/* TODO: Change this to the emoji selecter */}
          <div className="px-3">
            <Button variant="outlined" style={{ height: "40px", width: "40px" }} id="highlight1Emoji" onClick={() => setShowPicker1(!showPicker1)}>{highlight1.emoji || "Pick an emoji"}</Button>
          </div>
          {showPicker1 ? <Picker
            onEmojiClick={handleHighlight1Emoji}
            pickerStyle={{ zIndex: "1", position: "absolute", left: "130px" }} /> : null}
          <InputField
            {...register('highlight1.description', { required: true })}
            required
            type="text"
            label=""
            className="md:w-3/4 mb-6 md:mb-0"
            autoWidth
            placeholder="eg. Marketing Lead @ Amce Inc" />
        </FormRow>
        <FormRow>
          {/* TODO: Change this to the emoji selecter */}
          <div className="px-3">
            <Button variant="outlined" style={{ height: "40px", width: "40px" }} id="highlight2Emoji" onClick={() => setShowPicker2(!showPicker2)}>{highlight2.emoji || "Pick an emoji"}</Button>
          </div>
          {showPicker2 ? <Picker
            onEmojiClick={handleHighlight2Emoji}
            pickerStyle={{ zIndex: "1", position: "absolute", left: "130px" }} /> : null}
          <InputField
            {...register('highlight2.description', { required: true })}
            required
            type="text"
            label=""
            className="md:w-3/4 mb-2 md:mb-0"
            autoWidth
            placeholder="eg. CEO @ Amce Labs" />
        </FormRow>
      </DialogContent>
      <DialogActions>
        <button
          type="button"
          className="cursor-pointer ml-2 inline-flex justify-center px-4 py-2 float-right text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          onClick={handleSaveDetails}
        >
          {saving ? <Spinner /> : "Save"}
        </button>
        <button
          type="button"
          className="cursor-pointer inline-flex justify-center px-4 py-2 float-right text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          onClick={onClose}
        >
          Close
        </button>
      </DialogActions>
    </DialogBase>
  );
}

export default EditDetailsDialog;
