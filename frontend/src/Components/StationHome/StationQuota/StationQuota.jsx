import React, { useEffect, useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
// import JsBarcode from 'jsbarcode';
import Header from '../../Header/Header';
import Footer from '../../footer/footer';
import './StationQuota.css'; // Importing the CSS file
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'; // Import CircularProgressBar
import 'react-circular-progressbar/dist/styles.css'; // Importing the styles

// Chart data and options
const chartData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Available Liters',
        data: [45, 40, 40, 35, 30, 25, 10], // Example data
        backgroundColor: '#ff6f6f',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };


const StationQuota = () => {
    const barcodeRef = useRef(null);
  const [fuelQuota, setFuelQuota] = useState(10); // State to track the circular progress value

  

  
  return (
    <div>
        <Header/>
            <div className="fuel-quota-container">
            <h2>Fuel Quota for the Week</h2>
            
            {/* Flexbox container to align bar chart and circular chart side by side */}
            <div className="charts-container" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            {/* Bar Chart */}
            <div className="bar-chart" style={{ width: '600px' }}>
                <Bar data={chartData} options={chartOptions} />
            </div>

            {/* Circular Fuel Quota Chart */}
            <div className="fuel-ava" style={{ textAlign: 'center' }}>
                <h3>Available Fuel Quota</h3>
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
        </div>
        <Footer/>
    </div>
  )
}

export default StationQuota