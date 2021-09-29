import { UserMenu } from './UserMenu/UserMenu'
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import PeopleTwoToneIcon from '@mui/icons-material/PeopleTwoTone';
import MessageTwoToneIcon from '@mui/icons-material/MessageTwoTone';
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import history from '../../hooks/history';
import SearchBar from './SearchBar';
import { useAuth } from '../../hooks/useAuth';
import React, { useEffect, useState } from 'react';

/**
 * Component for the link in the navbar
 * @component
 * @param {Component} IconComponent 
 * @param {string} title
 * @param {string} href
 * @returns 
 */
const NavBarLink = ({ IconComponent, title, href, isContactIcon }) => {

  const { userDetails } = useAuth();
  const [numUnread, setNumUnread] = useState(0);

  useEffect(() => {

    if (isContactIcon){
      let counter = 0;

      for (const room in userDetails?.activeRooms){

        if (userDetails?.activeRooms[room].read[userDetails.user_id] === false){
          counter++;
        }
        // if (room.read[userDetails.user_id] === false){
        //   counter++;
        // }
      }
  
      setNumUnread(counter);
    }

  }, [userDetails?.activeRooms])

  return <Link to={href} className="text-gray-800 no-underline flex-1 lg:flex-none">
    <div className="grid place-items-center h-full lg:px-5 hover:bg-gray-100 transition-colors cursor-pointer rounded-lg">
      <div className="flex-1 flex flex-col items-center">
        {isContactIcon && numUnread !== 0 ? <Badge badgeContent={numUnread} color="error">
          <IconComponent className="text-2xl" style={{ color: (href === history.location.pathname) ? '#F58A07' : '#084887'}} />
        </Badge>: <IconComponent className="text-2xl" style={{ color: (href === history.location.pathname) ? '#F58A07' : '#084887'}} />}
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
  return (
    <div className="fixed bottom-0 lg:sticky lg:top-0 w-full h-14 lg:p-4 lg:h-24 bg-white z-10 shadow-md flex flex-row items-center justify-between">
      <img className="h-20 hidden lg:block cursor-pointer" src="/full-transparent-logo.png" alt="logo" onClick={() => history.push('/')} />
      <div className="w-full lg:w-auto flex flex-row max-w-4xl justify-center items-center space-x-3">
        <SearchBar />
        <div className="flex flex-row h-full flex-1 lg:flex-none">
          <NavBarLink IconComponent={HomeTwoToneIcon} title="Home" href="/" />
          <NavBarLink IconComponent={PeopleTwoToneIcon} title="New Mentors" href="/mentors" />
          <NavBarLink IconComponent={MessageTwoToneIcon} isContactIcon title="Contacts" href="/messages" />
          {/* <NavBarLink IconComponent={NotificationsTwoToneIcon} title="Notifications"/> */}
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
  );
};

export default AppNavbar;
