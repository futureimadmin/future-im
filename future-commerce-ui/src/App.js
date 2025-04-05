import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Welcome from './components/welcome/Welcome';
import About from './components/about/About';
import Services from './components/services/Services';
import Offers from './components/products/Offers';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Landing from './components/landing/Landing';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;
