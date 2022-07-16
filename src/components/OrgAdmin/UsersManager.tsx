import { query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { functions, publicUserCollection } from "../../config/firebase";
import { useSpeerOrg } from "../../hooks/useSpeerOrg";
import { DataGrid, GridActionsCellItem, GridColDef, GridColumns, GridRowParams, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridValueGetterParams } from '@mui/x-data-grid';
import { Button, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { AddRounded, Delete, ManageAccountsRounded, SecurityOutlined } from "@mui/icons-material";
import { PublicUser, PublicUserDoc, UserID } from "../../types/User";
import { useDialog } from "../../hooks/useDialog";
import AddUserToOrganization from "./AddUserToOrganization";
import { httpsCallable } from "firebase/functions";
import { useSnackbar } from "notistack";
import EditUserOrganizationRole from "./EditUserOrganizationRole";
import './UsersManager.css'
function CustomToolbar() {
    const [openDialog, closeDialog] = useDialog();

    const showAddUserDialog = () => {
        openDialog({
            children: <AddUserToOrganization onClose={closeDialog} />
        })
    }
    return (
        <GridToolbarContainer>
            <div className="flex flex-row w-full">
                <div className="flex flex-row space-x-1 flex-1">
                    <GridToolbarColumnsButton />
                    <GridToolbarFilterButton />
                    <GridToolbarDensitySelector />
                    <GridToolbarExport />
                </div>
                <Button variant="contained" startIcon={<AddRounded />} onClick={showAddUserDialog}>Add User</Button>
            </div>
        </GridToolbarContainer>
    );
}


const UsersManager = () => {
    const { orgId, orgDoc } = useSpeerOrg();
    const [users = [], loading, error] = useCollectionData(query(publicUserCollection, where('organization', '==', orgId)));
    const [openDialog, closeDialog] = useDialog();
    const { enqueueSnackbar } = useSnackbar();

    const confirmDelete = (user: PublicUserDoc) => () => {
        console.log(user);
        openDialog({
            children: <>
                <DialogTitle>Confirm Action</DialogTitle>
                <DialogContent>
                    <p>Are you sure you want to remove {user.name} from your organization?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>Cancel</Button>
                    <Button color="error" onClick={() => {
                        httpsCallable<{userId: UserID, orgId: string}, boolean>(functions, 'RemoveUserFromOrganization')({
                            userId: user.id,
                            orgId
                        }).then(() => {
                            closeDialog();
                        }).catch(e => {
                            console.error(e);
                            enqueueSnackbar(e.message, { variant: "error" });
                        })
                    }}>Remove</Button>
                </DialogActions>
            </>
        })
    }

    const showEditRoleDialog = (user: PublicUserDoc) => () => {
        openDialog({
            children: <EditUserOrganizationRole user={user} onClose={closeDialog} />
        })
    }

    const columns: GridColumns<PublicUserDoc> = [
        { field: 'id', headerName: 'ID', width: 250, cellClassName: "id-cell",  },
        {
            field: 'name',
            headerName: 'Name',
            width: 250,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 250,
        },
        {
            field: 'role',
            headerName: 'Role',
            description: 'This column has a value getter and is not sortable.',
            width: 80,
            valueGetter: (params: GridValueGetterParams) => orgDoc?.permissions?.[params.row.id] || 'member'
        },
        {
            field: 'actions',
            type: 'actions',
            getActions: (params: GridRowParams<PublicUserDoc>) => [
                <GridActionsCellItem color="info" icon={<SecurityOutlined />} onClick={showEditRoleDialog(params.row)} label="Edit Role" />,
                <GridActionsCellItem color="info" icon={<ManageAccountsRounded />} onClick={confirmDelete(params.row)} label="Make Mentor" showInMenu />,
                <GridActionsCellItem color="error" icon={<Delete />} onClick={confirmDelete(params.row)} label="Delete" showInMenu/>
            ]
        }
    ];

    return (
        <div className="space-y-4">
            <h1>Users Manager</h1>
            <DataGrid
                autoHeight
                loading={loading}
                error={error}
                rows={users}
                columns={columns}
                density={'compact'}
                checkboxSelection
                disableSelectionOnClick
                components={{
                    Toolbar: CustomToolbar
                }}
            />
        </div>
    );
}
export default UsersManager;