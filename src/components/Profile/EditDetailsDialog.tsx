import DialogTitle from '@mui/material/DialogTitle';
import { DialogActions, DialogContent } from '@mui/material';
import { db, firebase } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import { countryOptions } from '../../pages/Onboarding/OnboardingConfig';
import DialogBase from '../Dialog/DialogBase';
import { InputField, InputSelect } from '../Forms/Inputs';
import Spinner from '../Loader/Spinner';
import { logEvent } from "../../utils/analytics";
import { Controller, useForm } from 'react-hook-form';
import { UserDetails } from '../../types/User';
import {FormEmojiPicker} from '../Forms/EmojiPicker';
import {doc, updateDoc, Timestamp} from 'firebase/firestore';


const FormRow = ({ children }) => (
  <div className="flex flex-wrap mb-6 flex-row">{children}</div>
)

type FormValues = Pick<UserDetails, 'name' | 'education' | 'dateOfBirth' | 'email' | 'country' | 'highlights'>;

const EditDetailsDialog = ({ open, onClose }) => {
  const { user, userDetails } = useAuth();
  const { register, control, handleSubmit, watch, setValue, formState: { isValid, isSubmitting } } = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      name: userDetails?.name,
      education: userDetails?.education,
      dateOfBirth: userDetails?.dateOfBirth,
      email: userDetails?.email,
      country: userDetails?.country,
      highlights: userDetails?.highlights
    }
  });

  const handleSaveDetails = async (data: FormValues) => {
    if (!user) return;
    
    /*If Data.country is an object (meaning user changed their country so country field now holds an object like
    {label: "Åland Islands", value: "AX"} instead of just abbreviated country name like "SG"), then if that's the case, we must change it back
    to abbreviated country name,*/
    if (typeof data.country === 'object' && !Array.isArray(data.country) && data.country !== null){
      data.country = data.country.value
    }

    logEvent('updated_details')
    await updateDoc(doc(db, `users`, `${user.uid}`), {
      ...data,
      _updatedOn: Timestamp.now()
    })
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
        <InputField {...register('education.0.major', { required: true })} required type="text" className="md:w-64 mb-6 md:mb-0" label="Current/Intended Major" placeholder="Economics, Business ...." id="major"/>
        <InputField {...register('education.0.school', { required: true })} required type="text" className="md:w-64 mb-6 md:mb-0" label="Name of Your School" id="school" placeholder="Harvard University" />
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
          <FormEmojiPicker
            control={control}
            name="highlights.0.emoji"/>
          <InputField
            {...register('highlights.0.description', { required: true })}
            required
            type="text"
            label=""
            className="md:w-3/4 mb-6 md:mb-0"
            autoWidth
            placeholder="eg. Marketing Lead @ Amce Inc" />
        </FormRow>
        <FormRow>
          {/* TODO: Change this to the emoji selecter */}
          <FormEmojiPicker
            control={control}
            name="highlights.1.emoji"/>
          <InputField
            {...register('highlights.1.description', { required: true })}
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
          onClick={handleSubmit(handleSaveDetails)}
        >
          {isSubmitting ? <Spinner /> : "Save"}
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
