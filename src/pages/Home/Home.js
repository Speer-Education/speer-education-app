import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ScrollAnimation from 'react-animate-on-scroll';
import {sliderSettings, sliderItems} from './HomeConfig';
import { ContactUsForm } from '../../components/Forms/contactus'
import "animate.css/animate.min.css";
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
            <section className="home-about">
                <ScrollAnimation animateOnce animateIn="animate__fadeInUp">
                    <div className="home__spacer" id="about"></div>
                    <h1 className="home-about__heading">ABOUT</h1>
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
                </ScrollAnimation>
            </section>
            <section className="home-team">
                <ScrollAnimation animateOnce animateIn="animate__fadeInUp">
                <div className="home__spacer" id="team"></div>
                <h1 className="home-team__heading">TEAM</h1>
                {/* Flexbox container, 2 div's , then inside each div, a div with image as background and below, title and name */}
                <div className="home-team__container">
                    <div className="home-team__card">
                        <div className="home-team__card-pic" id="profPic1"></div>
                        <div className="home-team__card-bio">
                            <h2>Harsha Bharadwaj</h2>
                            <p>Founder and Managing Director</p>
                            <a href="https://www.linkedin.com/in/harsha-bharadwaj-8a5219204"><i class="fab fa-2x fa-linkedin-in"></i></a>
                        </div>
                    </div>
                    <div className="home-team__card">
                        <div className="home-team__card-pic" id="profPic2"></div>
                        <div className="home-team__card-bio">
                            <h2>Parv Badra</h2>
                            <p>Chief Technology Officer</p>
                            <a href="https://www.linkedin.com/in/parvbhadra/"><i class="fab fa-2x fa-linkedin-in"></i></a>
                        </div>
                    </div>
                </div>
                </ScrollAnimation>
            </section>
            <section className="home-universities">
                <ScrollAnimation animateOnce animateIn="animate__fadeInUp">
                    <div className="home__spacer" id="universities"></div>
                    <h1 className="home-universities__heading">UNIVERSITIES</h1>
                    <Slider className="home-universities__carousel" {...sliderSettings}>
                        {sliderItems.map(item => (
                            <img className="home-universities__carousel-images" key={item.title} src={item.src} alt={item.title}></img>
                        ))}
                    </Slider>
                </ScrollAnimation>
            </section>
            <section className="home-launch">
                <ScrollAnimation animateOnce animateIn="animate__fadeInUp">
                    <div className="home__spacer" id="launch"></div>
                    {/* H1 */}
                    {/* Flex container, then flex content on left side, and form on right side. */}
                    <h1 className="home-launch__heading">WE'RE LAUNCHING SOON!</h1>
                    <div className="home-launch__container">
                        <div className="home-launch__info">
                            <p>Dubai, United Arab Emirates</p>
                            <p><a href="mailto:speereducation@gmail.com"><i class="far fa-envelope"></i> speereducation@gmail.com</a></p>
                            <p>Share your contact information and we'll keep you informed about launch dates, beta programs and new features!</p>
                            <a href="https://www.linkedin.com/company/speereducation/"><i class="fab fa-2x fa-linkedin-in"></i></a>
                        </div>
                        <ContactUsForm/>
                    </div>
                </ScrollAnimation>
            </section>
            <section className="home-footer">

            </section>
        </div>
    )
}
