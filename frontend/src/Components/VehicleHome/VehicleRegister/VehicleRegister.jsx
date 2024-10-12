import React, { useState } from 'react';
import Header from '../../Header/Header';
import Footer from '../../footer/footer';
import './VehicleRegister.css'; // You will need custom CSS for styling

const VehicleRegister = () => {
  const [isExistingCustomer, setIsExistingCustomer] = useState(null);

  const handleCustomerChange = (event) => {
    setIsExistingCustomer(event.target.value === 'yes');
  };

  return (
    <div>
      <Header />
      
      <div className="register-form-container">
        <h1>Vehicle Registration</h1>
        <form className="register-form">
          <div className="form-group">
            <label>Name</label>
            <div className="half-input">
              <input type="text" placeholder="Name" />
              {/* <input type="text" placeholder="Last Name" /> */}
            </div>
          </div>
          

          <div className="form-group">
            <label>Email</label>
            <div className="half-input">
              <input type="email" placeholder="example@email.com" />
            </div>
          </div>

          <div className="form-group">
            <label>Phone</label>
            <div className="half-input">
              <input type="text" placeholder="Phone Number" />
            </div>
          </div>

          <div className="form-group">
            <label>Postal Code</label>
            <div className="half-input">
              <input type="text" placeholder="Postal Code" />
            </div>
          </div>


          <button className="button" type="submit">Register</button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default VehicleRegister;