import React from 'react';
import styles from '../styles/Footer.module.css'; // CSS 파일 임포트

const Footer = () => (
    <footer id={styles.footer}>
        <div className={styles.footer_logo}>
            <p id={styles.teamTitle}>광운 대학 생활 도우미</p>
            <p id={styles.teamName}>광운 무인양품</p>
        </div>
        <div className={styles.footer_info}>
            <p>Email | kwumuji@gmail.com</p>
            <p>Project | http://github.com/KW-MUJI</p>
        </div>

        <div className={styles.footer_developer}>
            <p>Front-end | 김민곤 조은향</p>
            <p>Back-end | 김정윤 최지훈</p>
            <p>Designer | 신승은</p>
        </div>

        <div className={styles.footer_Privacy}>
            <p>개인정보처리방침</p>
        </div>
    </footer>
);


export default Footer;