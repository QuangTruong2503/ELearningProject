const apiURL = process.env.REACT_APP_API_URL;

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