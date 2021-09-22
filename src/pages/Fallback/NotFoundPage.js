import { Button } from '@mui/material'
import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

function NotFoundPage() {
    return (
        <div className="bg-gray-100 h-screen overflow-x-hidden">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Error 404 | Speer Education</title>
            </Helmet>
            <div className="flex flex-row w-screen h-screen">
                <div className="flex-1 text-left p-20 bg-white space-y-4">
                    <img className="h-24 -ml-4" src="/full-transparent-logo.png" alt="speer logo"/>
                    <div className="space-y-2 text-speer-yellow font-extrabold">
                        <h1><span className="text-speer-blue">Error</span> 404</h1>
                        <h1>PAGE NOT FOUND</h1>
                        <Link to="/app">
                            <Button className="w-full " variant="outlined" style={{marginTop: "1rem", border: "2px solid #084887", padding: "2rem"}}>
                                <h2 className="text-gray-600">Click here to return to the <span className="text-speer-yellow">dashboard!</span></h2>
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="flex-1 hidden md:block">
                    <img className="w-full h-full object-contain p-32" src="/rocket-logo@3x.png" alt="speer rocket logo"/>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage
