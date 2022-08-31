import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/Messaging/Sidebar';
import Chat from '../../../components/Messaging/Chat';
import { Route, Routes, useMatch } from "react-router-dom";
import './Messaging.css';
import { Helmet } from "react-helmet";
import { useMediaQuery } from 'react-responsive'
import StatsCard from '../../../components/Dashboard/StatsCard';
import SlideTransition from '../../../components/SlideTransition/SlideTransition';
import Zoom from '@mui/material/Zoom';

function Messaging() {

    const [screenSize, setScreenSize] = useState(3);
    const [leftSideSize, setLeftSideSize] = useState('350px');

    const isScreenXtraLarge = useMediaQuery({ maxWidth: 1280 })
    const isScreenLarge = useMediaQuery({ maxWidth: 1024})
    const isScreenMedium = useMediaQuery({ maxWidth: 767 })

    const isSidebarOnly = useMatch('/messages')
    useEffect(() => {
        if (isScreenMedium) {
            setScreenSize(0)
        } else if (isScreenLarge) {
            setScreenSize(1)
            setLeftSideSize('245px')
        } else if (isScreenXtraLarge) {
            setScreenSize(2)
            setLeftSideSize('275px')
        } else {
            setScreenSize(3)
            setLeftSideSize('350px')
        }
    }, [isScreenXtraLarge, isScreenLarge, isScreenMedium])
    
    return (
        <Zoom in={true} >
            <div className="messaging h-app">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Messaging | Speer Education</title>
                </Helmet>
                <div className="flex flex-row h-full max-h-full w-screen">
                    {screenSize >= 1 ?
                        // Laptop and Ipad
                        <div className="flex flex-col h-full h-app" style={{ width: `${leftSideSize}` }}>
                            <Sidebar screenSize={screenSize}/>
                            <StatsCard />
                        </div>
                        : /* Phone */(isSidebarOnly && <div className="flex flex-col h-full ml-auto mr-auto h-app" style={{ width: `98%` }}>
                            <p className="font-semibold text-lg pt-3 pl-2">   
                                Your Recent Chats
                            </p>
                            <Sidebar screenSize={screenSize}/>
                        </div>)}
                    <Routes>
                        <Route path={`/:roomId`} element={<Chat screenSize={screenSize} />}/>
                    </Routes>
                </div>
            </div>
        </Zoom>
    )
}

export default Messaging
