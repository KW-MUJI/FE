import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/PwReset.module.css';


// 회원가입 컴포넌트
const PwReset = () => {
    const [formData, setFormData] = useState({
        password: "",
        password_confirm: "",
    });
    const onChangeForm = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const pw_confirm = (e) => {
        e.preventDefault();
        const { password, password_confirm } = formData;
        console.log(password);
        console.log(password_confirm);
        if (password !== password_confirm) {
            alert("입력한 비밀번호가 같지 않습니다.");
            return;
        }
        sessionStorage.setItem("user", JSON.stringify(formData));
        alert("비밀번호 재설정 완료!");
    };


    const [message, setMessage] = useState("");


    return (
        <div>
            <form className={styles.signup_form}>
                <h3>비밀번호 재설정</h3>
                <div className={styles.pw_container}>
                    <p>새 비밀번호</p>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="비밀번호"
                            onChange={onChangeForm}
                        />
                    </div>
                    <p id={styles.pw_condition}>숫자 최소 1개, 대소문자 최소 1개, 특수문자 최소 1개 (총 5자 - 11자)</p>
                    <p>새 비밀번호 확인</p>
                    <div>
                        <input
                            type="password"
                            name="password_confirm"
                            placeholder="비밀번호 확인"
                            onChange={onChangeForm}
                        />
                    </div>
                    <p id={styles.pw_confirm}>　</p>
                </div>
                <button onClick={pw_confirm} className={styles.sign} type="submit">비밀번호 재설정</button>
            </form>

        </div>
    );
};

export default PwReset;
