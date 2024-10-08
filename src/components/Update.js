import React, { useState } from 'react';
import styles from '../styles/Update.module.css';

const Update = () => {
    const style = {
        backgroundColor: '#EEF2F6',
    };

    const [formData, setFormData] = useState({
        name: "",
        s_num: "",
        major: "",
        password: "",
        password_confirm: "",
    });

    const [imgSrc, setImgSrc] = useState(""); // 초기 이미지 경로를 비워둡니다.

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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImgSrc(reader.result); // 선택한 파일의 URL을 상태에 저장
            };
            reader.readAsDataURL(file); // 파일을 데이터 URL로 읽기
        }
    };

    return (
        <div style={style}>
            <div className={styles.main_container}>
                <h1>회원정보 수정</h1>
                <div className={styles.info}>
                    <div className={styles.icon} style={{ position: 'relative' }}>
                        {imgSrc ? (
                            <img src={imgSrc} alt="Profile" width="110" height="110" style={{borderRadius:'50%'}}/>
                        ) : (
                            <svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg" style={{borderRadius:'50%'}}>
                                <rect width="110" height="110" rx="55" fill="#7F7F7F" fillOpacity="0.2" style={{ mixBlendMode: 'luminosity' }} />
                                <rect width="110" height="110" rx="55" fill="#3D3D3D" fillOpacity="0.5" style={{ mixBlendMode: 'overlay' }} />
                                <path fillRule="evenodd" clipRule="evenodd" d="M71.5002 44C71.5002 53.1127 64.1129 60.5 55.0002 60.5C45.8875 60.5 38.5002 53.1127 38.5002 44C38.5002 34.8873 45.8875 27.5 55.0002 27.5C64.1129 27.5 71.5002 34.8873 71.5002 44ZM66.0002 44C66.0002 50.0751 61.0753 55 55.0002 55C48.9251 55 44.0002 50.0751 44.0002 44C44.0002 37.9249 48.9251 33 55.0002 33C61.0753 33 66.0002 37.9249 66.0002 44Z" fill="#8B0B02" />
                                <path d="M55.0002 68.75C37.1956 68.75 22.0257 79.2781 16.2471 94.0281C17.6548 95.426 19.1377 96.7482 20.6892 97.9882C24.9923 84.4462 38.4912 74.25 55.0002 74.25C71.5092 74.25 85.0081 84.4462 89.3112 97.9882C90.8627 96.7482 92.3456 95.426 93.7533 94.0282C87.9747 79.2781 72.8048 68.75 55.0002 68.75Z" fill="#8B0B02" />
                            </svg>
                        )}
                        <label htmlFor="file-input" className={styles.uploadButton} style={{ position: 'absolute', bottom: '0', right: '0', margin: '5px' }}>
                            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="17.25" cy="16.625" r="16.5" fill="white" />
                                <g clip-path="url(#clip0_2279_1339)">
                                    <rect width="23.6739" height="23.6739" transform="translate(5.77148 4.4292)" fill="white" />
                                    <path d="M28.4589 23.1713C28.4589 23.6945 28.251 24.1963 27.8811 24.5663C27.5111 24.9363 27.0093 25.1441 26.4861 25.1441H8.73064C8.20741 25.1441 7.70562 24.9363 7.33564 24.5663C6.96566 24.1963 6.75781 23.6945 6.75781 23.1713V12.3207C6.75781 11.7975 6.96566 11.2957 7.33564 10.9257C7.70562 10.5558 8.20741 10.3479 8.73064 10.3479H12.6763L14.6491 7.38867H20.5676L22.5404 10.3479H26.4861C27.0093 10.3479 27.5111 10.5558 27.8811 10.9257C28.251 11.2957 28.4589 11.7975 28.4589 12.3207V23.1713Z" fill="#4C4C4C" />
                                    <path d="M17.6084 21.1985C19.7875 21.1985 21.554 19.4319 21.554 17.2528C21.554 15.0737 19.7875 13.3072 17.6084 13.3072C15.4292 13.3072 13.6627 15.0737 13.6627 17.2528C13.6627 19.4319 15.4292 21.1985 17.6084 21.1985Z" fill="#4C4C4C" />
                                    <path d="M28.4589 23.1713C28.4589 23.6945 28.251 24.1963 27.8811 24.5663C27.5111 24.9363 27.0093 25.1441 26.4861 25.1441H8.73064C8.20741 25.1441 7.70562 24.9363 7.33564 24.5663C6.96566 24.1963 6.75781 23.6945 6.75781 23.1713V12.3207C6.75781 11.7975 6.96566 11.2957 7.33564 10.9257C7.70562 10.5558 8.20741 10.3479 8.73064 10.3479H12.6763L14.6491 7.38867H20.5676L22.5404 10.3479H26.4861C27.0093 10.3479 27.5111 10.5558 27.8811 10.9257C28.251 11.2957 28.4589 11.7975 28.4589 12.3207V23.1713Z" stroke="white" stroke-width="1.48696" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M17.6084 21.1985C19.7875 21.1985 21.554 19.4319 21.554 17.2528C21.554 15.0737 19.7875 13.3072 17.6084 13.3072C15.4292 13.3072 13.6627 15.0737 13.6627 17.2528C13.6627 19.4319 15.4292 21.1985 17.6084 21.1985Z" stroke="white" stroke-width="1.48696" stroke-linecap="round" stroke-linejoin="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2279_1339">
                                        <rect width="23.6739" height="23.6739" fill="white" transform="translate(5.77148 4.4292)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </label>
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
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        id="file-input"
                    />
                    <button className={styles.secession}>탈퇴하기</button>
                    <button className={styles.submit}>수정</button>
                </div>
            </div>
        </div>
    );
};

export default Update;
