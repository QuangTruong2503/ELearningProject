const apiURL = process.env.REACT_APP_API_URL;

//Lây dữ liệu tất thống kê người dùng đăng ký theo tháng
export const fetchUserRegisterByMonth = async () =>{
    const response = await fetch(`${apiURL}/Charts/user-register-by-months`, {
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