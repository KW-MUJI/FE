import React, { useState } from 'react';
import styles from '../styles/Update.module.css';
import { useNavigate } from 'react-router-dom';

// 회원가입 컴포넌트
const Update = () => {
    const style = {
        backgroundColor: '#EEF2F6',
    }
    const [formData, setFormData] = useState({
        name: "",
        s_num: "",
        major: "",
        password: "",
        password_confirm: "",
    });
    const onChangeForm = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
        if (name === 'password') {
            let regPass = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{5,11}$/;
            const textElement = document.getElementById(styles.pw_condition);
            if (!regPass.test(value)) {
                textElement.style.color = "#ff0000";
                return;
            } else {
                textElement.style.color = "#008000";
            }
        }
    };
    return (
        <div style={style}>
            <div className={styles.main_container}>
                <h1>회원정보 수정</h1>
                <div className={styles.info}>
                    <div className={styles.icon}>
                        <svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="110" height="110" rx="55" fill="#7F7F7F" fill-opacity="0.2" />
                            <rect width="110" height="110" rx="55" fill="#3D3D3D" fill-opacity="0.5" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M71.5002 44C71.5002 53.1127 64.1129 60.5 55.0002 60.5C45.8875 60.5 38.5002 53.1127 38.5002 44C38.5002 34.8873 45.8875 27.5 55.0002 27.5C64.1129 27.5 71.5002 34.8873 71.5002 44ZM66.0002 44C66.0002 50.0751 61.0753 55 55.0002 55C48.9251 55 44.0002 50.0751 44.0002 44C44.0002 37.9249 48.9251 33 55.0002 33C61.0753 33 66.0002 37.9249 66.0002 44Z" fill="#8B0B02" />
                            <path d="M55.0002 68.75C37.1956 68.75 22.0257 79.2781 16.2471 94.0281C17.6548 95.426 19.1377 96.7482 20.6892 97.9882C24.9923 84.4462 38.4912 74.25 55.0002 74.25C71.5092 74.25 85.0081 84.4462 89.3112 97.9882C90.8627 96.7482 92.3456 95.426 93.7533 94.0282C87.9747 79.2781 72.8048 68.75 55.0002 68.75Z" fill="#8B0B02" />
                        </svg>
                    </div>
                    <div className={styles.email}>
                        <p>chamlight@kw.ac.kr</p>
                    </div>
                </div>
                <div className={styles.input}>
                    <p className={styles.text}>이름</p>
                    <input
                        type="text"
                        name="name"
                        placeholder="김참빛"
                        onChange={onChangeForm}
                    />
                </div>
                <div className={styles.input}>
                    <p className={styles.text}>학번</p>
                    <input
                        type="text"
                        name="s_num"
                        placeholder="19학번"
                        onChange={onChangeForm}
                    />
                </div>
                <div className={styles.input}>
                    <p className={styles.text}>학과</p>
                    <input
                        type="text"
                        name="major"
                        placeholder="소프트웨어학부"
                        onChange={onChangeForm}
                    />
                </div>
                <div className={styles.input}>
                    <p className={styles.text}>비밀번호 변경</p>
                    <input
                        type="password"
                        name="password"
                        placeholder=""
                        onChange={onChangeForm}
                    />
                    <p id={styles.pw_condition}>숫자 최소 1개, 대소문자 최소 1개, 특수문자 최소 1개 (총 5자 - 11자)</p>
                </div>
                <div className={styles.input}>
                    <p className={styles.text}>비밀번호 확인</p>
                    <input
                        type="password"
                        name="password_confirm"
                        placeholder=""
                        onChange={onChangeForm}
                    />
                    <p id={styles.pw_confirm}>　</p>
                </div>
                <div>
                    <button className={styles.secession}>탈퇴하기</button>
                    <button className={styles.submit}>수정</button>
                </div>
            </div>
        </div>
    );
};

export default Update;