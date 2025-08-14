import React from 'react';
import '../Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section text-center text-white d-flex align-items-center justify-content-center">
        <div className="hero-content">
          <h1 className="display-3 fw-bold">Find Trusted Services in Minutes</h1>
          <p className="lead mb-4">Book any skilled professionals near you.</p>
          <div>
            <a href="/services" className="btn btn-primary btn-lg mx-2">Book a Service</a>
            <a href="/signup" className="btn btn-outline-light btn-lg mx-2">Become a Provider</a>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="services-section py-5">
        <div className="container">
          <h2 className="fw-bold text-center mb-5">Our Popular Services</h2>
          <div className="row text-center">
            {[
              { name: 'Plumbing', icon: 'bi-droplet' },
              { name: 'Electrical', icon: 'bi-lightbulb' },
              { name: 'Cleaning', icon: 'bi-bucket' },
              { name: 'Painting', icon: 'bi-brush' },
              { name: 'Tutoring', icon: 'bi-book' },
              { name: 'AC Repair', icon: 'bi-fan' },
            ].map((service, index) => (
              <div className="col-md-4 col-lg-2 mb-4" key={index}>
                <div className="service-card p-4 shadow-sm rounded">
                  <i className={`${service.icon} display-5 text-primary mb-3`}></i>
                  <h6>{service.name}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works py-5 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold mb-5">How It Works</h2>
          <div className="row">
            {[
              { step: '1', title: 'Choose a Service', desc: 'Browse and select the service you need.' },
              { step: '2', title: 'Book in Seconds', desc: 'Pick a date & time that works for you.' },
              { step: '3', title: 'Get It Done', desc: 'Our pro arrives and completes the job.' },
            ].map((item, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="how-card p-4 shadow-sm rounded bg-white">
                  <div className="circle-step mb-3">{item.step}</div>
                  <h5>{item.title}</h5>
                  <p className="text-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-5">What Our Customers Say</h2>
          <div className="row">
            {[
              { name: 'Nuwan Perera', feedback: 'Quick booking and friendly staff. My AC was fixed in an hour!' },
              { name: 'Anushka Silva', feedback: 'Affordable and reliable. Highly recommend their plumbing service.' },
              { name: 'Kasun Fernando', feedback: 'The tutor was excellent. My son improved his grades in just 2 weeks.' },
            ].map((review, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="testimonial-card p-4 shadow-sm rounded bg-white">
                  <p>"{review.feedback}"</p>
                  <h6 className="mt-3 text-primary">{review.name}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section text-center py-5 text-white">
        <div className="container">
          <h2 className="fw-bold">Need Help Today?</h2>
          <p className="mb-4">Find the right professional now.</p>
          <a href="/services" className="btn btn-light btn-lg">Book Now</a>
        </div>
      </section>
    </div>
  );
};

export default Home;
