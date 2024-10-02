// mockData.js

// users 테이블
export const users = [
    {
        id: 1,
        email: 'nokw@kw.ac.kr',
        password: '1234',
        name: '노광운',
        major: '소프트웨어학부',// 전공
        stuNum: 21,// 학번(ex. 19)
        role: 'USER',//[USER, ADMIN]
        image: 'default'// 프로필 이미지
    },
    {
        id: 2,
        email: 'none_kim@kw.ac.kr',
        password: '1234',
        name: '김노원',
        major: '정보융합학부',
        stuNum: 19,
        role: 'USER',
        image: 'default'
    },
    {
        id: 3,
        email: 'moozii@kw.ac.kr',
        password: '1234',
        name: '광무지',
        major: '경영학과',
        stuNum: 20,
        role: 'USER',
        image: 'default'
    },
    {
        id: 4,
        email: 'moozii@kw.ac.kr',
        password: '1234',
        name: '광무지',
        major: '경영학과',
        stuNum: 20,
        role: 'USER',
        image: 'default'
    },
];

// univcalendar 테이블
export const univcalendar = [
    {
        id: 1,
        userId: 1,
        title: 'Final Exams', // 일정 내용
        eventDate: '2024-12-10'// 일정날 yyyy-mm-dd
    },
    {
        id: 2,
        userId: 2,
        title: 'Midterm Exams',
        eventDate: '2024-10-15'
    },
];

// usercalendar 테이블
export const usercalendar = [
    {
        id: 1,
        userId: 1,
        projectId: 1,
        title: 'Project 1 Meeting',//일정 내용
        eventDate: '2024-09-25'// 일정날 yyyy-mm-dd

    },
    {
        id: 2,
        userId: 2,
        projectId: 2,
        title: 'Project 2 Kickoff',
        eventDate: '2024-09-30'
    },
];

// resume 테이블
export const resumes = [
    {
        id: 1,
        userId: 1,
        resumePath: '/resumes/alice_resume.pdf' // 파일 경로

    },
    {
        id: 2,
        userId: 2,
        resumePath: '/resumes/bob_resume.pdf'
    },
];

// participation 테이블
export const participation = [//프로젝트에 참여하고 있는 유저
    {
        id: 1,
        userId: 1,
        projectId: 1,
        role: 'CREATOR',// [CREATOR, MEMBER, APPLICANT]
        resumePath: '/resumes/alice_resume.pdf'// APPLICANT의 이력서
    },
    {
        id: 2,
        userId: 2,
        projectId: 2,
        role: 'MEMBER',
        resumePath: '/resumes/bob_resume.pdf'
    },
];

// project 테이블
export const projects = [
    {
        id: 1,
        name: '캡스톤',// 프로젝트명
        description: 'AI-based project',// 프로젝트 내용
        projectType: 'UNIVIN',// [UNIVIN, UNIVOUT]
        start: true,// 프로젝트 시작 여부 -> 시작하면 공고 마감
        createdAt: '2024-09-01',// 프로젝트 생성시간
        deadlineAt: '2024-12-31'// 프로젝트 공고 마감 기한
    },
    {
        id: 2,
        name: '멋쟁이사자',
        description: 'Developing a web application',
        projectType: 'UNIVOUT',
        start: false,
        createdAt: '2024-09-15',
        deadlineAt: '2024-12-15'
    },
    {
        id: 3,
        name: '광운극회',
        description: 'Developing a web application',
        projectType: 'UNIVOUT',
        start: false,
        createdAt: '2024-09-15',
        deadlineAt: '2024-12-15'
    },

];



// survey 테이블
export const surveys = [// 설문조사 기본 폼
    {
        id: 1,
        userId: 1,
        title: 'Project Feedback', // 설문조사 제목
        description: 'Survey for project feedback',// 설문조사 내용
        isOngoing: true,// 설문조사 상태 true(진행중), false(종료)
        createdAt: '2024-09-01',// 생성 시간(설문 시작)
        endDate: '2024-09-30'// 설문 종료 시간
    },
];

// response 테이블
export const responses = [// 하나의 설문조사에 대한 여러 응답
    {
        id: 1,
        surveyId: 1,
        userId: 2
    },
];

// question 테이블
export const questions = [// 개별질문 추가
    {
        id: 1,
        surveyId: 1,
        questionText: 'How would you rate the project?', // 질문 내용
        questionType: 'CHOICE'// [TEXT, CHOICE]
    },
];

// choice 테이블
export const choices = [// 객관식 개수
    {
        id: 1,
        questionId: 1,
        choiceText: 'Excellent' // 각 객관식 내용
    },
    {
        id: 2,
        questionId: 1,
        choiceText: 'Good'
    },
    {
        id: 3,
        questionId: 1,
        choiceText: 'Average'
    },
    {
        id: 4,
        questionId: 1,
        choiceText: 'Poor'
    },
];

// answer 테이블
export const answers = [// 설문조사 응답 저장 테이블
    {
        id: 1,
        responseId: 1,
        questionId: 1,// 여러 질문
        choiceId: 1,// 하나의 질문에 대한 객관식 선택지
        answerText: ''// 질문에 대한 응답 or 객관식 선택지
    },
];


export const teams = [
    {
        teamName: '캡스톤',
        members: [
            { id: 1, name: '노광운', stuNum: '21학번', department: '소프트웨어학부', email: 'nokw@kw.ac.kr' },
            { id: 2, name: '김노원', stuNum: '19학번', department: '정보융합학부', email: 'none_kim@kw.ac.kr' },
            { id: 3, name: '광무지', stuNum: '20학번', department: '경영학과', email: 'moozii@kw.ac.kr' },
            { id: 4, name: '광무지', stuNum: '20학번', department: '경영학과', email: 'moozii@kw.ac.kr' },
        ]
    },
    {
        teamName: '멋쟁이사자',
        members: [
            { id: 1, name: '노광운', stuNum: '21학번', department: '소프트웨어학부', email: 'nokw@kw.ac.kr' },
            { id: 2, name: '김노원', stuNum: '19학번', department: '정보융합학부', email: 'none_kim@kw.ac.kr' },
            { id: 3, name: '광무지', stuNum: '20학번', department: '경영학과', email: 'moozii@kw.ac.kr' },
        ]
    },
    {
        teamName: '광운극회',
        members: [
            { id: 1, name: '노광운', stuNum: '21학번', department: '소프트웨어학부', email: 'nokw@kw.ac.kr' },
            { id: 2, name: '김노원', stuNum: '19학번', department: '정보융합학부', email: 'none_kim@kw.ac.kr' },
            { id: 3, name: '광무지', stuNum: '20학번', department: '경영학과', email: 'moozii@kw.ac.kr' },
        ]
    }
];

export const recruit_teams = [
    {
        teamtitle: '해커톤 같이 나갈 개발자 구합니다',
        members: [
            { id: 1, name: '노광운', stuNum: '21학번', department: '소프트웨어학부', email: 'nokw@kw.ac.kr', resumePath: '/test.pdf' },
            { id: 2, name: '김노원', stuNum: '19학번', department: '정보융합학부', email: 'none_kim@kw.ac.kr', resumePath: '' },
            { id: 3, name: '광무지', stuNum: '20학번', department: '경영학과', email: 'moozii@kw.ac.kr', resumePath: '' },
            { id: 4, name: '광무지', stuNum: '20학번', department: '경영학과', email: 'moozii@kw.ac.kr', resumePath: '' },
        ]
    },
    {
        teamtitle: '게임 개발 도전하실 겜덕 구함',
        members: [
            { id: 1, name: '노광운', stuNum: '21학번', department: '소프트웨어학부', email: 'nokw@kw.ac.kr', resumePath: '' },
            { id: 2, name: '김노원', stuNum: '19학번', department: '정보융합학부', email: 'none_kim@kw.ac.kr', resumePath: '' },
            { id: 3, name: '광무지', stuNum: '20학번', department: '경영학과', email: 'moozii@kw.ac.kr', resumePath: '' },
        ]
    },

];

export const calendar_team = {
    "headers": {
        "content-type": "application/json",
        "Authorization": "Bearer mockAccessToken"
    },
    "body": {
        "userId": 12345,
        "projectId": 67890,
        "title": "프로젝트 회의",
        "eventDate": "2024-10-05 15:00:00"
    },
    "response": {
        "code": 200,
        "usercalendarId": 98765
    }
}


export const calendar_personal = {
    "headers": {
        "content-type": "application/json",
        "Authorization": "Bearer mockAccessToken"
    },
    "body": {
        "userId": 12345,
        "projectId": 67890,
        "title": "프로젝트 회의",
        "eventDate": "2024-10-05 15:00:00"
    },
    "response": {
        "code": 200,
        "usercalendarId": 98765
    }
}

export const calendar = {
    "pathVariable": "2024-09",
    "headers": {
        "content-type": "application/json",
        "Authorization": "Bearer mockAccessToken"
    },
    "body": {},
    "response": {
        "code": 200,
        "data": {
            "projects": [
                {
                    "projectId": 1,
                    "name": "졸업 프로젝트"
                },
                {
                    "projectId": 2,
                    "name": "캡스톤 프로젝트"
                }
            ],
            "events": {
                "univEvents": [
                    {
                        "univcalendarId": 1,
                        "title": "개강",
                        "eventDate": "2024-09-13"
                    },
                    {
                        "univcalendarId": 3,
                        "title": "개강",
                        "eventDate": "2024-09-13"
                    },
                    {
                        "univcalendarId": 2,
                        "title": "개강",
                        "eventDate": "2024-09-20"
                    }, {
                        "univcalendarId": 4,
                        "title": "중간고사",
                        "eventDate": "2024-09-14"
                    },
                ],
                "userEvents": [
                    {
                        "usercalendarId": 1,
                        "title": "캡스톤 회의",
                        "eventDate": "2024-09-13 18:00:00"
                    },
                    {
                        "usercalendarId": 2,
                        "title": "개인 공부",
                        "eventDate": "2024-09-13 09:00:00"
                    }
                ],
                "projectEvents": [
                    {
                        "usercalendarId": 1,
                        "projectId": 2,
                        "title": "캡스톤 프로젝트 회의",
                        "eventDate": "2024-09-13 18:00:00"
                    },
                    {
                        "usercalendarId": 2,
                        "projectId": 1,
                        "title": "졸업 프로젝트 리뷰",
                        "eventDate": "2024-09-20 10:00:00"
                    }
                    , {
                        "usercalendarId": 2,
                        "projectId": 1,
                        "title": "테스트",
                        "eventDate": "2024-09-14 10:00:00"
                    }
                ]
            }
        }
    }

}


