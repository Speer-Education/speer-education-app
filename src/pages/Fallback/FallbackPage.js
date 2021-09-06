import React from 'react'

function FallbackPage({error}) {
    return (
        <div>
            <h1 className="text-xl text-center">If you are seeing this, an error has occured! Please refresh the page.</h1>
        </div>
    )
}

export default FallbackPage
