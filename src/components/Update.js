import React, { useState, useEffect } from 'react';
import styles from '../styles/Update.module.css';
import { deleteUser, getUserInfo, updateUserInfo } from "../api/mypageApi.js"; // API 호출 함수 import
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.js';
const Update = () => {
    const style = {
        backgroundColor: '#EEF2F6',
    };
    const navigate = useNavigate();
    const goToMy = () => {
        navigate("/my_page");
    };
    const goToHome = () =>{
        navigate("/home");
    }
    const [formData, setFormData] = useState({
        name: "",
        s_num: "",
        major: "",
        password: "",
        password_confirm: "",
    });
    const [email, setEmaile] = useState("");
    const [imgSrc, setImgSrc] = useState(""); // 초기 이미지 경로를 비워둡니다.
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
    const [file, setFile] = useState(null); // 파일 상태 관리
    const [deleteImage, setDeleteImage] = useState(false);
    const {accessToken} = useAuth();
    useEffect(() => {
      if (!accessToken) {
        alert("로그인 상태가 아닙니다. 로그인 페이지로 이동합니다.");
        navigate("/login");
      }
    }, [accessToken, navigate]);
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const data = await getUserInfo(accessToken);
                console.log(data.data);
                if (data.code === 200) {
                    setFormData({
                        name: data.data.name,
                        s_num: data.data.stuNum,
                        major: data.data.major,
                        password: "",
                        password_confirm: "",
                    });
                    setEmaile(data.data.email);
                    setImgSrc(data.data.image); // 이미지 URL 설정
                }
            } catch (error) {
                console.error("사용자 정보를 가져오는 중 오류 발생:", error);
            }
        };

        fetchUserInfo();
    }, [accessToken]);

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
    const selectedFile = e.target.files[0];
    if (selectedFile) {
        const fileURL = URL.createObjectURL(selectedFile); // 선택한 파일의 URL 생성
        setImgSrc(fileURL); // 미리보기용 이미지 URL 설정
        setFile(selectedFile); // 파일 상태 업데이트
    }
};


    const handleDeleteClick = () => {
        setIsModalOpen(true); // 모달 열기
    };

    const handleConfirmDelete = async () => {
        const data = await deleteUser(accessToken);
        if (data === 200) {
            setIsModalOpen(false); // 모달 닫기
            localStorage.removeItem('accessToken');
            goToHome();
        } else {
            alert("탈퇴 처리 중 오류 발생:");
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // 모달 닫기
    };

    const handleUpdate = async () => {
        const requestBody = {
            name: formData.name,
            stuNum: formData.s_num,
            major: formData.major,
            password: formData.password ? formData.password : null,
            confirmPassword: formData.password_confirm ? formData.password_confirm : null,
            image: file,
            isDeleteImage: deleteImage,
        }
        
        console.log(requestBody);

        try {
            const response = await updateUserInfo(accessToken, requestBody);
            console.log(response.data.code);
            if (response.data.code == 200) {
                alert("정보가 성공적으로 업데이트되었습니다.");
                localStorage.removeItem('accessToken');
                localStorage.setItem('accessToken', response.data.data.accessToken);
                goToMy();
            } else {
                alert("정보 업데이트 중 오류 발생: " + response.message);
            }
        } catch (error) {
            console.error("업데이트 중 오류 발생:", error);
            alert("업데이트 중 오류가 발생했습니다.");
        }
    };

    const resetProfileImage = () => {
        setImgSrc(""); // 기본 이미지로 변경
        setFile(null); // 파일 상태 초기화
        setDeleteImage(true);
    };

    return (
        <div style={style}>
            <div className={styles.main_container}>
                <h1>회원정보 수정</h1>
                <div className={styles.info}>
                    <div className={styles.icon} style={{ position: 'relative' }}>
                        {imgSrc ? (
                            <>
                                <img src={imgSrc} alt="Profile" width="110" height="110" style={{ borderRadius: '50%' }} />
                                <button onClick={resetProfileImage} className={styles.resetButton} style={{ position: 'absolute', top: '-10px', right: '-10px', background: 'none', border: 'none', cursor: 'pointer', width: '30px', height: '30px' }}>
                                    <svg width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 8.58579L13.4142 5.17157L14.8284 6.58579L11.4142 10L14.8284 13.4142L13.4142 14.8284L10 11.4142L6.58579 14.8284L5.17157 13.4142L8.58579 10L5.17157 6.58579L6.58579 5.17157L10 8.58579Z" fill="#000000" />
                                    </svg>
                                </button>
                            </>
                        ) : (
                            <svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: '50%' }}>
                                <rect width="110" height="110" rx="55" fill="#7F7F7F" fillOpacity="0.2" style={{ mixBlendMode: 'luminosity' }} />
                                <rect width="110" height="110" rx="55" fill="#3D3D3D" fillOpacity="0.5" style={{ mixBlendMode: 'overlay' }} />
                                <path fillRule="evenodd" clipRule="evenodd" d="M71.5002 44C71.5002 53.1127 64.1129 60.5 55.0002 60.5C45.8875 60.5 38.5002 53.1127 38.5002 44C38.5002 34.8873 45.8875 27.5 55.0002 27.5C64.1129 27.5 71.5002 34.8873 71.5002 44ZM66.0002 44C66.0002 50.0751 61.0753 55 55.0002 55C48.9251 55 44.0002 50.0751 44.0002 44C44.0002 37.9249 48.9251 33 55.0002 33C61.0753 33 66.0002 37.9249 66.0002 44Z" fill="#8B0B02" />
                                <path d="M55.0002 68.75C37.1956 68.75 22.0257 79.2781 16.2471 94.0281C17.6548 95.426 19.1377 96.7482 20.6892 97.9882C24.9923 84.4462 38.4912 74.25 55.0002 74.25C71.5092 74.25 85.0081 84.4462 89.3112 97.9882C90.8627 96.7482 92.3456 95.426 93.7533 94.0282C87.9747 79.2781 72.8048 68.75 55.0002 68.75Z" fill="#8B0B02" />
                            </svg>
                        )}
                        <label htmlFor="file-input" className={styles.uploadButton} style={{ position: 'absolute', bottom: '0', right: '0', margin: '5px' }}>
                            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="17.25" cy="16.625" r="16.5" fill="white" />
                                <g clipPath="url(#clip0_2279_1339)">
                                    <rect width="23.6739" height="23.6739" transform="translate(5.77148 4.4292)" fill="white" />
                                    <path d="M28.4589 23.1713C28.4589 23.6945 28.251 24.1963 27.8811 24.5663C27.5111 24.9363 27.0093 25.1441 26.4861 25.1441H8.73064C8.20741 25.1441 7.70562 24.9363 7.33564 24.5663C6.96566 24.1963 6.75781 23.6945 6.75781 23.1713V12.3207C6.75781 11.7975 6.96566 11.2957 7.33564 10.9257C7.70562 10.5558 8.20741 10.3479 8.73064 10.3479H12.6763L14.6491 7.38867H20.5676L22.5404 10.3479H26.4861C27.0093 10.3479 27.5111 10.5558 27.8811 10.9257C28.251 11.2957 28.4589 11.7975 28.4589 12.3207V23.1713Z" fill="#4C4C4C" />
                                    <path d="M17.6084 21.1985C19.7875 21.1985 21.554 19.4319 21.554 17.2528C21.554 15.0737 19.7875 13.3072 17.6084 13.3072C15.4292 13.3072 13.6627 15.0737 13.6627 17.2528C13.6627 19.4319 15.4292 21.1985 17.6084 21.1985Z" fill="#4C4C4C" />
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
                        <p>{email}</p>
                    </div>
                </div>
                <div className={styles.input}>
                    <p className={styles.text}>이름</p>
                    <input
                        type="text"
                        name="name"
                        placeholder="김참빛"
                        value={formData.name}
                        onChange={onChangeForm}
                    />
                </div>
                <div className={styles.input}>
                    <p className={styles.text}>학번</p>
                    <input
                        type="text"
                        name="s_num"
                        placeholder="19학번"
                        value={formData.s_num}
                        onChange={onChangeForm}
                    />
                </div>
                <div className={styles.input}>
                    <p className={styles.text}>학과</p>
                    <input
                        type="text"
                        name="major"
                        placeholder="소프트웨어학부"
                        value={formData.major}
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
                    <button className={styles.secession} onClick={handleDeleteClick}>탈퇴하기</button>
                    <button className={styles.submit} onClick={handleUpdate}>수정</button>
                </div>

                {/* 모달 구현 */}
                {isModalOpen && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <h2>탈퇴 확인</h2>
                            <p>정말로 탈퇴하시겠습니까?</p>
                            <button onClick={handleConfirmDelete}>확인</button>
                            <button onClick={handleCloseModal}>취소</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Update;
