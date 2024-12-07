import axios from 'axios';

// Base URL for axios requests
const API_BASE_URL = 'https://muradazimzada.me/api';

export const fetchPreference = async () => {
    const token = localStorage.getItem("token");

    // console.log("token at pref: " +  token);
    // const headersTest = new Headers();
    // headersTest.set("Authorization", `Bea`)

    const headers = {
        "Authorization": `Bearer ${token}`
    };
    try {


        // Make GET request with axios
        const response = await axios.get(`${API_BASE_URL}/applicant-preferences/me`, {
            headers: headers
        });

        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            // Return default preference structure if no data exists for the applicant
            return {
                applicantId: parseInt(0 || '0', 10),
                industries: [],
                jobTitles: [],
                minMonthlySalary: 0,
                locations: [],
                jobTypes: [],
                workTimings: [],
                notificationPreference: {
                    notificationFrequency: "DAILY",
                },
            };
        }
        console.error('Failed to fetch preference:', error);
        throw error;
    }
};

export const updatePreference = async (preference: any) => {
    const token = localStorage.getItem("token");
    // const headersTest = new Headers();
    // headersTest.set("Authorization", `Bea`)

    const headers = {
        "Authorization": `Bearer ${token}`
    };
    try {
        // Make POST request with axios
        const response = await axios.post(`${API_BASE_URL}/applicant-preferences`, preference,
        {
            headers: headers
        });

        return response.data;
    } catch (error) {
        console.error('Failed to update preference:', error);
        throw error;
    }
};
