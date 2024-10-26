import React, { useRef, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import JsBarcode from 'jsbarcode';

const FuelQuota = ({ vehicle }) => {
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (barcodeRef.current && vehicle.qrCode) {
      JsBarcode(barcodeRef.current, vehicle.qrCode, { format: 'CODE128', width: 2, height: 100 });
    }
  }, [vehicle.qrCode]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>{vehicle.vehicleNumber} - Details</h2>
      <p>Type: {vehicle.vehicleType}</p>
      <p>Fuel Type: {vehicle.fuelType}</p>
      <p>Allocated Quota: {vehicle.allocatedQuota}L</p>
      <p>Used Quota: {vehicle.usedQuota}L</p>
      <p>Remaining Quota: {vehicle.remainingQuota}L</p>

      <div style={{ width: 150, margin: '2% auto' }}>
        <CircularProgressbar
          value={(vehicle.remainingQuota / vehicle.allocatedQuota) * 100}
          text={`${vehicle.remainingQuota}L`}
          styles={buildStyles({ textColor: '#ff3b1b', pathColor: '#ff3b1b', trailColor: '#eee' })}
        />
      </div>

      <div>
        <h3>QR Code</h3>
        <svg ref={barcodeRef}></svg>
      </div>
    </div>
  );
};

export default FuelQuota;
