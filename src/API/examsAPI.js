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