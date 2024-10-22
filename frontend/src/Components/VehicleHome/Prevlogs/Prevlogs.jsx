import React from 'react';
import './Prevlogs.css';
import Header from '../../Header/Header';
import Footer from '../../footer/footer';

const Prevlogs = () => {
  const logs = [
    { id: 'L001', date: '2024-10-01', station: 'Station A', liters: 50 },
    { id: 'L002', date: '2024-10-05', station: 'Station B', liters: 60 },
    { id: 'L003', date: '2024-10-10', station: 'Station C', liters: 45 },
    { id: 'L001', date: '2024-10-01', station: 'Station A', liters: 50 },
    { id: 'L002', date: '2024-10-05', station: 'Station B', liters: 60 },
    { id: 'L003', date: '2024-10-10', station: 'Station C', liters: 45 },
    { id: 'L001', date: '2024-10-01', station: 'Station A', liters: 50 },
    { id: 'L002', date: '2024-10-05', station: 'Station B', liters: 60 },
    { id: 'L003', date: '2024-10-10', station: 'Station C', liters: 45 },
  ];

  return (
    <div>
        <Header/>
        <h1>Previous Loggs</h1>
      <div className="log-container">
      <table className="logs-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Fuel Station</th>
            <th>Amount of Liters</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.date}</td>
              <td>{log.station}</td>
              <td>{log.liters}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <Footer/>
    </div>
  );
};

export default Prevlogs;
