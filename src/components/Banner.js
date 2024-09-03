import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import '../styles/Banner.css';

const Banner = () => (
  <div className="banner-container">
    <img src={logo} className="logo" alt="logo" />
    <div className='title'>
      <h2>광운대학교 생활 도우미</h2>
      <h1>광운 무인양품</h1>
    </div>
    <nav className="navbar">
      <ul className="navbar-menu">
        <li><a href="#home">HOME</a></li>
        <li><a href="#login">LOGIN</a></li>
        <li><a href="#kw" className="k-menu">광운대학교</a></li>
      </ul>
    </nav>
  </div>
);

export default Banner;