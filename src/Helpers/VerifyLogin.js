import { toast } from 'react-toastify';

const apiURL = process.env.REACT_APP_API_URL;
const Cookies = require('js-cookie'); 

export const fetchVerifyLogin = async () =>{
    const loginCookies = Cookies.get('loginData');
    if(loginCookies === undefined)
    {
        window.location.href = '/'
    }
    else
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
           const data = JSON.parse(result.data);
           return data;
        }
        else{
            toast.error(result.message);
            Cookies.remove('loginData');
        }
    }
}