const apiURL = process.env.REACT_APP_API_URL;

export const fetchLessonsByCourse = async (courseID) =>{
    const response = await fetch(`${apiURL}/Lessons/by-course/${courseID}`, {
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