import React from 'react';
import Header from '../Header/Header';
import Footer from '../footer/footer';
import './VehicleHome.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom';

const VehicleHome = () => {
  const fuelQuota = 35; // 35% quota available

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

        <Link to="/fuel-quota">
          <div className="fuel-quota card">
            <div className="card-content">
              <h1>Fuel Quota</h1>
            </div>
          </div>
        </Link>

        <Link to="/prev-logs">
          <div className="logs card">
            <div className="card-content">
              <h1>Previous Logs</h1>
            </div>
          </div>
        </Link>
        
      </div>
      <div className="fuel-ava">
          <h1>Available Fuel Quota</h1>
          <div style={{ width: '200px', margin: '2% auto' }}>
              <CircularProgressbar
                value={fuelQuota}
                text={`${fuelQuota}L`}
                styles={buildStyles({
                  textColor: '#ff3b1b', 
                  pathColor: '#ff3b1b', 
                  trailColor: '#eee',
                })}
              />
            </div>
        </div>
      <Footer />
    </div>
  );
}

export default VehicleHome;
