import React, { useState, useEffect, useRef } from 'react';
import '../styles/Signup.css';
import Modal from './Law';

// 회원가입 컴포넌트
const Signup = () => {
    // 모달
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const openModal = (type) => {
        setModalType(type);
        setModalOpen(true);
    };
    const closeModal = () => setModalOpen(false);
    // 모달

    const pintest = '123456';
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        pin: "",
        password: "",
        password_confirm: "",
    });
    const [message, setMessage] = useState("");
    const [isFormComplete, setIsFormComplete] = useState(false);

    const fixedDomain = '@kw.ac.kr';
    const inputRef = useRef(null);

    const handleCheckboxChange1 = () => {
        setIsChecked1(!isChecked1);
    };

    const handleCheckboxChange2 = () => {
        setIsChecked2(!isChecked2);
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
    };

    useEffect(() => {
        const allFieldsFilled = Object.values(formData).every(value => value.trim() !== '');
        setIsFormComplete(allFieldsFilled && isChecked1 && isChecked2);
    }, [formData, isChecked1, isChecked2]);

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
        if (!pin) {
            return;
        }
        console.log(pin);
        var textElement = document.getElementById("text");
        if (pin === pintest) {
            textElement.textContent = "인증번호가 일치합니다.";
            textElement.style.color = "#008000";
        } else {
            textElement.textContent = "인증번호가 틀렸습니다.";
            textElement.style.color = "#ff0000";
        }
        return;
    };

    const pw_confirm = (e) => {
        e.preventDefault();
        const { password, password_confirm } = formData;
        console.log(password);
        console.log(password_confirm);
        if (!password || !password_confirm) {
            return;
        }
        if (password !== password_confirm) {
            alert("입력한 비밀번호가 같지 않습니다.");
            return;
        }
        sessionStorage.setItem("user", JSON.stringify(formData));
        alert("회원가입 성공하였습니다!");
    };

    return (
        <div>
            <form className="signup_form">
                <h3>회원가입</h3>
                <div className="id_container">
                    <p>이메일</p>
                    <div>
                        <input
                            type="text"
                            name="id"
                            value={formData.id + fixedDomain}  // 고정 도메인 적용
                            placeholder="아이디"
                            onChange={onChangeForm}
                            ref={inputRef}
                            onClick={(e) => {
                                // 고정된 도메인 앞에 커서가 위치하도록 조정
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
                        <p id="text" style={{ color: message.color }}>{message}　</p>
                    </div>
                </div>
                <div className="pw_container">
                    <p>비밀번호</p>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="비밀번호"
                            onChange={onChangeForm}
                        />
                    </div>
                    <p>비밀번호 확인</p>
                    <div>
                        <input
                            type="password"
                            name="password_confirm"
                            placeholder="비밀번호 확인"
                            onChange={onChangeForm}
                        />
                    </div>
                </div>
                <div className="checkbox-group">
                    <div>
                        <input
                            type="checkbox"
                            checked={isChecked1}
                            onChange={handleCheckboxChange1}
                        />
                        <span onClick={() => openModal('first')}>개인 정보 처리 방침 동의</span> <span style={{ color: 'red' }}>(필수)</span>
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
                <button onClick={pw_confirm} className="sign" type="submit" disabled={!isFormComplete}>회원가입</button>
            </form>
        </div>
    );
};

export default Signup;
