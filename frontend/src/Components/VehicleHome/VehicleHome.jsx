import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../footer/footer';
import './VehicleHome.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom';
import axios from 'axios';


const VehicleHome = () => {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/vehicles/user/670e797c8ek558341d380c5a`, { withCredentials: true });
        setVehicles(response.data);
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <div>
      <Header />
      <div className="v-home">
        <Link to="/v-register">
          <div className="register card">
            <div className="card-content">
              <h1>Register First</h1>
            </div>
          </div>
        </Link>
      </div>
      <h1 style={{ color: "#ff4b2b", marginTop: "25px" }}>Registered Vehicles</h1>
      <div className="fuel-ava">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          vehicles.map(vehicle => (
            <div key={vehicle._id} className="vehicle-card">
              <h2>{vehicle.vehicleNumber}</h2>
              <CircularProgressbar
                value={vehicle.remainingQuota}
                text={`${vehicle.remainingQuota}L`}
                styles={buildStyles({
                  textColor: '#ff3b1b',
                  pathColor: '#ff3b1b',
                  trailColor: '#eee',
                })}
              />
              <Link to={`/vehicle/${vehicle._id}`}>
                <button className='button'>See Details</button>
              </Link>
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default VehicleHome;
