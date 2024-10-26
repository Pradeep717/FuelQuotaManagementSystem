import React, { useState } from 'react';
import Header from '../../Header/Header';
import Footer from '../../footer/footer';
import { useNavigate } from 'react-router-dom';

const StationRegister = () => {
  const [stationName, setStationName] = useState('');
  const [location, setLocation] = useState('');
  const [stationRegNumber, setStationRegNumber] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/stations/registerStation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          stationName,
          location,
          station_regNumber: stationRegNumber,
        }),
      });
  
      const data = await response.json();
      console.log(data);
  
      if(response.ok) {
        setResponseMessage('Station registered successfully!');
  
        setTimeout(() => {
          navigate('/s-home');  // Navigate to the desired route after 2 seconds
        }, 2000);
      } else {
        setResponseMessage(data.message || 'Error registering station.');
      }  
    } catch (error) {
      setResponseMessage('Error registering station.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="register-form-container">
        <h1>Station Registration</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name of the Station</label>
            <div className="half-input">
              <input
                type="text"
                placeholder="Name"
                value={stationName}
                onChange={(e) => setStationName(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Location</label>
            <div className="half-input">
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Station Reg Num</label>
            <div className="half-input">
              <input
                type="text"
                placeholder="Vehicle Number"
                value={stationRegNumber}
                onChange={(e) => setStationRegNumber(e.target.value)}
              />
            </div>
          </div>

          <button className="button" type="submit" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default StationRegister;
