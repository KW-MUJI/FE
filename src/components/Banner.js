import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import styles from '../styles/Banner.module.css';

const Banner = () => (
  <div className={styles.banner_container}>
    <img src={logo} className={styles.logo} alt="logo" />
    <div className={styles.title}>
      <h2>광운대학교 생활 도우미</h2>
      <h1>광운 무인양품</h1>
    </div>
    <nav className={styles.navbar}>
      <ul className={styles.navbar_menu}>
        <li><a href="#home">HOME</a></li>
        <li><a href="#login">LOGIN</a></li>
        <li><a href="#kw" className={styles.k_menu}>광운대학교</a></li>
      </ul>
    </nav>
  </div>
);

export default Banner;