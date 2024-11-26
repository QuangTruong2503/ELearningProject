const apiURL = process.env.REACT_APP_API_URL;

export const fetchCreateSubmission = async (data, examID, studentID) =>{
    const response = await fetch(`${apiURL}/Submissions/create-submission?examID=${examID}&studentID=${studentID}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Thêm các header khác nếu cần
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Error: ' + response.status);
    const result = await response.json();
    return result;
}

//Kiểm tra người dùng đã hoàn thành bài thi chưa
export const fetchCheckUserDoExam = async (userID, examID) =>{
    const response = await fetch(`${apiURL}/Submissions/check/exam-user-available?userID=${userID}&examID=${examID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // Thêm các header khác nếu cần
        },
    });
    if (!response.ok) throw new Error('Error: ' + response.status);
    const result = await response.json();
    return result;
}