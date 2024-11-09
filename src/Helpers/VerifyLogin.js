const apiURL = process.env.REACT_APP_API_URL;
const Cookies = require('js-cookie'); 

export const fetchVerifyLogin = async () =>{
    const loginCookies = Cookies.get('loginData');
    if(loginCookies !== undefined)
    {
        const loginData = JSON.parse(loginCookies);
        const token = loginData.token
        //Kiểm tra token có hợp lệ không
        const response = await fetch(`${apiURL}/Login/token/${token}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Thêm các header khác nếu cần
            },
            
        });
        if (!response.ok) throw new Error('Error: ' + response.status);
        const result = await response.json();
        if(result.success === true)
        {
            console.log(result.message)
           const data = JSON.parse(result.data);
           return data;
        }
        else{
            alert('Token không hợp lệ');
            Cookies.remove('loginData');
        }
    }
}