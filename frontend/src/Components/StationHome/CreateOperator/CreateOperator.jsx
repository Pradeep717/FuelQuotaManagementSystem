import React, { useState } from "react";
import "./CreateOperator.css";
import Header from "../../Header/Header";
import Footer from "../../footer/footer";
import { useNavigate } from "react-router-dom";

const CreateOperator = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/stations/addStationOperator",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setResponseMessage("Operator added successfully!");

        setTimeout(() => {
          navigate("/s-home"); // Navigate to the desired route after 2 seconds
        }, 2000);
      } else {
        setResponseMessage(data.message || "Error adding operator.");
      }
    } catch (error) {
      setResponseMessage("Error adding operator.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />
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
            name="email"
            placeholder="Email"
            value={formData.email}
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
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <button type="submit" className="button" disabled={isLoading}>
            {isLoading ? "Registering..." : "REGISTER"}
          </button>
        </form>
        {responseMessage && <p>{responseMessage}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default CreateOperator;
