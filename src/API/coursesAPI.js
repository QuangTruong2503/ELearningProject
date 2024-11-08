const apiURL = process.env.REACT_APP_API_URL;

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