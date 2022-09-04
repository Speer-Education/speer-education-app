import DialogTitle from '@mui/material/DialogTitle';
import { DialogActions, DialogContent } from '@mui/material';
import { db } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import { InputField } from '../Forms/Inputs';
import Spinner from '../Loader/Spinner';
import { logEvent } from "../../utils/analytics";
import { useForm } from 'react-hook-form';
import { UserDetails } from '../../types/User';
import {doc, updateDoc, Timestamp} from 'firebase/firestore';
import FormDatePicker from '../form-components/FormDateTimePicker';


const FormRow = ({ children }) => (
  <div className="flex flex-wrap mb-6 flex-row">{children}</div>
)

type FormValues = Pick<UserDetails, 'education'>;

const EditEducationDialog = ({ onClose }) => {
  const { user, userDetails } = useAuth();
  const { register, control, handleSubmit, formState: { isSubmitting } } = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      education: userDetails?.education.map(edu => ({...edu, graduationDate: edu.graduationDate.toDate()}))
    }
  });
  console.log(userDetails?.education)

  const handleSaveDetails = async (data: FormValues) => {
    if (!user) return;
    
    logEvent('updated_details')
    await updateDoc(doc(db, `users`, `${user.uid}`), {
      ...data,
      _updatedOn: Timestamp.now()
    })
    onClose();
  }

  return (
    <>
      <DialogTitle
        className="text-xl font-semibold leading-6 text-center text-gray-900"
      >
        Edit Education
      </DialogTitle>
      <DialogContent>
        <InputField {...register('education.0.major', { required: true })} required type="text" className="md:w-64 mb-6 md:mb-0" label="Current/Intended Major" placeholder="Economics, Business ...." id="major"/>
        <InputField {...register('education.0.school', { required: true })} required type="text" className="md:w-64 mb-6 md:mb-0" label="Name of Your School" id="school" placeholder="Harvard University" />
        <FormDatePicker
            control={control}
            name="education.0.graduationDate"
            views={['year']}
            rules={{required: true}}
            className="md:w-full mb-6 md:mb-0" 
            label="Year Of Graduation from your School"
            inputFormat="yyyy"
        />
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
    </>
  );
}

export default EditEducationDialog;
