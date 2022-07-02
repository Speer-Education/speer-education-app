import { doc } from "firebase/firestore";
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db, docConverter } from "../config/firebase";
import { Organization, OrganizationDocument } from "../types/Organization";
import { useAuth } from "./useAuth";
import { useLocalStorage } from "./useHooks";

const useSpeerOrgProvider = () => {
    const [orgId, setOrgId] = useLocalStorage<string>('current_org','global');
    const [orgDoc, loading, error] = useDocumentData<OrganizationDocument>(doc(db, 'organization', orgId).withConverter(docConverter));
    const { user, userDetails } = useAuth();

    useEffect(() => {
        if(user == null) setOrgId('global');
    }, [user])

    const orgRef = useMemo(() => doc(db, 'organization', orgId), [orgId]);

    const toggleOrg = () => {
        if(!userDetails) return;
        if (orgId === 'global') {
            setOrgId(userDetails?.organization || 'global');
        } else {
            setOrgId('global');
        }
    }
    const isOwner = orgDoc?.permissions?.[user?.uid || ""] == 'owner';
    const isAdmin = orgDoc?.permissions?.[user?.uid || ""] == 'admin' || isOwner;

    return {
        userOrg: userDetails?.organization,
        orgDoc,
        orgId,
        orgRef,
        isOwner,
        isAdmin,
        loadingDoc: loading,
        toggleOrg,
        setOrganization: (orgId: string) => { setOrgId(orgId) }
    }
};

//@ts-ignore
const authContext = createContext<ReturnType<typeof useSpeerOrgProvider>>(null);
const { Provider } = authContext;

export function OrgProvider({ children }: PropsWithChildren<{}>) {
    const auth = useSpeerOrgProvider();
    return <Provider value={auth}>{children}</Provider>;
}

export const useSpeerOrg = () => {
    return useContext<ReturnType<typeof useSpeerOrgProvider>>(authContext);
};
