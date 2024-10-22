import React from 'react';
import './StationLogs.css';
import Header from '../../Header/Header';
import Footer from '../../footer/footer';

const StationLogs = () => {
  const logs = [
    { id: 'L001', date: '2024-10-01', liters: 50 },
    { id: 'L002', date: '2024-10-05', liters: 60 },
    { id: 'L003', date: '2024-10-10', liters: 45 },
    { id: 'L001', date: '2024-10-01', liters: 50 },
    { id: 'L002', date: '2024-10-05', liters: 60 },
    { id: 'L003', date: '2024-10-10', liters: 45 },
    { id: 'L001', date: '2024-10-01', liters: 50 },
    { id: 'L002', date: '2024-10-05', liters: 60 },
    { id: 'L003', date: '2024-10-10', liters: 45 },
  ];

  return (
    <div>
        <Header/>
        <h1>Previous Logs</h1>
      <div className="log-container">
      <table className="logs-table">
        <thead>
          <tr>
            <th>Vehicle ID</th>
            <th>Date</th>
            <th>Liters of Petrol</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.date}</td>
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

export default StationLogs;
