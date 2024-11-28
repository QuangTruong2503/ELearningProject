const apiURL = process.env.REACT_APP_API_URL;

//Lấy dữ liệu theo id
export const fetchSubmissionByID = async (submissionID, userID) =>{
    const response = await fetch(`${apiURL}/Submissions/by-submissionID?submissionID=${submissionID}&userID=${userID}`, {
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
//Lấy dữ liệu theo bài làm và người dùng
export const fetchSubmissionByExamAndUser = async (examID, userID) =>{
    const response = await fetch(`${apiURL}/Submissions/by-exam-user?examID=${examID}&userID=${userID}`, {
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

export const fetchInsertAnswerBySubmission = async (data, submissionID) =>{
    const response = await fetch(`${apiURL}/Submissions/insert-answers?submissionID=${submissionID}`, {
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
//Tạo bài làm mới cho học sinh với bài thi
export const fetchNewSubmission = async (data) =>{
    const response = await fetch(`${apiURL}/Submissions`, {
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