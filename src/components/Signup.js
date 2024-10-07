import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/Signup.module.css';
import { useNavigate } from 'react-router-dom';
import Modal from './Law';

// 회원가입 컴포넌트
const Signup = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [formData, setFormData] = useState({
        name: "",
        s_num: "",
        major: "",
        id: "",
        pin: "",
        password: "",
        password_confirm: "",
    });
    const [isFormComplete, setIsFormComplete] = useState(false);
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isPinVerified, setIsPinVerified] = useState(false);
    const [timer, setTimer] = useState(300);
    const [isTimerActive, setIsTimerActive] = useState(false);

    // 비밀번호 보기/숨기기 상태 추가
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const inputRef = useRef(null);
    const fixedDomain = '@kw.ac.kr';
    const pintest = '123456';

    const handleCheckboxChange1 = () => setIsChecked1(!isChecked1);
    const handleCheckboxChange2 = () => setIsChecked2(!isChecked2);
    const navigate = useNavigate();
    const goToLogin = () => {
        navigate("/login");
    }

    // 개인정보처리방침
    const navigateToPrivacy = () => {
        window.open("/privacy_law", "_blank");
    };

    const onChangeForm = (e) => {
        const { name, value } = e.target;

        // 이메일 필드의 경우 고정된 도메인을 앞에 두고 입력값을 제어
        if (name === 'id') {
            const userInput = value.split(fixedDomain)[0];
            setFormData({ ...formData, [name]: userInput });

            // 커서 위치를 고정된 도메인 앞에 유지
            if (inputRef.current) {
                const cursorPosition = userInput.length;
                inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }

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

    useEffect(() => {
        const allFieldsFilled = Object.values(formData).every(value => value.trim() !== '');
        setIsFormComplete(allFieldsFilled && isChecked1 && isChecked2);
    }, [formData, isChecked1, isChecked2]);

    useEffect(() => {
        let timerId;
        const textElement = document.getElementById(styles.text);
        if (isTimerActive && timer > 0) {
            timerId = setInterval(() => {
                setTimer(prev => prev - 1);
                textElement.style.color = "#000000";
                if (timer % 60 >= 10)
                    textElement.textContent = `0${parseInt(timer / 60)}:${timer % 60}`;
                else
                    textElement.textContent = `0${parseInt(timer / 60)}:0${timer % 60}`;
            }, 1000);
        } else if (timer === 0) {
            clearInterval(timerId);
            setIsTimerActive(false);
            setTimer(300);
        }
        return () => clearInterval(timerId);
    }, [isTimerActive, timer]);

    const openModal = (type) => {
        setModalType(type);
        setModalOpen(true);
    };

    const closeModal = () => setModalOpen(false);

    const requestAuth = (e) => {
        e.preventDefault();
        const { name, s_num, major, id } = formData;
        if (!id || !name || !s_num || !major) {
            alert("정보를 모두 입력해주세요");
            return;
        }
        console.log(name);
        console.log(s_num);
        console.log(major);
        console.log(id);
        setIsPinVerified(false); // 초기화
        setIsTimerActive(true);
        setTimer(300);
        alert("인증 요청이 전송되었습니다.");
    };

    const verifyPin = (e) => {
        e.preventDefault();
        const { pin } = formData;
        if (!pin) return;
        console.log(pin);
        console.log(pintest);
        const textElement = document.getElementById(styles.text);
        if (pin === pintest) {
            textElement.textContent = "인증번호가 일치합니다.";
            textElement.style.color = "#008000";
            setIsPinVerified(true); // 인증 성공
            setIsTimerActive(false); // 타이머 정지
        } else {
            textElement.textContent = "인증번호가 틀렸습니다.";
            textElement.style.color = "#ff0000";
            setIsPinVerified(false); // 인증 실패
            setIsTimerActive(false); // 타이머 정지
            setTimer(300); // 타이머 리셋
        }
    };

    const pw_confirm = (e) => {
        e.preventDefault();
        const { password, password_confirm } = formData;
        let regPass = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{5,11}$/;

        if (!regPass.test(password)) {
            alert("영문, 숫자, 특수기호 조합으로 5-11자리 이상 입력해주세요.");
            return;
        }
        console.log(password);
        console.log(password_confirm);
        const textElement = document.getElementById(styles.pw_confirm);
        if (password !== password_confirm) {
            textElement.textContent = "비밀번호가 일치하지않습니다.";
            textElement.style.color = "#ff0000";
            return;
        }

        sessionStorage.setItem("user", JSON.stringify(formData));
        alert("회원가입 성공하였습니다!");
        goToLogin();
    };

    // 비밀번호 보기/숨기기 핸들러
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowPasswordConfirm = () => {
        setShowPasswordConfirm(!showPasswordConfirm);
    };

    return (
        <div>
            <form className={styles.signup_form}>
                <h3>회원가입</h3>
                <div className={styles.name_container}>
                    <p>이름</p>
                    <div>
                        <input id={styles.name}
                            type="text"
                            name="name"
                            placeholder="홍길동"
                            onChange={onChangeForm}
                        />
                    </div>
                    <div>
                        <span id={styles.number}>학번</span>
                        <span id={styles.major_title}>학과</span><br />
                        <input id={styles.s_num}
                            type="text"
                            name="s_num"
                            placeholder="nn"
                            onChange={onChangeForm}
                        />
                        <input id={styles.major}
                            type="text"
                            name="major"
                            onChange={onChangeForm}
                        />
                    </div>
                </div>
                <div className={styles.id_container}>
                    <p className={styles.email_label}>이메일</p>
                    <div>
                        <input
                            type="text"
                            name="id"
                            value={formData.id + fixedDomain}  // 고정 도메인 적용
                            placeholder="아이디"
                            onChange={onChangeForm}
                            ref={inputRef}
                            onClick={(e) => {
                                if (inputRef.current) {
                                    const cursorPosition = formData.id.length;
                                    inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
                                    e.preventDefault();
                                }
                            }}
                        />
                        <button onClick={requestAuth}>인증요청</button>
                    </div>
                    <div>
                        <input
                            type="text"
                            name="pin"
                            placeholder="인증번호 6자리를 입력해 주세요"
                            onChange={onChangeForm}
                        />
                        <button onClick={verifyPin} disabled={!isTimerActive}>확인</button>
                        <p id={styles.text}>　</p>
                    </div>
                </div>
                <div className={styles.pw_container}>
                    <p className={styles.password}>비밀번호</p>
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
                    <p className={styles.password_confirm}>비밀번호 확인</p>
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
                <div className={styles.checkbox_group}>
                    <div>
                        <input
                            type="checkbox"
                            checked={isChecked1}
                            onChange={handleCheckboxChange1}
                        />
                        <span onClick={navigateToPrivacy}>개인 정보 처리 방침 동의</span> <span style={{ color: 'red' }}>(필수)</span>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            checked={isChecked2}
                            onChange={handleCheckboxChange2}
                        />
                        <span onClick={() => openModal('second')}>이메일 정보 수집 동의</span> <span style={{ color: 'red' }}>(필수)</span>
                    </div>
                    <Modal isOpen={isModalOpen} onClose={closeModal} type={modalType} />
                </div>
                <button
                    onClick={pw_confirm}
                    className={styles.sign}
                    type="submit"
                    disabled={!isFormComplete || !isPinVerified} // 모든 조건을 만족해야 활성화
                >
                    회원가입
                </button>
            </form>
        </div>
    );
};

export default Signup;
