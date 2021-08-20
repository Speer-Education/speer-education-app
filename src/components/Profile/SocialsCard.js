import { GitHub, LanguageOutlined } from '@material-ui/icons';
import React from 'react';

const SocialLink = ({ link, icon }) => (
    <div className="flex flex-row items-center space-x-2 text-gray-600">
        {icon}
        <a className="text-sm" target="_blank" href={'//'+link}>{link}</a>
    </div>
)
const SocialsCard = ({socials}) => {
    return (
        <div className="flex flex-col p-3 m-2 shadow-lg rounded-md bg-white space-y-2">
            <p className="font-semibold text-lg">Socials</p>
            {socials.github && <SocialLink link={socials.github} icon={<GitHub/>} />}
            {socials.personal && <SocialLink link={socials.personal} icon={<LanguageOutlined/>} />}
        </div>
    );
}

export default SocialsCard;
