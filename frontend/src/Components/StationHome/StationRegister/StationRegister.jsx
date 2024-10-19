import React from 'react'
import Header from '../../Header/Header'
import Footer from '../../footer/footer'

const StationRegister = () => {
  return (
    <div>
        <Header/>
        <div className="register-form-container">
        <h1>Station Registration</h1>
        <form className="register-form">
          <div className="form-group">
            <label>Name of the Station</label>
            <div className="half-input">
              <input type="text" placeholder="Name" />
              {/* <input type="text" placeholder="Last Name" /> */}
            </div>
          </div>
          

          <div className="form-group">
            <label>Email</label>
            <div className="half-input">
              <input type="email" placeholder="example@email.com" />
            </div>
          </div>

          <div className="form-group">
            <label>Phone</label>
            <div className="half-input">
              <input type="text" placeholder="Phone Number" />
            </div>
          </div>

          <div className="form-group">
            <label>Postal Code</label>
            <div className="half-input">
              <input type="text" placeholder="Postal Code" />
            </div>
          </div>

          <div className="form-group">
            <label>Station ID</label>
            <div className="half-input">
              <input type="text" placeholder="Vehicle Number" />
            </div>
          </div>


          <button className="button" type="submit">Register</button>
        </form>
      </div>
        <Footer/>
    </div>
  )
}

export default StationRegister