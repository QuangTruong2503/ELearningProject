const apiURL = process.env.REACT_APP_API_URL;

export const checkAccountExists = async (username, email) =>{
    const response = await fetch(`${apiURL}/Users/check-user-and-email/username=${username}&email=${email}`,{
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

export const registerAccount = async (data) =>{
    const response = await fetch(`${apiURL}/Users`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    if(!response.ok)
    {
        return console.log(response.statusText);
    }
    const result = await response.json();
    return result;
}