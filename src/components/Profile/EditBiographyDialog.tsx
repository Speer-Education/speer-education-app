import DialogTitle from '@mui/material/DialogTitle';
import { db, firebase } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import DialogBase from '../Dialog/DialogBase';
import { InputAreaField } from '../Forms/Inputs';
import Spinner from '../Loader/Spinner'
import { logEvent } from "../../utils/analytics";
import { DialogActions, DialogContent } from '@mui/material';
import {useForm} from 'react-hook-form';
import {UserDetails} from '../../types/User';
import { doc, updateDoc } from 'firebase/firestore';

const EditBiographyDialog = ({ open, onClose }) => {

  const { user, userDetails } = useAuth();
  const { register, control, handleSubmit, watch, setValue, formState: { isValid, isSubmitting } } = useForm<Pick<UserDetails, 'biography'>>({
    mode: 'all',
    defaultValues: userDetails
  });

  const handleSaveBio = async (data: Pick<UserDetails, 'biography'>) => {
    if (!user) return;
    logEvent('updated_biography')
    await updateDoc(doc(db, `users`,`${user.uid}`),{
      biography: data.biography,
      _updatedOn: firebase.firestore.Timestamp.now()
    })
    onClose();
  }

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
          {...register('biography', {required: true})}
          style={{ resize: "none" }}
          //@ts-ignore
          rows="3"
          maxLength="300"
          type="text"
          className="sm:w-96 mb-6 md:mb-0"
          label="Short Description about yourself"/>
      </DialogContent>
      <DialogActions>
        <button
          type="button"
          className="ml-2 inline-flex justify-center px-4 py-2 float-right text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          onClick={handleSubmit(handleSaveBio)}
        >
          {isSubmitting ? <Spinner /> : "Save"}
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
