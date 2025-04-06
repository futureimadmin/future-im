import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.jpeg';
import '../styles/global.css';

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
        <Link to="/" className="logo">
          <img src={logo} alt="Future IM Logo" />
          <span className="logo-text">Future IM</span>
        </Link>
      </div>
      <nav className="nav-links">
        <Link to="/services">Services</Link>
        <Link to="/offers">Offers</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <div className="header-right">
        {user ? (
          <>
            <div className="user-info">
              Welcome, <span>{user.firstName}</span>
            </div>
            <Link 
              to="/" 
              className="auth-button"
              onClick={() => {
                localStorage.removeItem('user');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.reload();
              }}
            >
              Logout
            </Link>
          </>
        ) : (
          <Link to="/login" className="auth-button">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
