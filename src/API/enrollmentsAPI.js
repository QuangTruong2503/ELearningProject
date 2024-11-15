const apiURL = process.env.REACT_APP_API_URL;

//Kiểm tra người dùng tham gia khóa học hay không
export const fetchUserInCourse = async (userID, courseID) => {
    const response = await fetch(`${apiURL}/Enrollments/user-in-course?courseID=${courseID}&userID=${userID}`, {
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

//Tham gia khóa học
export const fetchJoinCourse = async (userID, courseID) =>{
    const response = await fetch(`${apiURL}/Enrollments?userID=${userID}&courseID=${courseID}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Thêm các header khác nếu cần
        },
    });
    if (!response.ok) throw new Error('Error: ' + response.status);
    const result = await response.json();
    return result;
}

export const fetchJoinCourseByInviteCode = async (inviteCode, userID) =>{
    const response = await fetch(`${apiURL}/Enrollments/join-by-invite?inviteCode=${inviteCode}&userID=${userID}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Thêm các header khác nếu cần
        },
    });
    if (!response.ok) throw new Error('Error: ' + response.status);
    const result = await response.json();
    return result;
}