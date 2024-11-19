import axios from 'axios';

export const SurveyResults = async (accessToken, surveyId) => {

    const response = await axios.get(`http://15.165.62.195/mysurvey/result/${surveyId}`, { // URL 수정
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}` // Authorization 헤더 추가
        }
    });
    return response.data.data;
};

export const fetchSurvey = async (accessToken) => {
    const response = await axios.get(`http://15.165.62.195/mysurvey`, {
        headers: {
            'Content-Type': 'application/json', // Content-Type 헤더 추가
            'Authorization': `Bearer ${accessToken}` // Authorization 헤더 추가
        }
    });
    return response;
}
export const endSurvey = async (accessToken, id) => {
    const response = await fetch(`http://15.165.62.195/mysurvey/${id}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });
    return response;
}
export const deleteSurvey = async (accessToken, id) => {
    const response = await axios.delete(`http://15.165.62.195/mysurvey/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });
    return response;
}