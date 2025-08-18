import React from 'react';
import Plumber from '../assets/plumber.png';
import Electrician from '../assets/electrician.png';
import Teaching from '../assets/teaching.png';
import Painting from '../assets/painting.png';
import Flooring from '../assets/flooring.png';
import Renovation from '../assets/renovation.png';
import bannerImage from '../assets/ourservices.png'

function Services() {
    return (
        <div className="services-Section">
            <div className="service-banner" style={{ backgroundImage: `url(${bannerImage})` }}>
                    <div className="services-banner-overlay">
                      <h1>Our Services</h1>
                    </div>
            </div>

            <div >
                <h2 className='services-topic'>Best Services We Offer For You</h2>
            </div>

            <div className="service-grid">
                <div className="service-item">
                    <img src={Plumber} alt="Plumber" className="services-Image" />
                    <h4 className="service-name">Plumber</h4>
                    <p className="service-description">Expert plumbing services for all your needs.</p>
                    <button className="services-read-more">Read More</button>
                </div>
                
                <div className="service-item">
                    <img src={Electrician} alt="Electrician" className="services-Image" />
                    <h4 className="service-name">Electrician</h4>
                    <p className="service-description">Reliable electrical solutions for place.</p>
                    <button className="services-read-more">Read More</button>
                </div>
                <div className="service-item">
                    <img src={Teaching} alt="Teaching" className="services-Image" />
                    <h4 className="service-name">Teaching</h4>
                    <p className="service-description">Find qualified tutors for any subject.</p>
                    <button className="services-read-more">Read More</button>
                </div>
                <div className="service-item">
                    <img src={Painting} alt="Painting" className="services-Image" />
                    <h4 className="service-name">Painting</h4>
                    <p className="service-description">Professional painting services for your place.</p>
                    <button className="services-read-more">Read More</button>
                </div>
                <div className="service-item">
                    <img src={Flooring} alt="Flooring" className="services-Image" />
                    <h4 className="service-name">Flooring</h4>
                    <p className="service-description">Expert flooring services to beautify your space.</p>
                    <button className="services-read-more">Read More</button>
                </div>
                <div className="service-item">
                    <img src={Renovation} alt="Renovation" className="services-Image" />
                    <h4 className="service-name">Renovation</h4>
                    <p className="service-description">Custom renovation solutions for your projects.</p>
                    <button className="services-read-more">Read More</button>
                </div>
            </div>
        </div>
    );
}

export default Services;
