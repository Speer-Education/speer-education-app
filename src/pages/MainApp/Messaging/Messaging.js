import React from 'react';
import Sidebar from '../../../components/Messaging/Sidebar';
import Chat from '../../../components/Messaging/Chat';
import { Route, useRouteMatch } from "react-router-dom";
import './Messaging.css';
import {Helmet} from "react-helmet";
//Might make this a container since it now does routing as well.

// Should eventually make this responsive, mobile version will not show the sidebar and messaging section 
//at the same time. When the person is clicked it shows the messaging section only, with an arrow to leave back to menu.
function Messaging() {
    let { path } = useRouteMatch();

    return (
        <div className="messaging">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Messaging | Speer Education</title>
            </Helmet>
            <div className="messaging__body">
                <Sidebar /> 
                <Route exact path={`${path}/:roomId`}>
                    <Chat />
                </Route>
            </div>
        </div>
    )
}

export default Messaging
