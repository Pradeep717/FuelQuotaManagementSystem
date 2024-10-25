import React, { useEffect, useState } from 'react';
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
  const [vehicles, setVehicles] = useState([]);
  const [stations, setStations] = useState([]);
  const [activeTab, setActiveTab] = useState('Vehicles');
  const [details, setDetails] = useState(null);

  useEffect(() => {
    fetchVehicles();
    fetchStations();
  }, []);

  // Fetch vehicles
  const fetchVehicles = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/vehicles`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  // Fetch stations
  const fetchStations = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/stations`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const data = await response.json();
      setStations(data);
    } catch (error) {
      console.error('Error fetching stations:', error);
    }
  };

  // Show details for a specific item
  const showDetails = async (id) => {
    const url = activeTab === 'Vehicles'
      ? `${import.meta.env.VITE_API_URL}/api/vehicles/${id}`
      : `${import.meta.env.VITE_API_URL}/api/stations/${id}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const data = await response.json();
      setDetails(data);
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };

  // Delete an item
  const deleteItem = async (id) => {
    const url = activeTab === 'Vehicles'
      ? `${import.meta.env.VITE_API_URL}/api/vehicles/${id}`
      : `${import.meta.env.VITE_API_URL}/api/stations/${id}`;

    // Confirmation dialog
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(`Error: ${response.status} - ${errorMessage.message || response.statusText}`);
      }

      alert('Item deleted successfully!');
      // Refresh data after deletion
      activeTab === 'Vehicles' ? fetchVehicles() : fetchStations();
    } catch (error) {
      console.error('Error deleting item:', error);
      alert(`Error deleting item: ${error.message}`);
    }
  };

  // Close details dialog
  const closeDetails = () => {
    setDetails(null);
  };

  // Render table based on active tab
  const renderTable = () => {
    const data = activeTab === 'Vehicles' ? vehicles : stations;
    return (
      <table className="data-table">
        <thead>
          <tr>
            <th>{activeTab === 'Vehicles' ? 'Vehicle Number' : 'Station Name'}</th>
            <th>{activeTab === 'Vehicles' ? 'Vehicle Type' : 'Location'}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{activeTab === 'Vehicles' ? item.vehicleNumber || 'N/A' : item.stationName || 'N/A'}</td>
              <td>{activeTab === 'Vehicles' ? item.vehicleType || 'N/A' : item.location || 'N/A'}</td>
              <td>
                <button className="details-btn" onClick={() => showDetails(item._id)}>Show Details</button>
                <button className="delete-btn" onClick={() => deleteItem(item._id)}>Delete</button>
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
        <Bar data={{
          labels: ['Fuel Stations', 'Vehicles'],
          datasets: [
            {
              label: 'Number of Registrations',
              data: [stations.length, vehicles.length],
              backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
              borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
              borderWidth: 1,
            },
          ],
        }} options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Registered Fuel Stations and Vehicles' },
          },
        }} />
      </div>

      <div className="tab-container">
        <button className={activeTab === 'Vehicles' ? 'active-tab' : ''} onClick={() => setActiveTab('Vehicles')}>
          Vehicles
        </button>
        <button className={activeTab === 'Stations' ? 'active-tab' : ''} onClick={() => setActiveTab('Stations')}>
          Stations
        </button>
      </div>

      <div className="table-container">
        <h3>{activeTab === 'Vehicles' ? 'Vehicles' : 'Stations'}</h3>
        {renderTable()}
      </div>

      {/* Details Modal/Dialog */}
      {details && (
      <div className="modal">
        <div className="modal-content">
          <h3>{activeTab === 'Vehicles' ? 'Vehicle Details' : 'Station Details'}</h3>
          {activeTab === 'Vehicles' ? (
            <>
              <p><strong>Vehicle Number:</strong> {details.vehicleNumber || 'N/A'}</p>
              <p><strong>Vehicle Type:</strong> {details.vehicleType || 'N/A'}</p>
              <p><strong>Owner:</strong> {details.vehicleOwner?.name || "Owner details unavailable"}</p>
              <p><strong>Registration Date:</strong> {new Date(details.createdAt).toLocaleDateString()}</p>
            </>
          ) : (
            <>
              <p><strong>Station Name:</strong> {details.stationName || 'N/A'}</p>
              <p><strong>Location:</strong> {details.location || 'N/A'}</p>
              <p><strong>Owner:</strong> {details.fuelStationOwner?.name || "Owner details unavailable"}</p> {/* Assuming this is the correct field for the owner */}
              <h4>Registered Vehicles:</h4>
              {details.registeredVehicles && details.registeredVehicles.length > 0 ? (
  <ul>
    {details && (
  <div className="modal">
    <div className="modal-content">
      <h3>{activeTab === 'Vehicles' ? 'Vehicle Details' : 'Station Details'}</h3>
      {activeTab === 'Vehicles' ? (
        <>
          <p><strong>Vehicle Number:</strong> {details.vehicleNumber || 'N/A'}</p>
          <p><strong>Vehicle Type:</strong> {details.vehicleType || 'N/A'}</p>
          <p><strong>Owner:</strong> {details.vehicleOwner?.name || "Owner details unavailable"}</p>
          <p><strong>Registration Date:</strong> {new Date(details.createdAt).toLocaleDateString()}</p>
        </>
      ) : (
        <>
          <p><strong>Station Name:</strong> {details.stationName || 'N/A'}</p>
          <p><strong>Location:</strong> {details.location || 'N/A'}</p>
          <p><strong>Owner:</strong> {details.fuelStationOwner?.name || "Owner details unavailable"}</p>
          <h4><strong>Registered Vehicles:</strong></h4>
          {details.registeredVehicles && details.registeredVehicles.length > 0 ? (
            <ul>
              {details.registeredVehicles.map(item => (
                <li key={item._id}>
                  {item.vehicle ? (
                    <>
                    
                      {item.vehicle.vehicleNumber || 'Vehicle Number unavailable'} - 
                      {item.vehicle.vehicleType || 'Model details unavailable'}
                      <br />
                      {new Date(item.date).toLocaleDateString()} {/* Displaying date on a new line */}
                    </>
                  ) : (
                    <span>Vehicle details unavailable</span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No registered vehicles found.</p>
          )}

        </>
      )}
      <button onClick={closeDetails}>Close</button>
    </div>
  </div>
)}

  </ul>
) : (
  <p>No registered vehicles found.</p>
)}


            </>
          )}
          <button onClick={closeDetails}>Close</button>
        </div>
      </div>
)}



      <Footer />
    </div>
  );
};

export default AdminHome;
