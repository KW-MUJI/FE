import React, { useState, useEffect } from 'react';
import styles from '../styles/CheckPw.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CheckPassword } from "../api/mypageApi.js"; // API 호출 함수 import
import { useAuth } from "../contexts/AuthContext.js";
// 회원가입 컴포넌트
const CheckPw = () => {
    const ex_password = "123a!";
    const [data,setData] = [];
    const { accessToken } = useAuth();
    const navigate = useNavigate();
    const goToUpdate = () => {
        navigate("/update");
    }
    const style = {
        backgroundColor: '#EEF2F6',
        height: '700px'
    }
    const [formData, setFormData] = useState({
        password: ""
    });
    const onChangeForm = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };
    const requestAuth = async (e) => {
        e.preventDefault();
        const result = await CheckPassword(formData, accessToken);
        console.log(formData);
        console.log(result);
        
        if(result != 200){
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }else{
            goToUpdate();
        }
    };
    useEffect(() => {
        if (!accessToken) {
          alert("로그인 상태가 아닙니다. 로그인 페이지로 이동합니다.");
          navigate("/login");
        }
      }, [accessToken, navigate]);
    return (
        <div style={style}>
            <div className={styles.main_container}>
                <h1>회원정보 수정</h1>
                <p>고객님의 소중한 정보 보호를 위해 비밀번호를 다시 한번 확인해 주세요</p>
                <h2>비밀번호</h2>
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={onChangeForm}
                />
                <button onClick={requestAuth}>확인</button>
            </div>
        </div>
    );
};

export default CheckPw;