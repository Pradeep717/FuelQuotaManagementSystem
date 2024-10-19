import React from 'react'
import './Operator.css'; 
import Header from '../Header/Header';
import Footer from '../footer/footer';
import { Link } from 'react-router-dom';

const Operator = () => {
  return (
    <div>
        <Header/>
        <h1 className='station-name'>Opeartor's Name</h1>
        <div className="v-home">
          <Link to="/s-register">
          <div className="register card">
              <div className="card-content">
              <h1>Register First</h1>
              </div>
          </div>
          </Link>

          <Link to="/s-fuel-quota">
          <div className="fuel-quota card">
              <div className="card-content">
              <h1>Fuel Quota</h1>
              </div>
          </div>
          </Link>

          <Link to="/s-prev-logs">
          <div className="logs card">
              <div className="card-content">
              <h1>Previous Logs</h1>
              </div>
          </div>
          </Link>

          <Link to="/scan-qr">
          <div className="qr-scan card">
              <div className="card-content">
              <h1>Scan QR</h1>
              </div>
          </div>
          </Link>
          
      </div>
        <Footer/>
    </div>
  )
}

export default Operator