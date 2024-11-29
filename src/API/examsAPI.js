const apiURL = process.env.REACT_APP_API_URL;

export const fetchExamsByCourse = async (courseID) =>{
    const response = await fetch(`${apiURL}/Exams/by-course/${courseID}`, {
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

//Lấy dữ liệu theo examID
export const fetchExamByID = async (id) =>{
    const response = await fetch(`${apiURL}/Exams/${id}`, {
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

//Kiểm tra người dùng ở trong khóa học với exam
export const fetchCheckUserInCourseByExamID = async (userID, examID) =>{
    const response = await fetch(`${apiURL}/Exams/check-user-in-course-by-exam?userID=${userID}&examID=${examID}`, {
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
//Thêm mới bài thi trống
export const fetchInsertNewExam = async (courseID) =>{
    const response = await fetch(`${apiURL}/Exams/create-new?courseID=${courseID}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Thêm các header khác nếu cần
        }
    });
    if (!response.ok) throw new Error('Error: ' + response.status);
    const result = await response.json();
    return result;
}
//Cập nhật dữ liệu exam
export const fetchUpdateExam = async (data) =>{
    const response = await fetch(`${apiURL}/Exams/update-exam`, {
        method: 'PUT',
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

