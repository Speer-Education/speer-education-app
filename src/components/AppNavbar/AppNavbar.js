import { UserMenu } from './UserMenu/UserMenu'
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import PeopleTwoToneIcon from '@material-ui/icons/PeopleTwoTone';
import MessageTwoToneIcon from '@material-ui/icons/MessageTwoTone';
import NotificationsTwoToneIcon from '@material-ui/icons/NotificationsTwoTone';
import ArrowDropDownTwoToneIcon from '@material-ui/icons/ArrowDropDownTwoTone';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import history from '../../hooks/history';

/**
 * Component for the link in the navbar
 * @component
 * @param {Component} IconComponent 
 * @param {string} title
 * @param {string} href
 * @returns 
 */
const NavBarLink = ({IconComponent, title, href}) => {
  return <Link to={href} className="text-gray-800 no-underline">
    <div className="grid place-items-center h-full px-5 hover:bg-gray-100 cursor-pointer rounded-lg">
      <div className="flex-1 flex flex-col items-center">
        <IconComponent className="h-8 w-8" style={{ color: (href == history.location.pathname)?'#F58A07':'#084887'}}/>
        <p className="">{title}</p>
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
    <div className="fixed bottom-0 lg:sticky lg:top-0 w-full justify-evenly items-center p-4 h-24 bg-white z-10 flex flex-row">
      <img className="h-20 hidden lg:block" src="/full-transparent-logo.png" alt="logo"/>
      <div className="flex flex-row h-full">
        <NavBarLink IconComponent={HomeTwoToneIcon} title="Home" href="/app"/>
        <NavBarLink IconComponent={PeopleTwoToneIcon} title="New Mentors" href="/app/mentors"/>
        <NavBarLink IconComponent={MessageTwoToneIcon} title="Messaging" href="/app/messages"/>
        <NavBarLink IconComponent={NotificationsTwoToneIcon} title="Notifications"/>
      </div>
      <div className="hidden lg:block" >
        <Button variant="contained" color="primary" endIcon={<ArrowDropDownTwoToneIcon/>} style={{textTransform: "capitalize"}}>
          Compose a message
        </Button>
      </div>
      <UserMenu />
    </div>
  );
};

export default AppNavbar;
