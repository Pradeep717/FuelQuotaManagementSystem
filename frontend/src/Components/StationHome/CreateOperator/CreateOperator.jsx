import React, { useState } from 'react';
import './CreateOperator.css';
import Header from '../../Header/Header';
import Footer from '../../footer/footer';

const CreateOperator = () => {
  const [formData, setFormData] = useState({
    name: '',
    operatorId: '',
    stationId: '',
    username: '',
    password: '',
    confirmPassword: '',
    mobileNumber: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission
    console.log(formData);
  };

  return (
    <div>
        <Header/>
        <div className="register-form-container">
        <h1 className="form-title">Operator Registration</h1>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            />
            <input
            type="text"
            name="operatorId"
            placeholder="Operator ID"
            value={formData.operatorId}
            onChange={handleChange}
            required
            />
            <input
            type="text"
            name="stationId"
            placeholder="Station ID"
            value={formData.stationId}
            onChange={handleChange}
            required
            />
            <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            />
            <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            />
            <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            />
            <input
            type="text"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
            />
            <button type="submit" className="button">REGISTER</button>
        </form>
        </div>
        <Footer/>
    </div>
  );
};

export default CreateOperator;
