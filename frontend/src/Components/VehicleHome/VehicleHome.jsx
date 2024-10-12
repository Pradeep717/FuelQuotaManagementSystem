import React from 'react';
import Header from '../Header/Header';
import Footer from '../footer/footer';
import './VehicleHome.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const VehicleHome = () => {
  const fuelQuota = 35; // 35% quota available

  return (
    <div>
      <Header />
      <div className="v-home">
        <div className="register card">
          <div className="card-content">
            <h1>Register First</h1>
          </div>
        </div>

        <div className="fuel-quota card">
          <div className="card-content">
            <h1>Fuel Quota</h1>
          </div>
        </div>

        <div className="logs card">
          <div className="card-content">
            <h1>Previous Logs</h1>
          </div>
        </div>
        
      </div>
      <div className="fuel-ava">
          <h1>Available Fuel Quota</h1>
          <div style={{ width: '200px', margin: '2% auto' }}>
              <CircularProgressbar
                value={fuelQuota}
                text={`${fuelQuota}%`}
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
