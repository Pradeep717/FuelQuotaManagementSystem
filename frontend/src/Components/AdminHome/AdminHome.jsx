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
import './AdminHome.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const AdminHome = () => {
  const [activeTab, setActiveTab] = useState('Vehicles');
  const [searchTerm, setSearchTerm] = useState('');

  const data = {
    labels: ['Fuel Stations', 'Vehicles'],
    datasets: [
      {
        label: 'Number of Registrations',
        data: [500, 1500],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Registered Fuel Stations and Vehicles' },
    },
  };

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

  // Filtered data based on search term (searching by both ID and name)
  const filteredData = (activeTab === 'Vehicles' ? vehiclesData : stationsData).filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderTable = () => (
    <table className="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>
              <button className="details-btn" onClick={() => alert(`Showing details for ${item.name}`)}>
                Show Details
              </button>
              <button className="delete-btn" onClick={() => alert(`Deleting ${item.name}`)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <Header />
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>

      <div className="tab-container">
        <button className={activeTab === 'Vehicles' ? 'active-tab' : ''} onClick={() => setActiveTab('Vehicles')}>
          Vehicles
        </button>
        <button className={activeTab === 'Stations' ? 'active-tab' : ''} onClick={() => setActiveTab('Stations')}>
          Stations
        </button>
      </div>

      <div className="search-center">
        <div className="search-container">
          <input
            type="text"
            placeholder={`Search by ID or Name in ${activeTab}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="table-container">
        {activeTab === 'Vehicles' ? (
          <h3 style={{ color: '#ff4b2b', marginBottom: '5px', fontWeight: 'bolder', fontSize: '24px' }}>Details of Vehicles</h3>
        ) : (
          <h3 style={{ color: '#ff4b2b', marginBottom: '5px', fontWeight: 'bolder', fontSize: '24px' }}>Details of Stations</h3>
        )}
        {renderTable()}
      </div>

      <Footer />
    </div>
  );
};

export default AdminHome;
