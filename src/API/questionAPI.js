const apiURL = process.env.REACT_APP_API_URL;

export const fetchQuestionsByExam = async (url) =>{
    const response = await fetch(`${apiURL}/${url}`, {
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
//Upsert dữ liệu câu hỏi
export const fetchUpsertQuestionsAndOptions = async (data) =>{
    const response = await fetch(`${apiURL}/Questions/upsert-questions-and-options`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Thêm các header khác nếu cần
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Error: ' + response.status);
    const result = await response.json();
    return result;
}