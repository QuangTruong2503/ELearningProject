const apiURL = process.env.REACT_APP_API_URL;
export const fetchDeleteData = async (url) => {
    const response = await fetch(`${apiURL}/${url}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            // Thêm các header khác nếu cần
        },
    });
    if (!response.ok) throw new Error('Error: ' + response.status);
    const result = await response.json();
    return result;
}