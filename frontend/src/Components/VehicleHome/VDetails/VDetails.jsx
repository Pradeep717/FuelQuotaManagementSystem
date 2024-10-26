import React, { useEffect, useRef, useState } from 'react';
import Header from '../../Header/Header';
import Footer from '../../footer/footer';
import './VDetails.css'; // Importing the CSS file
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'; // Import CircularProgressBar
import 'react-circular-progressbar/dist/styles.css'; // Importing the styles
import QRCode from 'qrcode';

const VDetails = () => {
  const qrCodeRef = useRef(null);
  const [fuelQuota, setFuelQuota] = useState(20); // State to track the circular progress value

  useEffect(() => {
    // Generate the QR code when the component mounts
    const generateQRCode = async () => {
      try {
        const qrUrl = await QRCode.toDataURL('123456789012'); // Replace with any text or data you want
        if (qrCodeRef.current) {
          qrCodeRef.current.src = qrUrl;
        }
      } catch (error) {
        console.error('Failed to generate QR code:', error);
      }
    };
    generateQRCode();
  }, []);

  const downloadQRCode = () => {
    const qrCodeImg = qrCodeRef.current;
    const link = document.createElement('a');
    link.href = qrCodeImg.src;
    link.download = 'qrcode.png';
    link.click();
  };

  return (
    <div>
      <Header />
      <div className="fuel-quota-container">
        <div className="charts-container" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          {/* Circular Fuel Quota Chart */}
          <div className="fuel-ava" style={{ textAlign: 'center' }}>
            <h2 style={{ color:"#ff3b1b",fontSize:"25px",fontWeight:"bolder"}}>Available Fuel Quota</h2>
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
        </div>

        {/* QR Code generation */}
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <h3 style={{ color:"#ff3b1b",fontSize:"20px",fontWeight:"bolder"}}>Fuel Quota QR Code</h3>
          <div className="qr-container">
            <img ref={qrCodeRef} alt="Fuel Quota QR Code" style={{ width: '200px', height: '200px' }} />
          </div>
          <br />
          <button className='button' onClick={downloadQRCode}>Download QR Code</button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default VDetails;
