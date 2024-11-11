const apiURL = process.env.REACT_APP_API_URL;

//Lây dữ liệu tất cả course
export const fetchCourses = async (url) =>{
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

export const fetchCoursesPublicBySubject = async (subject) =>{
    try {
        const response = await fetch(`${apiURL}/Courses/get/bySubject?isPublic=true&subject=${subject}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        return result;

    } catch (error) {
        console.error("Failed to fetch public courses by subject:", error);
        throw error; // Propagate error for further handling by caller
    }
}

//Thêm dữ liệu Course
export const fetchCreateCourse = async (data) =>{
    const response = await fetch(`${apiURL}/Courses`, {
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