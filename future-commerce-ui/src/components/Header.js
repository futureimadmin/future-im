import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.jpeg';
import './Header.css';

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Future IM Logo" />
            <div className="company-name">Future IM</div>
          </Link>
        </div>
        {user && (
          <div className="welcome-message">
            Welcome, {user.firstName}!
          </div>
        )}
      </div>
      <nav className="nav-menu">
        <ul>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/offers">Offers</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          {!user ? (
            <li><Link to="/login" className="register-btn">Login</Link></li>
          ) : (
            <li><Link to="/" onClick={() => {
              localStorage.removeItem('user');
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              window.location.reload();
            }} className="register-btn">Logout</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
