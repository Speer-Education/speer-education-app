import { Button, DialogActions, DialogContent, DialogTitle, Radio, RadioGroup } from "@mui/material";
import { deleteField, doc, setDoc, updateDoc } from "firebase/firestore";
import { FC, useState } from "react";
import { useSpeerOrg } from "../../hooks/useSpeerOrg";
import { PublicUserDoc } from "../../types/User";
import {OrgMergedUser} from '../../types/Organization';
  
const EditUserOrganizationRole: FC<{onClose: (newRole?: OrgMergedUser['role']) => void, user: OrgMergedUser}> = ({onClose, user}) => {
    const { orgDoc, orgRef } = useSpeerOrg();
    const perm = user.role || "member";
    const [role, setRole] = useState(perm);

    const onSubmit = async () => {
        await setDoc(doc(orgRef, 'members', user.id), {
            role
        }, { merge: true })
        onClose(role);
    }

    return <>
        <DialogTitle>Edit Role of {user.name}</DialogTitle>
        <DialogContent>
            <RadioGroup
                defaultValue={perm}
                value={role}
                onChange={(e) => setRole(e.target.value as OrgMergedUser['role'])}
            >
                <label htmlFor="member" className="flex flex-row items-center cursor-pointer transition hover:bg-blue-600/10 rounded-lg">
                    <Radio id="member" value="member"/>
                    <div className="flex flex-col">
                        <span className="text-sm">Member</span>
                        <span className="text-xs">Can post, view people, blogs related to the organization.</span>
                    </div>
                </label>
                <label htmlFor="admin" className="flex flex-row items-center cursor-pointer transition hover:bg-blue-600/10 rounded-lg">
                    <Radio id="admin" value="admin"/>
                    <div className="flex flex-col">
                        <span className="text-sm">Admin</span>
                        <span className="text-xs">Can view and edit all users</span>
                    </div>
                </label>
                <label htmlFor="owner" className="flex flex-row items-center cursor-pointer transition hover:bg-blue-600/10 rounded-lg">
                    <Radio id="owner" value="owner"/>
                    <div className="flex flex-col">
                        <span className="text-sm">Owner</span>
                        <span className="text-xs">Can view and edit all users, and manage the organization</span>
                    </div>
                </label>
            </RadioGroup>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => onClose()}>Cancel</Button>
            <Button disabled={perm == role} color="success" onClick={onSubmit}>Save</Button>
        </DialogActions>
    </>
}

export default EditUserOrganizationRole;