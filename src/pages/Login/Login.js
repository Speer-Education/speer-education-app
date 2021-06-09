import React from 'react';
import './Login.css';
import { Button } from '@material-ui/core';
import { useAuth } from "../../hooks/useAuth";

export default function Login() {

    const { user , initGoogleSignIn, initFacebookSignIn, signOut } = useAuth();

    const googleSignIn = (e) => {
        e.preventDefault();
        initGoogleSignIn();
    }

    const facebookSignIn = (e) => {
        e.preventDefault();
        initFacebookSignIn();
    }

    const logOut = () => {
        signOut()
    }

    return (
        <div className="login">
            <form>
                { user ? <p>Logged In!</p>: <p>Not Logged In</p>}
                <h1>Speer Education</h1>
                <div className="login__buttons">
                    <Button type="submit" onClick={googleSignIn}>Sign In With Google<i className="fab fa-google"></i></Button>
                    <Button type="submit" onClick={facebookSignIn}>Sign In With Facebook<i className="fab fa-facebook"></i></Button>
                </div>
                { user ? <Button type="submit" onClick={logOut}>Sign Out</Button> : null}
            </form>
        </div>
    )
}
