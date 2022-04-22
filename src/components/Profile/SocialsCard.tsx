//@ts-nocheck
import { IconButton } from '@mui/material';
import { EditOutlined, GitHub, LanguageOutlined, YouTube } from '@mui/icons-material';
import React, { useState } from 'react';
import EditSocialsDialog from './EditSocialsDialog';

const SocialLink = ({ link, icon }) => (
    <div className="flex flex-row items-center space-x-2 text-gray-600">
        {icon}
        <a className="text-sm" target="_blank" href={'//'+link}>{link}</a>
    </div>
)
const SocialsCard = ({socials, isUser}) => {
    const [openEditSocials, setOpenEditSocials] = useState(false);

    return <>
        <EditSocialsDialog open={openEditSocials} onClose={() => setOpenEditSocials(false)}/>
        {(isUser || socials) && <div className="relative flex flex-col p-3 m-2 shadow-lg rounded-md bg-white space-y-2">
            <div className=" flex flex-row space-between">
                <p className="font-semibold text-lg">Socials</p> 
                <div className="absolute top-0 right-0 m-1 text-white rounded-full bg-gray-100 transform scale-75">
                    {isUser && <IconButton onClick={e => setOpenEditSocials(true)} size="large">
                        <EditOutlined />
                    </IconButton>}
                </div>
            </div>
            {socials?.github && <SocialLink link={socials?.github} icon={<GitHub/>} />}
            {socials?.personal && <SocialLink link={socials?.personal} icon={<LanguageOutlined/>} />}
            {socials?.youtube && <SocialLink link={socials?.youtube} icon={<YouTube/>} />}
            {(socials?.github === "" && socials?.personal === "" && socials?.youtube === "") && <h3 className="text-gray-500">No Social Links Added</h3>}
        </div>}
    </>;
}

export default SocialsCard;
