import React from 'react';
import './Login.css';
import { Button } from '@material-ui/core';
import { useAuth } from "../../hooks/useAuth";
import { Link } from 'react-router-dom';

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
                <h1>Speer Education</h1>
                { user ? <p>Logged In!</p>: <> <p>Not Logged In</p>
                <div className="login__buttons">
                    <Button type="submit" onClick={googleSignIn}>Sign In With Google<i className="fab fa-google"></i></Button>
                    <Button type="submit" onClick={facebookSignIn}>Sign In With Facebook<i className="fab fa-facebook"></i></Button>
                </div> </> }
                { user ? <div><Link to="/app">Go To App</Link><Button type="submit" onClick={logOut}>Sign Out</Button></div>: null}
            </form>
        </div>
    )
}
