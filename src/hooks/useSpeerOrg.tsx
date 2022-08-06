import { doc, DocumentReference } from "firebase/firestore";
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db, docConverter } from "../config/firebase";
import { Organization, OrganizationDocument, OrganizationMember, OrganizationMemberDocument } from "../types/Organization";
import { useAuth } from "./useAuth";
import { useLocalStorage } from "./useHooks";

const useSpeerOrgProvider = () => {
    const { user, userDetails } = useAuth();
    const [orgId, setOrgId] = useLocalStorage<string>('current_org','global');
    const orgRef = useMemo(() => doc(db, 'organization', orgId).withConverter(docConverter), [orgId]);
    const [orgDoc, loading, error] = useDocumentData<OrganizationDocument>(orgRef);
    const [memberDoc, loadMember, errorMember] = useDocumentData<OrganizationMemberDocument>(user && doc(orgRef, 'members', user.uid).withConverter(docConverter));

    useEffect(() => {
        if(window.location.host.split('.')[0] === 'chew') {
            setOrgId('d8wUjGjUJkv51sjYNTnK');
        }
    }, [])

    // useEffect(() => {
    //     if(user == null) setOrgId('global');
    // }, [user])


    const toggleOrg = () => {
        if(!userDetails) return;
        if (orgId === 'global') {
            setOrgId(userDetails?.organization || 'global');
        } else {
            setOrgId('global');
        }
    }
    const isOwner = memberDoc?.role == 'owner';
    const isAdmin = memberDoc?.role == 'admin' || isOwner;

    return {
        userOrg: userDetails?.organization,
        orgDoc,
        orgId,
        orgRef,
        isOwner,
        isAdmin,
        loadingDoc: loading,
        toggleOrg,
        memberDoc,
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
