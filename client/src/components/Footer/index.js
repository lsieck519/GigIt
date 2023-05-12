import React from 'react';
import "./Footer.css";

const Footer = () => {
  return (
    <footer style={{ position: 'fixed', left: 0, bottom: 0, width: '100%', backgroundColor: '#f5f5f5', textAlign: 'center', padding: '10px' }}>
      <p className='footerText'>© 2023 GigIt</p>
    </footer>
  );
}

export default Footer;