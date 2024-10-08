const apiURL = 'https://elearningapi.up.railway.app/api';

export const handleFetchLogin = async (loginData) =>{
    try{
        const response = await fetch(`${apiURL}/Login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData),
        });
        if(!response.ok){
            console.log(response.status())
            return
        }
        const result = await response.json();
        return result;
    }
    catch(err)
    {
        console.error(err.message);
    }
}