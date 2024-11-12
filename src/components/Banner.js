import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import styles from "../styles/Banner.module.css";

const Banner = ({ isLoggedIn, handleLogout }) => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  //광운대 로고 클릭 시
  const handleKWLogiClick = () => {
    // navigate("https://www.kw.ac.kr"); // navigate는 외부 링크로 이동 못함
    window.location.href = "https://www.kw.ac.kr"; // 광운대학교 홈페이지로 이동
  };

  const handleLogoutClick = () => {
    handleLogout(); //로그아웃 처리
    navigate("/login");
  };

  return (
    <div className={styles.banner_container}>
      <img
        src={logo}
        className={styles.logo}
        alt="logo"
        onClick={handleKWLogiClick}
      />
      <div className={styles.title}>
        <h2>광운대학교 생활 도우미</h2>
        <h1>광운 무인양품</h1>
      </div>
      <nav className={styles.navbar}>
        <ul className={styles.navbar_menu}>
          {/* a 태그는 react 상태가 초기화돼서 로그아웃 처리 되버리는 상황 발생 => link로 이동 */}
          {/* <li><a href="/home">HOME</a></li> */}
          <li>
            <Link to="/home">HOME</Link>
          </li>
          {isLoggedIn ? (
            <li>
              <Link onClick={handleLogoutClick}>LOGOUT</Link>
            </li> //로그인 상태일 때 배너
          ) : (
            <li>
              <Link to="/login">LOGIN</Link>
            </li> //로그아웃 상태일 때 배너
          )}
          <li>
            <Link to="https://www.kw.ac.kr" className={styles.k_menu}>
              광운대학교
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Banner;
