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
        projectId:11111,
        members: [
            { id: 1, name: '노광운', stuNum: '21학번', department: '소프트웨어학부', email: 'nokw@kw.ac.kr' },
            { id: 2, name: '김노원', stuNum: '19학번', department: '정보융합학부', email: 'none_kim@kw.ac.kr' },
            { id: 3, name: '광무지', stuNum: '20학번', department: '경영학과', email: 'moozii@kw.ac.kr' },
            { id: 4, name: '광무지', stuNum: '20학번', department: '경영학과', email: 'moozii@kw.ac.kr' },
        ]
    },
    {
        teamName: '멋쟁이사자',
        projectId:22222,
        members: [
            { id: 1, name: '노광운', stuNum: '21학번', department: '소프트웨어학부', email: 'nokw@kw.ac.kr' },
            { id: 2, name: '김노원', stuNum: '19학번', department: '정보융합학부', email: 'none_kim@kw.ac.kr' },
            { id: 3, name: '광무지', stuNum: '20학번', department: '경영학과', email: 'moozii@kw.ac.kr' },
        ]
    },
    {
        teamName: '광운극회',
        projectId:33333,
        members: [
            { id: 1, name: '노광운', stuNum: '21학번', department: '소프트웨어학부', email: 'nokw@kw.ac.kr' },
            { id: 2, name: '김노원', stuNum: '19학번', department: '정보융합학부', email: 'none_kim@kw.ac.kr' },
            { id: 3, name: '광무지', stuNum: '20학번', department: '경영학과', email: 'moozii@kw.ac.kr' },
        ]
    }
];

export const recruit_teams = [
    {
        id: 1,
        teamtitle: '해커톤 같이 나갈 개발자 구합니다',
        members: [
            { id: 1, name: '노광운', stuNum: '21학번', department: '소프트웨어학부', email: 'nokw@kw.ac.kr', resumePath: '/test.pdf' },
            { id: 2, name: '김노원', stuNum: '19학번', department: '정보융합학부', email: 'none_kim@kw.ac.kr', resumePath: '' },
            { id: 3, name: '광무지', stuNum: '20학번', department: '경영학과', email: 'moozii@kw.ac.kr', resumePath: '' },
            { id: 4, name: '광무지', stuNum: '20학번', department: '경영학과', email: 'moozii@kw.ac.kr', resumePath: '' },
        ]
    },
    {
        id: 2,
        teamtitle: '게임 개발 도전하실 겜덕 구함',
        members: [
            { id: 1, name: '노광운', stuNum: '21학번', department: '소프트웨어학부', email: 'nokw@kw.ac.kr', resumePath: '' },
            { id: 2, name: '김노원', stuNum: '19학번', department: '정보융합학부', email: 'none_kim@kw.ac.kr', resumePath: '' },
            { id: 3, name: '광무지', stuNum: '20학번', department: '경영학과', email: 'moozii@kw.ac.kr', resumePath: '' },
        ]
    },

];

// Mock Data for team calendar
export const calendar_add = {
    headers: {
        "content-type": "application/json",
        Authorization: "Bearer mockAccessToken"
    },
    body: [
        {
            userId: 12345,
            projectId: 11111,//projectID가 있으면 팀플일정, null이면 개인일정
            title: "캡스톤 회의",
            eventDate: "2024-10-05 15:00:00"
        },
        {
            userId: 12345,
            projectId: 22222,
            title: "멋사 회의",
            eventDate: "2024-10-05 15:00:00"
        },
        {
            userId: 12345,
            projectId: 33333,
            title: "극회 회의",
            eventDate: "2024-10-05 15:00:00"
        }, {
            userId: 12345,
            projectId: null,
            title: "알바",
            eventDate: "2024-10-06 09:00:00"
        },
        {
            userId: 12345,
            projectId: null,
            title: "알바",
            eventDate: "2024-10-07 09:00:00"
        },
        {
            userId: 12345,
            projectId: null,
            title: "알바",
            eventDate: "2024-10-08 09:00:00"
        }
    ],
    response: {
        code: 200,
        usercalendarId: 98766  // 모든 일정의 usercalendarId를 동일하게 설정
    }
};


// Mock Data for overall calendar
export const calendar = {
    response: {
        code: 200,
        data: {
            projects: [
                {
                    projectId: 11111,
                    name: "캡스톤"
                },
                {
                    projectId: 22222,
                    name: "멋쟁이사자"
                },
                {
                    projectId: 33333,
                    name: "광운극회"
                }
            ],
            events: {
                univEvents: [
                    {
                        univcalendarId: 1,
                        title: "개강",
                        eventDate: "2024-09-02"
                    },
                    {
                        univcalendarId: 2,
                        title: "추계 체육대회",
                        eventDate: "2024-09-25"
                    },
                    {
                        univcalendarId: 3,
                        title: "중간고사 시작",
                        eventDate: "2024-10-21"
                    },
                    {
                        univcalendarId: 4,
                        title: "강의 중간평가",
                        eventDate: "2024-10-21"
                    },
                    {
                        univcalendarId: 5,
                        title: "2학기 [심화·복수·부·연계]전공 신청",
                        eventDate: "2024-10-24"
                    }
                ],
                userEvents: [
                    {
                        usercalendarId: 98766,  // 동일하게 설정
                        title: "캡스톤 회의",
                        eventDate: "2024-09-13 18:00:00"
                    },
                    {
                        usercalendarId: 98766,  // 동일하게 설정
                        title: "개인 공부",
                        eventDate: "2024-09-13 09:00:00"
                    },{
                        usercalendarId: 98766,  // 동일하게 설정
                        title: "참빛 회의",
                        eventDate: "2024-10-09 10:00:00"
                    }
                ],
                projectEvents: [
                    {
                        usercalendarId: 98766,  // 동일하게 설정
                        projectId: 11111,
                        title: "캡스톤 프로젝트 회의",
                        eventDate: "2024-09-13 18:00:00"
                    },
                    {
                        usercalendarId: 98766,  // 동일하게 설정
                        projectId: 22222,
                        title: "졸업 프로젝트 리뷰",
                        eventDate: "2024-09-20 10:00:00"
                    },
                    {
                        usercalendarId: 98766,  // 동일하게 설정
                        projectId: 33333,
                        title: "테스트",
                        eventDate: "2024-09-14 10:00:00"
                    },
                    {
                        usercalendarId: 98766,  // 동일하게 설정
                        projectId: 33333,
                        title: "테스트",
                        eventDate: "2024-10-14 10:00:00"
                    }
                ]
            }
        }
    }
};





const post = () => [
    {
        teamID: "1",
        imageURL: '/assets/kw_logo.jpg', // public 폴더 기준 경로
        title: "해커톤 같이 나갈 sss개발자 구함",
        deadline: "2024-10-01",
        content: "안녕하세요, 저는 소프트웨어학부 19학번 김참빛입니다.\n현재 백앤드 2명 모인 상황이고, 프론트엔드 2분 모집하고 있습니다.\n 저희는 두명 다 개발 경험 및 공모전 경험이 있습니다.\n 수상을 목표로 하고 있어서, 개발 경험 있으신 분이면 좋겠습니다.\n 관심있으시면 연락 부탁드립니다.",
        date: "2024-09-19"
    },
    {
        teamID: "2",
        imageURL: '/assets/kw_logo.jpg', // public 폴더 기준 경로
        title: "해커톤 같이 나갈 개발자 구함",
        deadline: "2024-10-01",
        content: "2번입니다",
        date: "2024-09-19"
    },
    {
        teamID: "3",
        imageURL: '/assets/kw_logo.jpg', // public 폴더 기준 경로
        title: "해커톤 같이 나갈 개발자 구함",
        deadline: "2024-10-01",
        content: "3번입니다",
        date: "2024-09-19"
    },
    {
        teamID: "4",
        imageURL: '/assets/kw_logo.jpg', // public 폴더 기준 경로
        title: "해커톤 같이 나갈 개발자 구함",
        deadline: "2024-10-01",
        content: "4번입니다",
        date: "2024-09-19"
    },
    {
        teamID: "5",
        imageURL: '/assets/kw_logo.jpg', // public 폴더 기준 경로
        title: "해커톤 같이 나갈 개발자 구함",
        deadline: "2024-10-01",
        content: "5번입니다",
        date: "2024-09-19"
    },
    {
        teamID: "6",
        imageURL: '/assets/kw_logo.jpg', // public 폴더 기준 경로
        title: "해커톤 같이 나갈 개발자 구함",
        deadline: "2024-10-01",
        content: "6번입니다",
        date: "2024-09-19"
    },
    {
        teamID: "7",
        imageURL: '/assets/kw_logo.jpg', // public 폴더 기준 경로
        title: "해커톤 같이 나갈 개발자 구함",
        deadline: "2024-10-01",
        content: "7번입니다",
        date: "2024-09-19"
    },
    {
        teamID: "8",
        imageURL: '/assets/kw_logo.jpg', // public 폴더 기준 경로
        title: "해커톤 같이 나갈 개발자 구함",
        deadline: "2024-10-01",
        content: "8번입니다",
        date: "2024-09-19"
    },
    {
        teamID: "9",
        imageURL: '/assets/kw_logo.jpg', // public 폴더 기준 경로
        title: "해커톤 같이 나갈 개발자 구함",
        deadline: "2024-10-01",
        content: "번입니다",
        date: "2024-09-19"
    }

]


