import React from 'react';
import './Start.css';
import { Link } from 'react-router-dom';

const Start = () => {
  return (
    <div className="start-container">
      <div className="container">
        <div className="textSection">
          <h1 className="title">
            Fuel<span className='highlightedText'>Plus</span> Station!
          </h1>
          <h2 className="description">
            
          "Fuel up for the journey, service that goes the extra mile!"
          </h2>
          <p>FuelPlus Station is your one-stop destination for all your vehicle needs. We offer a range of services, including fuel refills, oil changes, tire checks, and car wash facilities. Our friendly staff ensures quick and efficient service, so you can get back on the road in no time. Drive in today and experience the difference with FuelPlus Station, where quality service meets convenience.
  </p>
          <div className="buttonContainer">
           <Link to="/login">
              <button className="getStartedButton">Log In</button>
           </Link>
            <button className="howItWorksButton">Sign Up</button>
          </div>
          <div className='social-start'>
              <img src="https://img.icons8.com/?size=100&id=118498&format=png&color=000000" alt="Facebook" style={{ width: '40px', height: '40px' }} />
              <img src="https://img.icons8.com/?size=100&id=3lrBZiVC31vI&format=png&color=000000" alt="Instagram" style={{ width: '45px', height: '45px' }} />
              <img src="https://img.icons8.com/?size=100&id=qbiAUnUMOnLp&format=png&color=000000" alt="Email" style={{ width: '40px', height: '40px' }} />
              <img src="https://img.icons8.com/?size=100&id=42961&format=png&color=000000" alt="Whatsapp" style={{ width: '40px', height: '40px' }} />
          </div>
        </div>
        <div className="imageSection">
          <div className="imageWrapper">
              <img src="/src/assets/Images/shape.png" alt="Shape" className="shape" />
              <img src="/src/assets/Images/petrol.png" alt="Petrol" className="petrol" />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Start;
