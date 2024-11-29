import React, { useState } from 'react';
import styles from '../styles/PwReset.module.css';
import { useNavigate } from 'react-router-dom';
import { resetPw } from '../api/authApi';
// 회원가입 컴포넌트
const PwReset = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const navigate = useNavigate();
    const goToLogin = () => {
        navigate("/login");
    }
    const [formData, setFormData] = useState({
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

    const pw_confirm = async (e) => {
        e.preventDefault();
        const { password, password_confirm } = formData;
        console.log(password);
        console.log(password_confirm);
        let regPass = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{5,11}$/;
        if (!regPass.test(password)) {
            alert("영문, 숫자, 특수기호 조합으로 5-11자리 이상 입력해주세요.");
            return;
        }
        const textElement = document.getElementById(styles.pw_confirm);
        if (password !== password_confirm) {
            textElement.textContent = "비밀번호가 일치하지않습니다.";
            textElement.style.color = "#ff0000";
            return;
        }
        sessionStorage.setItem("user", JSON.stringify(formData));
        try {
            await resetPw(localStorage.getItem('email'), password, password_confirm);
            alert("비밀번호 재설정 완료!");
            goToLogin();
        } catch (error) {
            console.error('Error:', error);
            alert("메일 전송 중 오류가 발생했습니다.");
        }
    };
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowPasswordConfirm = () => {
        setShowPasswordConfirm(!showPasswordConfirm);
    };

    const [message, setMessage] = useState("");


    return (
        <div>
            <form className={styles.signup_form}>
                <h3>비밀번호 재설정</h3>
                <div className={styles.pw_container}>
                    <p>새 비밀번호</p>
                    <div className={styles.pw_box}>
                        <input
                            type={showPassword ? "text" : "password"} // 비밀번호 보기/숨기기
                            name="password"
                            placeholder="비밀번호"
                            onChange={onChangeForm}
                        />
                        {showPassword ?
                            <svg className={styles.password_on_off} width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={toggleShowPassword}>
                                <path d="M0.833336 8.00016C0.833336 8.00016 4.16667 1.3335 10 1.3335C15.8333 1.3335 19.1667 8.00016 19.1667 8.00016C19.1667 8.00016 15.8333 14.6668 10 14.6668C4.16667 14.6668 0.833336 8.00016 0.833336 8.00016Z" stroke="#B3B3B3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10 10.5002C11.3807 10.5002 12.5 9.38087 12.5 8.00016C12.5 6.61945 11.3807 5.50016 10 5.50016C8.61929 5.50016 7.5 6.61945 7.5 8.00016C7.5 9.38087 8.61929 10.5002 10 10.5002Z" stroke="#B3B3B3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            :
                            <svg className={styles.password_on_off} width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={toggleShowPassword}>
                                <path d="M15.0136 15.0623C13.6092 16.1327 11.8992 16.7258 10.1335 16.7547C4.38262 16.7547 1.09637 10.1822 1.09637 10.1822C2.11831 8.27772 3.5357 6.61382 5.25347 5.30211M8.40826 3.80687C8.97377 3.6745 9.55275 3.60834 10.1335 3.6097C15.8845 3.6097 19.1707 10.1822 19.1707 10.1822C18.672 11.1152 18.0773 11.9935 17.3961 12.803M11.8752 11.9239C11.6496 12.166 11.3775 12.3603 11.0752 12.495C10.7728 12.6297 10.4465 12.7021 10.1155 12.708C9.7846 12.7138 9.45588 12.6529 9.14899 12.529C8.84209 12.405 8.56331 12.2205 8.32927 11.9865C8.09522 11.7524 7.91072 11.4736 7.78676 11.1667C7.6628 10.8598 7.60192 10.5311 7.60776 10.2002C7.6136 9.86925 7.68603 9.54288 7.82074 9.24055C7.95545 8.93822 8.14968 8.66612 8.39183 8.44048M1.09637 1.14502L19.1707 19.2193" stroke="#B3B3B3" stroke-width="2.0539" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        }
                    </div>
                    <p id={styles.pw_condition}>숫자 최소 1개, 대소문자 최소 1개, 특수문자 최소 1개 (총 5자 - 11자)</p>
                    <p>새 비밀번호 확인</p>
                    <div className={styles.pw_box}>
                        <input
                            type={showPasswordConfirm ? "text" : "password"} // 비밀번호 확인 필드
                            name="password_confirm"
                            placeholder="비밀번호 확인"
                            onChange={onChangeForm}
                        />
                        {showPasswordConfirm ?
                            <svg className={styles.password_on_off} width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={toggleShowPasswordConfirm}>
                                <path d="M0.833336 8.00016C0.833336 8.00016 4.16667 1.3335 10 1.3335C15.8333 1.3335 19.1667 8.00016 19.1667 8.00016C19.1667 8.00016 15.8333 14.6668 10 14.6668C4.16667 14.6668 0.833336 8.00016 0.833336 8.00016Z" stroke="#B3B3B3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10 10.5002C11.3807 10.5002 12.5 9.38087 12.5 8.00016C12.5 6.61945 11.3807 5.50016 10 5.50016C8.61929 5.50016 7.5 6.61945 7.5 8.00016C7.5 9.38087 8.61929 10.5002 10 10.5002Z" stroke="#B3B3B3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            :
                            <svg className={styles.password_on_off} width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={toggleShowPasswordConfirm}>
                                <path d="M15.0136 15.0623C13.6092 16.1327 11.8992 16.7258 10.1335 16.7547C4.38262 16.7547 1.09637 10.1822 1.09637 10.1822C2.11831 8.27772 3.5357 6.61382 5.25347 5.30211M8.40826 3.80687C8.97377 3.6745 9.55275 3.60834 10.1335 3.6097C15.8845 3.6097 19.1707 10.1822 19.1707 10.1822C18.672 11.1152 18.0773 11.9935 17.3961 12.803M11.8752 11.9239C11.6496 12.166 11.3775 12.3603 11.0752 12.495C10.7728 12.6297 10.4465 12.7021 10.1155 12.708C9.7846 12.7138 9.45588 12.6529 9.14899 12.529C8.84209 12.405 8.56331 12.2205 8.32927 11.9865C8.09522 11.7524 7.91072 11.4736 7.78676 11.1667C7.6628 10.8598 7.60192 10.5311 7.60776 10.2002C7.6136 9.86925 7.68603 9.54288 7.82074 9.24055C7.95545 8.93822 8.14968 8.66612 8.39183 8.44048M1.09637 1.14502L19.1707 19.2193" stroke="#B3B3B3" stroke-width="2.0539" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        }
                    </div>
                    <p id={styles.pw_confirm}>　</p>
                </div>
                <button onClick={pw_confirm} className={styles.sign} type="submit">비밀번호 재설정</button>
            </form>

        </div>
    );
};

export default PwReset;