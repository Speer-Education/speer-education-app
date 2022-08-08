import { SearchRounded } from '@mui/icons-material';
import { DialogContent, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDialog } from '../../hooks/useDialog';
import SearchBar from './SearchBar';
import { UserMenu } from './UserMenu/UserMenu';

const MobileTopBar = () => {
    const navigate = useNavigate();
    const [openDialog, closeDialog] = useDialog();

    const openSearchDialog = () => {
        openDialog({
            children: <>
                <div className="p-2 h-[calc(100vh-8rem)]">
                    <SearchBar />
                </div>
            </>
        })
    }

    return (
        <div className="sticky lg:hidden top-0 left-0 w-screen h-14 bg-white z-50 shadow-md">
            <div className="flex flex-row items-center h-full justify-between">
                <img className="-mb-1 h-14 cursor-pointer pr-4" src="/full-transparent-logo.png" alt="logo" onClick={() => navigate('/')} />
                <div className='flex flex-row space-x-1 items-center'>
                    <IconButton onClick={openSearchDialog}>
                        <SearchRounded />
                    </IconButton>
                    <UserMenu />
                </div>
            </div>
        </div>
    )
}

export default MobileTopBar;