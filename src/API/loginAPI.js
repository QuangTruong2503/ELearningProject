const apiURL = process.env.REACT_APP_API_URL;

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

export const fetchVerifyToken = async (userToken) =>{
    const response = await fetch(`${apiURL}/Login/token/${userToken}`,{
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