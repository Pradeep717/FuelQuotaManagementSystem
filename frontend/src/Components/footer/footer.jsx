import React from "react";
import "./footer.css";
import brandIcon from '/src/assets/Images/Logo.png';

function Footer() {
  return (
    <div class="main-footer">
      <div className="footercontainer">
        <div className="row">
          {/* <hr /> */}
          {/*column1*/}
          <div className="col">
          <img className="brand-logo" src={brandIcon} alt="Brand Icon" />
          <div className="fname">
                <span>Fuel</span>
                <span className='highlightedText'>Plus</span>
                <span>Station</span>
                </div>
          </div>
          {/*column2*/}
          <div className="col">
            <h3>Contact Us</h3>
            <p className="footer-p">
              Address - Fuel Plus Station, Galle, Sri Lanka.
            </p>
            <p className="footer-p">Telephone - 077-5 585 812</p>
            <div className='social-start'>
              <img src="https://img.icons8.com/?size=100&id=118498&format=png&color=000000" alt="Facebook" style={{ width: '40px', height: '40px' }} />
              <img src="https://img.icons8.com/?size=100&id=3lrBZiVC31vI&format=png&color=000000" alt="Instagram" style={{ width: '45px', height: '45px' }} />
              <img src="https://img.icons8.com/?size=100&id=qbiAUnUMOnLp&format=png&color=000000" alt="Email" style={{ width: '40px', height: '40px' }} />
              <img src="https://img.icons8.com/?size=100&id=42961&format=png&color=000000" alt="Whatsapp" style={{ width: '40px', height: '40px' }} />
          </div>
          </div>
          {/*column3*/}
          <div className="col">
            <h3>Branches</h3>
            <p className="footer-p">Galle</p>
            <p className="footer-p">Matara</p>
            <p className="footer-p">Rathnapura</p>
          </div>
          {/* <div className="col">
            <h3>Fuel Plus Solution</h3>
            
          </div> */}
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            <i>
              Copyright &copy; Faculty of Engineering {new Date().getFullYear()}{" "}
              Powered by Fuel Plus Solution All right reserved
            </i>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Footer;
