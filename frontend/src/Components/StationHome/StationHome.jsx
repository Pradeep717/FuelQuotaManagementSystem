import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../footer/footer';
import './StationHome.css';
import { Link } from 'react-router-dom';

const StationHome = () => {
  const [stations, setStations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/stations/getAllStaionsByUserId', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch stations');
        }

        const data = await response.json();
        setStations(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStations();
  }, []);

  const handleDeleteOperator = async (operatorId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/stations/deleteStationOperator/${operatorId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete operator');
      }

      // Refresh the station data after deletion
      setStations((prevStations) =>
        prevStations.map((station) => ({
          ...station,
          stationOperators: station.stationOperators.filter((id) => id !== operatorId),
        }))
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Header />
      <div className="station-home-container">
        <h1 className='station-name'>Station Home</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          stations.map((station) => (
            <div key={station._id} className="station-card">
              <h2>{station.stationName}</h2>
              <p>Location: {station.location}</p>
              <h3>Operators:</h3>
              {station.stationOperators.length > 0 ? (
                <ul>
                  {station.stationOperators.map((operatorId) => (
                    <li key={operatorId}>
                      {operatorId}
                      <button onClick={() => handleDeleteOperator(operatorId)}>Delete</button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No operators available</p>
              )}
              <h3>Registered Vehicles:</h3>
              {station.registeredVehicles.length > 0 ? (
                <ul>
                  {station.registeredVehicles.map((vehicle) => (
                    <li key={vehicle._id}>
                      {vehicle.vehicle ? `${vehicle.vehicle.vehicleNumber} (${vehicle.vehicle.vehicleType})` : 'Unknown Vehicle'}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No registered vehicles</p>
              )}
            </div>
          ))
        )}
        <div className="v-home">
          <Link to="/s-register">
            <div className="register card">
              <div className="card-content">
                <h1>Register First</h1>
              </div>
            </div>
          </Link>
          <Link to="/create-operator">
            <div className="create-opera card">
              <div className="card-content">
                <h1>Create an operator</h1>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StationHome;
