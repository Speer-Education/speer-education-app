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
                        <div className="home-intro__button-container">
                            <a href="#about"><button>ABOUT US</button></a>
                            <a href="#launch"><button>KEEP INFORMED</button></a>
                        </div>
                    </div>
                    <div className="home-intro__image">
                        <img src="https://static.s123-cdn-static-d.com/ready_uploads/svg/normal_604d33874cc33.svg" alt=""></img>
                    </div>
                </div>
            </section>
            <section className="home-about" id="about">
                {/* Flexbox, H1 */}
                <h1 className="home-about__heading">ABOUT</h1>
                {/* Flexbox, Left Side text, Right Side image */}
                <div className="home-about__container">
                    <div className="home-about__content">
                        <p>
                        Speer is a mentorship platform for passionate economics students who wish to learn more about economics/business 
                        from college mentors. We strive to hone students' passions in Economics, Business, and Finance, especially with 
                        COVID-19 acting as an unnecessary barrier for high-school students wanting to inflict change upon society.
                        </p>
                        <br/>
                        <p>
                        Through our platform, you'll be able to connect with a wide range of mentors and hold conversations in numerous 
                        categories such as internships, real world application, class recommendations, and much more, all for free!
                        </p>
                    </div>
                    <div className="home-about__image">
                        <img src="https://static1.s123-cdn-static-a.com/uploads/5219948/normal_60a25a8740cb6.svg" alt=""></img>
                    </div>
                </div>
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
