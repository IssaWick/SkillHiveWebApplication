import React from "react";
import { FaTools, FaCalendarAlt, FaMoneyBillWave, FaUserCog, FaPlus } from "react-icons/fa";
import "../ProviderHome.css";
import { Link } from "react-router-dom";

const ProviderHome = () => {
  return (
    <div className="provider-home">
     
     <h1>Provider Dashbord</h1>

      {/* Dashboard Cards */}
      <div className="cards-grid">
        <div className="card">
          <FaTools size={35} />
          <h4>My Services</h4>
        </div>
        
       <Link to="/addService" className="card-link">
         <div className="card">
         <FaPlus size={35} />
         <h4>Add New Service</h4>
         </div>
       </Link>

        <div className="card">
          <FaCalendarAlt size={35} />
          <h4>Bookings</h4>
        </div>
       
        <div className="card">
          <FaMoneyBillWave size={35} />
          <h4>Earnings</h4>
        </div>
        <div className="card">
          <FaUserCog size={35} />
          <h4>Profile</h4>
        </div>
        
      </div>

      {/* Floating Action Button */}
      <button className="fab">
        <FaPlus size={20} />
      </button>
    </div>
  );
};

export default ProviderHome;
