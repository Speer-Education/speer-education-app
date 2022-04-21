import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/Messaging/Sidebar';
import Chat from '../../../components/Messaging/Chat';
import { Route, Routes, useMatch } from "react-router-dom";
import './Messaging.css';
import { Helmet } from "react-helmet";
import { useMediaQuery } from 'react-responsive'
import StatsCard from '../../../components/Dashboard/StatsCard';
import SlideTransition from '../../../components/SlideTransition/SlideTransition';
//Might make this a container since it now does routing as well.

// Should eventually make this responsive, mobile version will not show the sidebar and messaging section 
//at the same time. When the person is clicked it shows the messaging section only, with an arrow to leave back to menu.
function Messaging() {

    const [screenSize, setScreenSize] = useState(3);
    const [leftSideSize, setLeftSideSize] = useState('350px');

    const isScreenXtraLarge = useMediaQuery({ query: '(max-width: 1280px' })
    const isScreenLarge = useMediaQuery({ query: '(max-width: 1024px)' })
    const isScreenMedium = useMediaQuery({ query: '(max-width: 767px)' })

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
    console.log(screenSize)
    return (
        <div className="messaging h-app">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Messaging | Speer Education</title>
            </Helmet>
            <SlideTransition in timeout={50}>
                <div className="flex flex-row h-full max-h-full w-screen">
                    {screenSize >= 1 ?
                        <div className="flex flex-col h-full h-app" style={{ width: `${leftSideSize}` }}>
                            <Sidebar screenSize={screenSize}/>
                            <StatsCard />
                        </div>
                        : (isSidebarOnly && <div className="flex flex-col h-full ml-auto mr-auto h-app" style={{ width: `98%` }}>
                            <Sidebar screenSize={screenSize}/>
                        </div>)}
                    <Routes>
                        <Route path={`/:roomId`} element={<Chat screenSize={screenSize} />}/>
                    </Routes>
                </div>
            </SlideTransition>
        </div>
    )
}

export default Messaging
