import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import Header from '../../Header/Header';
import Footer from '../../footer/footer';
import './VehicleRegister.css';

const VehicleRegister = () => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const navigate = useNavigate();  // Initialize useNavigate

  const handleVehicleNumberChange = (event) => {
    setVehicleNumber(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/vehicles/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ vehicleNumber }),
      });

      const data = await response.json();
      if (response.ok) {
        setResponseMessage('Vehicle registered successfully!');

        // Delay before navigating
        setTimeout(() => {
          navigate('/vehicleHome');  // Navigate to the desired route after 2 seconds
        }, 2000);
      } else {
        setResponseMessage(data.message || 'Error registering vehicle.');
      }
    } catch (error) {
      setResponseMessage('Error registering vehicle.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />
      
      <div className="register-form-container">
        <h1>Vehicle Registration</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Vehicle Number</label>
            <div className="half-input">
              <input 
                type="text" 
                placeholder="Vehicle Number" 
                value={vehicleNumber} 
                onChange={handleVehicleNumberChange} 
                required 
              />
            </div>
          </div>

          <button className="button" type="submit" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        {responseMessage && <p>{responseMessage}</p>}
      </div>

      <Footer />
    </div>
  );
};

export default VehicleRegister;
