import axios from 'axios';

// Base URL for axios requests
const API_BASE_URL = 'http://localhost:8080/api';

export const fetchPreference = async () => {
    const applicantId = localStorage.getItem('applicantId');
    
    try {

        console.log("applicantId is ", applicantId);

        // Make GET request with axios
        const response = await axios.get(`${API_BASE_URL}/applicant-preferences/${applicantId}`);

        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            // Return default preference structure if no data exists for the applicant
            return {
                applicantId: parseInt(applicantId || '0', 10),
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
    try {
        // Make POST request with axios
        const response = await axios.post(`${API_BASE_URL}/applicant-preferences`, preference, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Failed to update preference:', error);
        throw error;
    }
};
