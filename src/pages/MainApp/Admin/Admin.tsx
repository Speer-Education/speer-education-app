import React, { Component, FC, PropsWithChildren, PropsWithoutRef, ReactChildren, ReactElement, Suspense, useEffect, useState } from 'react';
import { AccountCircle, AdminPanelSettingsRounded, AppRegistrationTwoTone, AppShortcutTwoTone, AppsTwoTone, Article, CardMembershipRounded, ClassRounded, DesignServicesTwoTone, GroupRounded, Home, LinkRounded, LogoutRounded, PrecisionManufacturingTwoTone } from "@mui/icons-material";
import { Collapse, IconButton, LinearProgress, Tooltip } from "@mui/material";
import AccountBalanceTwoToneIcon from '@mui/icons-material/AccountBalanceTwoTone';
import { Helmet } from 'react-helmet';
import {Link, useLocation, useNavigate, Routes, Route, Navigate} from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { UserClaims } from '../../../types/User';
import SlideTransition from '../../../components/SlideTransition/SlideTransition';
import { useSpeerOrg } from '../../../hooks/useSpeerOrg';
import {NoMatch} from '../../Fallback/NoMatch';
import FallbackPage from '../../Fallback/FallbackPage';
import AppLoader from '../../../components/Loader/AppLoader';

type LinkData = {
    href?: string, 
    label: string, 
    children?: LinkData[], 
    Icon: FC<{className:  string}>
}

const LinkItem = ({ href, label, children, Icon }: LinkData) => {
    const location = useLocation();
    const path = location.pathname.replace('/orgadmin/','').replace('/orgadmin','');
    const [extended, setExtended] = useState(path.startsWith(href!));
    // check if userToken has any one of permission
    if(children) {
        return <div key={href} className="flex flex-col">
            <div onClick={() => setExtended(!extended)} className={`cursor-pointer px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors flex sm:flex-row flex-col items-center text-sm font-medium sm:space-x-2`}>
                <Icon className="w-5 h-5 text-sm sm:text-base"/> <span>{label}</span>
            </div>
            <Collapse in={extended}>
                <div className="flex flex-col sm:pl-4">
                    {children.map((props) => <LinkItem key={props.href} {...props}/>)}
                </div>
            </Collapse>
        </div>
    }
    return <Link to={href!} key={href}>
        <div className={`cursor-pointer px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors flex sm:flex-row flex-col items-center text-sm font-medium sm:space-x-2 ${path == href ? 'bg-blue-100 text-blue-600': 'text-neutral-700'}`}>
            <Icon className="w-5 h-5 text-sm sm:text-base"/> <span>{label}</span>
        </div>
    </Link>
}

const AdminLayout: FC<PropsWithChildren<{}>>  =  ({ children }) => {
    const { user, userToken, signOut } = useAuth();
    const { orgDoc, orgId } = useSpeerOrg();
    const navigate = useNavigate();

    useEffect(() => {
        if(orgId == 'global') navigate('/');
    }, [orgId])

    const links = [
        { href: "users", label: "Users", Icon: GroupRounded },
        { href: "blogs", label: "Blogs", Icon: Article, children: [
            { href: "blogs/new", label: "Create Blog", Icon: AppShortcutTwoTone },
            { href: "blogs/list", label: "List Blogs", Icon: AppShortcutTwoTone },
        ] },
    ]

    return <div className="h-app w-screen pb-12 pt-2 sm:pb-2 sm:grid grid-cols-[14rem_1fr] gap-4 max-w-[84rem] sm:px-4 overflow-hidden">
        <Helmet>
            <title>Member</title>
        </Helmet>
        <aside className="flex flex-col w-screen fixed bg-white rounded-lg sm:w-auto sm:max-h-screen sm:pt-6 sm:sticky bottom-0 top-auto sm:top-0 sm:bottom-auto print:hidden shadow-lg z-50 sm:px-4">
            <header className="flex-row justify-between items-center sm:flex hidden">
                <h1 className="text-2xl font-semibold sm:block hidden">{orgDoc?.name}</h1>
            </header>
            <div className="flex sm:flex-col flex-row space-x-1 sm:space-x-0 w-screen sm:w-48 sm:space-y-1 sm:py-3 backdrop-blur overflow-hidden">
                {links.map((props) => <LinkItem key={props.href} {...props}/>)}
            </div>
        </aside>
        <SlideTransition in timeout={150}>
            <div className="flex flex-col overflow-x-hidden overflow-y-auto p-3 bg-white rounded-lg shadow-lg">
                {children}
            </div>
        </SlideTransition>
    </div>
}

const LazyUsersManager = React.lazy(() => import('../../../components/OrgAdmin/UsersManager'));
const LazyBlogsManager = React.lazy(() => import('../../../components/OrgAdmin/BlogsManager'));
const LazyBlogEditor = React.lazy(() => import('../../../components/OrgAdmin/BlogEditor'));
// const LazyMentorsManager = React.lazy(() => import('../../../components/OrgAdmin/MentorsManager'));
const LazyDashboard = React.lazy(() => import('../../../components/OrgAdmin/Dashboard'));

const OrganizationAdmin: FC<{}> = () => {
    return <AdminLayout>
        <Suspense fallback={<div className='w-full h-full grid place-items-center'><LinearProgress/></div>}>
            <Routes>
                <Route path="/" element={<Navigate to="users" />} />
                <Route path="/users" element={<LazyUsersManager />} />
                <Route path="/blogs/list" element={<LazyBlogsManager />} />
                <Route path="/blogs/:id" element={<LazyBlogEditor />} />
                {/* <Route path="/mentors" element={<LazyMentorsManager />} /> */}
            </Routes>
        </Suspense>
    </AdminLayout>
}

export default OrganizationAdmin;