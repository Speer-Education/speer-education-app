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

type FormValues = Pick<UserDetails, 'occupation'>;

const EditOccupationDialog = ({ onClose }) => {
  const { user, userDetails } = useAuth();
  const { register, control, handleSubmit, formState: { isSubmitting } } = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      occupation: userDetails?.occupation?.map(edu => ({...edu, startDate: edu.startDate.toDate(), endDate: edu.endDate?.toDate()})) || []
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
        Edit Occupation
      </DialogTitle>
      <DialogContent>
        <InputField {...register('occupation.0.position', { required: true })} required type="text" className="md:w-64 mb-6 md:mb-0" label="Title" placeholder="Head of heads" id="major"/>
        <InputField {...register('occupation.0.company', { required: true })} required type="text" className="md:w-64 mb-6 md:mb-0" label="Company" placeholder="AMCE Inc" />
        <FormDatePicker
            control={control}
            name="occupation.0.startDate"
            rules={{required: true}}
            views={['month','year']}
            className="md:w-full mb-6 md:mb-0" 
            label="Start Year"
            inputFormat="MMM yyyy"
        />
        <FormDatePicker
            control={control}
            name="occupation.0.endDate"
            views={['month','year']}
            className="md:w-full mb-6 md:mb-0" 
            label="End Year (Optional)"
            inputFormat="MMM yyyy"
            clearable={true}
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

export default EditOccupationDialog;
