import React from 'react';
import Navbar from '../Navbar';
import './Home.css';

export default function Home() {
    return (
        <div className="home">
            <Navbar/>
            <section className="home-intro" id="intro">
                {/* Div with flex, that will be row, then as screen gets smaller, becomes col */}
                {/* First div with Content, h1, button etc. Second with Image.*/}
                <div className="home-intro__container">
                    <div className="home-intro__content">
                        <h1 className="home-intro__content-title">Speer Education</h1>
                        <p>Connecting adept college students with passionate high schoolers to enhance their subject 
                            specific awareness</p>
                        {/* 2 Buttons */}
                    </div>
                    <div className="home-intro__image">
                        <img src="https://static.s123-cdn-static-d.com/ready_uploads/svg/normal_604d33874cc33.svg" alt=""></img>
                    </div>
                </div>
            </section>
            <section className="home-about" id="about">

            </section>
            <section className="home-team" id="team">

            </section>
            <section className="home-universities" id="universities">

            </section>
            <section className="home-launch" id="launch">

            </section>
            {/* Add a Footer Component*/}
        </div>
    )
}
