import React, { useRef, useEffect } from 'react';
import Header from '../../Header/Header';
import Footer from '../../footer/footer';
import './QRScan.css'; // Import the CSS file

const QRScan = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const getCameraFeed = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing the camera: ', error);
      }
    };

    getCameraFeed();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <Header />

      <div className="qrscan-container">
        <h2 className="title">QR Scanner</h2>
        <div className="video-container">
          <video ref={videoRef} autoPlay playsInline className="video-feed" />
        </div>
        <button className='button'>Scan</button>
      </div>

      <Footer />
    </div>
  );
};

export default QRScan;
