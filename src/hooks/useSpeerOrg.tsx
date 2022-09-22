import { doc } from "firebase/firestore";
import { useSnackbar } from "notistack";
import { createContext, PropsWithChildren, useContext, useEffect, useMemo } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db, docConverter } from "../config/firebase";
import { OrganizationDocument, OrganizationMemberDocument } from "../types/Organization";
import { useAuth } from "./useAuth";
import { useLocalStorage } from "./useHooks";

const useSpeerOrgProvider = () => {
    const { user, userDetails, userToken } = useAuth();
    const [orgId, setOrgId] = useLocalStorage<string>('current_org','global');
    const orgRef = useMemo(() => doc(db, 'organization', orgId).withConverter(docConverter), [orgId]);
    const [orgDoc, loading, error] = useDocumentData<OrganizationDocument>(orgRef);
    const [memberDoc, loadMember, errorMember] = useDocumentData<OrganizationMemberDocument>(user && doc(orgRef, 'members', user.uid).withConverter(docConverter));
    const { enqueueSnackbar } = useSnackbar();
    
    useEffect(() => {
        if (error) enqueueSnackbar(error.message, { variant: 'error' });
    }, [error, enqueueSnackbar]); 

    
    useEffect(() => {
        if (errorMember) enqueueSnackbar(errorMember.message, { variant: 'error' });
    }, [errorMember, enqueueSnackbar]); 

    useEffect(() => {
        // if(window.location.host.split('.')[0] === 'chew') {
            //check if user belongs to this organization first, if not, redirect to home page
            //! FIX THIS BEFORE LAUNCH
            if(userToken?.organization !== 'd8wUjGjUJkv51sjYNTnK') return;
            setOrgId('d8wUjGjUJkv51sjYNTnK');
        // }
    }, [userToken, setOrgId])

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
