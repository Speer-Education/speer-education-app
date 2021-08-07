import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/Messaging/Sidebar';
import Chat from '../../../components/Messaging/Chat';
import { Route, useRouteMatch } from "react-router-dom";
import './Messaging.css';
import { Helmet } from "react-helmet";
import { useMediaQuery } from 'react-responsive'
import StatsCard from '../../../components/Dashboard/StatsCard';
//Might make this a container since it now does routing as well.

// Should eventually make this responsive, mobile version will not show the sidebar and messaging section 
//at the same time. When the person is clicked it shows the messaging section only, with an arrow to leave back to menu.
function Messaging() {

    let { path } = useRouteMatch();

    const [screenSize, setScreenSize] = useState(3);
    const [leftSideSize, setLeftSideSize] = useState('350px');

    const isScreenXtraLarge = useMediaQuery({ query: '(max-width: 1280px' })
    const isScreenLarge = useMediaQuery({ query: '(max-width: 1024px)' })
    const isScreenMedium = useMediaQuery({ query: '(max-width: 768px)' })

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
        <div className="messaging">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Messaging | Speer Education</title>
            </Helmet>
            <div className="flex flex-row h-full max-h-full w-screen">
                {screenSize >= 1 ?
                    <div className="flex flex-col h-full" style={{ height: 'calc(100vh - 6rem)', width: `${leftSideSize}` }}>
                        <Sidebar />
                        <StatsCard />
                    </div>
                    : <Route exact path={`/app/messages`}>
                        <div className="flex flex-col h-full ml-auto mr-auto" style={{ height: 'calc(100vh - 6rem)', width: `98%` }}>
                            <Sidebar />
                            <StatsCard />
                        </div>
                    </Route>}
                <Route exact path={`${path}/:roomId`}>
                    <Chat screenSize={screenSize} />
                </Route>
            </div>
        </div>
    )
}

export default Messaging
