import axios from 'axios';

export const fetchSurveyList = async (accessToken) => {
    try {
        const response = await axios.get('http://15.165.62.195/survey', {
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${accessToken}`
            }
        });
        return response.data.data;

    } catch (error) {
        console.error('Error fetching surveys, using mock data:', error);

    }
};
export const fetchSurvey = async (accessToken, surveyId) => {
    try {
        const response = await axios.get(`http://15.165.62.195/survey/${surveyId}`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${accessToken}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching survey data:', error);
        // 필요 시 Mock 데이터 사용 가능
    }
};

export const surveySubmit = async (accessToken, surveyId, formattedAnswers) => {

    const response = await axios.post(`http://15.165.62.195/survey/submit/${surveyId}`, { answers: formattedAnswers }, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${accessToken}` // 인증 헤더 추가
        }
    });
    return response.data.data;

};
export const surveyCreate = async (accessToken, surveyData) => {
        const response = await fetch('http://15.165.62.195/survey/create', {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(surveyData),
        });
        return response;
}