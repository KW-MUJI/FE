import React, { useState } from 'react';
import styles from '../styles/CheckPw.module.css';
import { useNavigate } from 'react-router-dom';

// 회원가입 컴포넌트
const CheckPw = () => {
    const ex_password = "123a!";
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
    const requestAuth = (e) => {
        e.preventDefault();
        const {password} = formData;
        if(password != ex_password){
            alert("비밀번호 틀려");
            return;
        }else{
            goToUpdate();
        }
    };
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