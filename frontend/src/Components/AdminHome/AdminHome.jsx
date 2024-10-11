import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../footer/footer';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './AdminHome.css';  // Import the CSS file

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const AdminHome = () => {
  const [activeTab, setActiveTab] = useState('Vehicles');

  // Define chart data and options outside the return statement
  const data = {
    labels: ['Fuel Stations', 'Vehicles'],
    datasets: [
      {
        label: 'Number of Registrations',
        data: [500, 1500], // Example data for fuel stations and vehicles
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Registered Fuel Stations and Vehicles',
      },
    },
  };

  // Sample data for Vehicles and Stations
  const vehiclesData = [
    { id: 'V001', name: 'Vehicle A' },
    { id: 'V002', name: 'Vehicle B' },
    { id: 'V003', name: 'Vehicle C' },
  ];

  const stationsData = [
    { id: 'S001', name: 'Station X' },
    { id: 'S002', name: 'Station Y' },
    { id: 'S003', name: 'Station Z' },
  ];

  // Function to render table based on active tab
  const renderTable = () => {
    const data = activeTab === 'Vehicles' ? vehiclesData : stationsData;
    return (
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <button className="details-btn" onClick={() => alert(`Showing details for ${item.name}`)}>Show Details</button>
                <button className="delete-btn" onClick={() => alert(`Deleting ${item.name}`)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <Header />
      <div className="chart-container">
        {/* Render Bar chart here */}
        <Bar data={data} options={options} />
      </div>

      {/* Tab Selection */}
      <div className="tab-container">
        <button className={activeTab === 'Vehicles' ? 'active-tab' : ''} onClick={() => setActiveTab('Vehicles')}>
          Vehicles
        </button>
        <button className={activeTab === 'Stations' ? 'active-tab' : ''} onClick={() => setActiveTab('Stations')}>
          Stations
        </button>
      </div>

      {/* Conditionally Render Table */}
      <div className="table-container">
        {activeTab === 'Vehicles' ? <h3>Vehicles</h3> : <h3>Stations</h3>}
        {renderTable()}
      </div>

      <Footer />
    </div>
  );
};

export default AdminHome;
