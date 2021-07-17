import { UserMenu } from './UserMenu/UserMenu'
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import PeopleTwoToneIcon from '@material-ui/icons/PeopleTwoTone';
import MessageTwoToneIcon from '@material-ui/icons/MessageTwoTone';
import NotificationsTwoToneIcon from '@material-ui/icons/NotificationsTwoTone';
import ArrowDropDownTwoToneIcon from '@material-ui/icons/ArrowDropDownTwoTone';
import { Button } from '@material-ui/core';

export const NavBarLink = ({IconComponent, title}) => {
  return <div className="grid place-items-center h-full px-5 hover:bg-gray-100 cursor-pointer">
    <div className="flex-1 flex flex-col items-center">
      <IconComponent className="h-8 w-8"/>
      <p className="">{title}</p>
    </div>
  </div>
}

export const AppNavbar = () => {
  return (
    <div className="flex flex-row w-full justify-evenly items-center p-8 h-32">
      <img className="h-20" src="/full-transparent-logo.png"/>
      <div className="flex flex-row h-full">
        <NavBarLink IconComponent={HomeTwoToneIcon} title="Home"/>
        <NavBarLink IconComponent={PeopleTwoToneIcon} title="My Mentors"/>
        <NavBarLink IconComponent={MessageTwoToneIcon} title="Messaging"/>
        <NavBarLink IconComponent={NotificationsTwoToneIcon} title="Notifications"/>
      </div>
      <Button variant="outlined" color="primary" endIcon={<ArrowDropDownTwoToneIcon/>}>
        Compose a message
      </Button>
      <UserMenu />
    </div>
  );
};
