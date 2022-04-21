import React from 'react'

function FallbackPage({ error }) {
    return (
        <div className="grid place-items-center w-screen h-screen bg-gray-100">
            <div className="flex flex-col items-center space-y-2">
                <img className="object-contain w-24 p-4" src="/rocket-logo@3x.png" />
                <h2>There was an Error</h2>
                <p>Please Refresh The Page</p>
                {error.toString()}
                <div className="animate-pulse h-2 rounded-md w-52 bg-gray-400"></div>
            </div>
        </div>
    )
}

export default FallbackPage
