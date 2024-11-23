import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/PwFind.module.css';
import { useNavigate } from 'react-router-dom';
import { sendAuthRequest, verifyPinRequest, pwMailsend } from '../api/authApi';
// 회원가입 컴포넌트
const PwFind = () => {
    const [formData, setFormData] = useState({
        id: "",
        pin: "",
    });
    const [isFormComplete, setIsFormComplete] = useState(false);
    const navigate = useNavigate();
    const goToSign = () => {
        navigate("/pwReset");
    }
    const inputRef = useRef(null);
    const fixedDomain = '@kw.ac.kr';
    const pintest = '123456';
    const [isPinVerified, setIsPinVerified] = useState(false);
    const [timer, setTimer] = useState(300);
    const [isTimerActive, setIsTimerActive] = useState(false);

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
    };
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
    const requestAuth = async (e) => {
        e.preventDefault();
        const { id } = formData;
        if (!id) {
            alert("아이디를 입력해주세요");
            return;
        }
        const email = id + fixedDomain; // 이메일 형식으로 변환

        try {
            const data = await sendAuthRequest(email, false);
            console.log(data);
            setIsPinVerified(false);
            setIsTimerActive(true);
            setTimer(300);
            alert("인증 요청이 전송되었습니다.");
        } catch (error) {
            console.error('Error:', error);
            alert("인증 요청 중 오류가 발생했습니다.");
        }
    };


    const verifyPin = async (e) => {
        e.preventDefault();
        const { id, pin } = formData;
        if (!pin) return;
        const email = id + fixedDomain; // 이메일 형식으로 변환
        try {
            const data = await verifyPinRequest(email, pin);
            console.log(data);

            const textElement = document.getElementById(styles.text);
            if (data.code === 200 && data.data) {
                textElement.textContent = "인증번호가 일치합니다.";
                textElement.style.color = "#008000";
                setIsPinVerified(true);
                setIsTimerActive(false);
                try {
                    await pwMailsend(email, pin);
                } catch (error) {
                    console.error('Error:', error);
                    alert("메일 전송 중 오류가 발생했습니다.");
                }
            } else {
                textElement.textContent = "인증번호가 틀렸습니다.";
                textElement.style.color = "#ff0000";
                setIsPinVerified(false);
                setIsTimerActive(false);
                setTimer(300);
            }
        } catch (error) {
            console.error('Error:', error);
            alert("인증 확인 중 오류가 발생했습니다.");
        }
    };

    return (
        <div>
            <form className={styles.pwFind_form}>
                <h3>비밀번호 찾기</h3>
                <div className={styles.id_container}>
                    <p className={styles.email_label} >이메일</p>
                    <div>
                        <input
                            type="text"
                            name="id"
                            value={formData.id + fixedDomain}  // 고정 도메인 적용
                            placeholder="아이디"
                            onChange={onChangeForm}
                            ref={inputRef}
                            onClick={(e) => {
                                // //     // 고정된 도메인 앞에 커서가 위치하도록 조정
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
                <button onClick={goToSign} className={styles.sign} type="submit" disabled={!isPinVerified}>비밀번호 재설정</button>
            </form>
        </div>
    );
};

export default PwFind;
