import DialogTitle from '@mui/material/DialogTitle';
import { db, firebase } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import DialogBase from '../Dialog/DialogBase';
import { InputField } from '../Forms/Inputs';
import Spinner from '../Loader/Spinner'
import { logEvent } from "../../utils/analytics";
import {useForm} from 'react-hook-form';
import {UserDetails} from '../../types/User';
import { DialogActions, DialogContent } from '@mui/material';

const EditSocialsDialog = ({open, onClose}) => {
    const {user, userDetails} = useAuth();
    const { register, control, handleSubmit, watch, setValue, formState: { isValid, isSubmitting } } = useForm<UserDetails['socials']>({
      mode: 'all',
      defaultValues: userDetails?.socials
    });
  

    const handleSaveDetails = async (data: UserDetails['socials']) => {
      if(!user) return;
      logEvent('updated_socials');
      await db.doc(`users/${user.uid}`).update({
        socials: data,
        _updatedOn: firebase.firestore.Timestamp.now()
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
                    <InputField 
                        {...register('personal')}
                        type="text" 
                        className="md:w-full mb-6 md:mb-0" 
                        label="Personal Website Link" />
                    <InputField 
                        {...register('youtube')}
                        type="text" 
                        className="md:w-full mb-6 md:mb-0" 
                        label="Youtube" />
                    <InputField 
                        {...register('github')}
                        type="text" 
                        className="md:w-full mb-6 md:mb-0" 
                        label="Github" />
                </DialogContent>
                <DialogActions>
                  <button
                    disabled={!isValid || isSubmitting}
                    type="button"
                    className="ml-2 inline-flex justify-center px-4 py-2 float-right text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={handleSubmit(handleSaveDetails)}
                  >
                    {isSubmitting?<Spinner/>:"Save"}
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

export default EditSocialsDialog;
