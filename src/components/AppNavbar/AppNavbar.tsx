import { UserMenu } from './UserMenu/UserMenu'
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import PeopleTwoToneIcon from '@mui/icons-material/PeopleTwoTone';
import MessageTwoToneIcon from '@mui/icons-material/MessageTwoTone';
import LibraryBooksTwoToneIcon from '@mui/icons-material/LibraryBooksTwoTone';
import Badge from '@mui/material/Badge';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useAuth } from '../../hooks/useAuth';
import React, { useEffect, useState } from 'react';
import SlideTransition from '../SlideTransition/SlideTransition';
import { AccountBalanceOutlined, SvgIconComponent } from '@mui/icons-material';
import { Switch } from '@mui/material';
import { useSpeerOrg } from '../../hooks/useSpeerOrg';

/**
 * Component for the link in the navbar
 * @component
 * @param {Component} IconComponent 
 * @param {string} title
 * @param {string} href
 * @returns 
 */
const NavBarLink = ({ IconComponent, title, href, isContactIcon } : {
  IconComponent: SvgIconComponent,
  title: string,
  href: string,
  isContactIcon?: boolean,
}) => {
  const location = useLocation();
  const { user, userDetails } = useAuth();
  const [numUnread, setNumUnread] = useState(0);

  useEffect(() => {
    if(!user) return;
    if (isContactIcon){
      let counter = 0;

      for (const room in userDetails?.activeRooms){

        if (userDetails?.activeRooms[room].read[user.uid] === false){
          counter++;
        }
        // if (room.read[userDetails.user_id] === false){
        //   counter++;
        // }
      }
  
      setNumUnread(counter);
    }

  }, [userDetails?.activeRooms, user])

  return <Link to={href} className="text-gray-800 no-underline flex-1 lg:flex-none">
    <div className="grid place-items-center h-full lg:px-5 hover:bg-gray-100 transition-colors cursor-pointer rounded-lg">
      <div className="flex-1 flex flex-col items-center">
        {isContactIcon && numUnread !== 0 ? <Badge badgeContent={numUnread} color="error">
          <IconComponent className="text-2xl" style={{ color: href !== '/' && location.pathname.includes(href) ? '#F58A07' : '#084887'}} />
        </Badge>: <IconComponent className="text-2xl" style={{ color: href !== '/' && location.pathname.includes(href) ? '#F58A07' : '#084887'}} />}
        <p className="text-xs text-center lg:text-base">{title}</p>
      </div>
    </div>
  </Link>
}

/**
 * App navbar shown to users
 * @component
 * @returns 
 */
const AppNavbar = () => {
  const navigate = useNavigate();
  const { user, userToken } = useAuth();
  const { toggleOrg, orgId, orgDoc } = useSpeerOrg();

  const orgAdmin = (orgDoc?.permissions?.[user?.uid || ''] == 'owner') || (orgDoc?.permissions?.[user?.uid || ''] == 'admin')
  
  return (<SlideTransition in timeout={50}>
    <div className="fixed bottom-0 lg:sticky lg:top-0 w-full h-14 lg:p-4 lg:h-24 bg-white z-10 shadow-md flex flex-row items-center justify-between">
      <img className="h-20 hidden lg:block cursor-pointer" src="/full-transparent-logo.png" alt="logo" onClick={() => navigate('/')} />
      <div className="w-full lg:w-auto flex flex-row max-w-4xl justify-center items-center space-x-3">
        <SearchBar />
        <div className="flex flex-row h-full flex-1 lg:flex-none">
          <NavBarLink IconComponent={HomeTwoToneIcon} title="Home" href="/" />
          <NavBarLink IconComponent={PeopleTwoToneIcon} title="New Mentors" href="/mentors" />
          <NavBarLink IconComponent={MessageTwoToneIcon} isContactIcon title="Contacts" href="/messages" />
          {orgAdmin && <NavBarLink IconComponent={LibraryBooksTwoToneIcon} title="Admin" href="/orgadmin" />}
          {userToken?.organization && <Switch onChange={toggleOrg} checked={orgId != 'global'} />}
          {/* <NavBarLink IconComponent={Notif0.  icationsTwoToneIcon} title="Notifications"/> */}
        </div>
        {/* <div className="hidden lg:block" >
          <Button variant="contained" color="primary" endIcon={<ArrowDropDownTwoToneIcon/>} style={{textTransform: "capitalize"}}>
            Compose a message
          </Button>
        </div> */}
        <UserMenu />
      </div>
      {/* Transparent image spcaer to center the stuff in the middle */}
      <img className="h-20 hidden lg:block opacity-0 cursor-pointer" src="/full-transparent-logo.png" alt="logo" />
    </div>
  </SlideTransition>);
};

export default AppNavbar;