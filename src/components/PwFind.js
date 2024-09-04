import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/PwFind.module.css';
import { useNavigate } from 'react-router-dom';

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

    const requestAuth = (e) => {
        e.preventDefault();
        const { id } = formData;
        if (!id) {
            alert("아이디를 입력해주세요");
            return;
        }
        console.log(id);
        // 인증 요청 로직 추가 가능
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
            setIsFormComplete(true);
        } else {
            textElement.textContent = "인증번호가 틀렸습니다.";
            textElement.style.color = "#ff0000";
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
                        <button onClick={verifyPin}>확인</button>
                        <p id={styles.text}>　</p>
                    </div>
                </div>
                <button onClick={goToSign} className={styles.sign} type="submit" disabled={!isFormComplete}>비밀번호 재설정</button>
            </form>
        </div>
    );
};

export default PwFind;
