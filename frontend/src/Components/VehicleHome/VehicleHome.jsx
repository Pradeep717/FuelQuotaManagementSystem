import React from 'react';
import Header from '../Header/Header';
import Footer from '../footer/footer';
import './VehicleHome.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom';

const VehicleHome = () => {
  const fuelQuota1 = 35; // 35% quota available
  const fuelQuota2 = 25; // 35% quota available

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
      <h1 style={{color:"#ff4b2b",marginTop:"25px"}}>Registered Vehicle</h1>
      <div className="fuel-ava">

            <Link to="/fuel-quota">
            <div style={{ width: '200px', margin: '2% auto' }}>
            <h1 style={{color:"#8f868f",marginBottom:"20px",fontSize:"25px"}}>Vehicle Number Plate Number</h1>
                <CircularProgressbar
                  value={fuelQuota1}
                  text={`${fuelQuota1}L`}
                  styles={buildStyles({
                    textColor: '#ff3b1b', 
                    pathColor: '#ff3b1b', 
                    trailColor: '#eee',
                  })}
                />
                <button className='button'>See Details</button>
              </div>
            </Link>
            
            <Link to="/fuel-quota">
            <div style={{ width: '200px', margin: '2% auto' }}>
            <h1 style={{color:"#8f868f",marginBottom:"20px",fontSize:"25px"}}>Vehicle Number Plate Number</h1>
                <CircularProgressbar
                  value={fuelQuota2}
                  text={`${fuelQuota2}L`}
                  styles={buildStyles({
                    textColor: '#ff3b1b', 
                    pathColor: '#ff3b1b', 
                    trailColor: '#eee',
                  })}
                />
                <button className='button'>See Details</button>
              </div>
            </Link>
        </div>
      <Footer />
    </div>
  );
}

export default VehicleHome;
