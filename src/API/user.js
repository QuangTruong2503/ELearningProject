const apiURL = process.env.REACT_APP_API_URL;

export const fetchAllUsers = async (url) =>{
    const response = await fetch(`${apiURL}/${url}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if(!response.ok)
        console.log(response.statusText);
    const result = await response.json();
    return result;
};

//Lấy dữu liệu người dùng theo ID
export const fetchUserByID = async (userID) =>{
    const response = await fetch(`${apiURL}/Users/${userID}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if(!response.ok)
        console.log(response.statusText);
    const result = await response.json();
    return result;
}

//Cập nhật dữ liệu người dùng theo ID
export const fetchUpdateUserByID = async (data) =>{
    const response = await fetch(`${apiURL}/Users`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    if(!response.ok)
        console.log(response.statusText);
    const result = await response.json();
    return result;
}
//Cập nhật dữ ảnh người dùng theo ID
export const fetchUpdateImageByUser = async (userID, imageURL) =>{
    const response = await fetch(`${apiURL}/Users/update-image?userID=${userID}&imageURL=${imageURL}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if(!response.ok)
        console.log(response.statusText);
    const result = await response.json();
    return result;
}

//Thay đổi mật khẩu
export const fetchChangePassword = async (userID, currentPassword, newPassword) =>{
    const response = await fetch(`${apiURL}/Users/change-password?userID=${userID}&currentPassword=${currentPassword}&newPassword=${newPassword}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if(!response.ok)
        console.log(response.statusText);
    const result = await response.json();
    return result;
}