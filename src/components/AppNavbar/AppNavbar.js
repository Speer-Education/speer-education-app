import { UserMenu } from './UserMenu/UserMenu'
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import PeopleTwoToneIcon from '@material-ui/icons/PeopleTwoTone';
import MessageTwoToneIcon from '@material-ui/icons/MessageTwoTone';
import NotificationsTwoToneIcon from '@material-ui/icons/NotificationsTwoTone';
import ArrowDropDownTwoToneIcon from '@material-ui/icons/ArrowDropDownTwoTone';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

/**
 * Component for the link in the navbar
 * @component
 * @param {Component} IconComponent 
 * @param {string} title
 * @param {string} href
 * @returns 
 */
export const NavBarLink = ({IconComponent, title, href}) => {
  return <Link to={href}>
    <div className="grid place-items-center h-full px-5 hover:bg-gray-100 cursor-pointer">
      <div className="flex-1 flex flex-col items-center">
        <IconComponent className="h-8 w-8"/>
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
export const AppNavbar = () => {
  return (
    <div className="flex flex-row w-full justify-evenly items-center p-8 h-32">
      <img className="h-20" src="/full-transparent-logo.png"/>
      <div className="flex flex-row h-full">
        <NavBarLink IconComponent={HomeTwoToneIcon} title="Home" href="/app"/>
        <NavBarLink IconComponent={PeopleTwoToneIcon} title="My Mentors" href="/app/mentors"/>
        <NavBarLink IconComponent={MessageTwoToneIcon} title="Messaging" href="/app/messages"/>
        <NavBarLink IconComponent={NotificationsTwoToneIcon} title="Notifications"/>
      </div>
      <Button variant="outlined" color="primary" endIcon={<ArrowDropDownTwoToneIcon/>}>
        Compose a message
      </Button>
      <UserMenu />
    </div>
  );
};
