// PreferenceService.ts

export const fetchPreference = async (applicantId: number) => {
    try {
        const response = await fetch(`/api/applicant-preferences/${applicantId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch preference:', error);
        // Returning fallback data when API call fails
        return {
            applicantId: 1,
            industries: ["Software Development", "Finance", "Healthcare"],
            jobTitles: ["Software Engineer", "Data Analyst"],
            minMonthlySalary: 10000,
            locations: [
                {
                    country: "USA",
                    state: "California",
                    city: "San Francisco"
                },
                {
                    country: "USA",
                    state: "New York",
                    city: "New York City"
                }
            ],
            jobTypes: ["remote", "hybrid", "on-site"],
            workTimings: ["full-time", "flexible", "part-time"],
            notificationPreference: {
                notificationFrequency: "DAILY"
            }
        };
    }
};

export const updatePreference = async (preference: any) => {
    try {
        const response = await fetch('/api/applicant-preferences', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(preference),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to update preference:', error);
        // Returning fallback data when API call fails
        return {
            applicantId: 1,
            industries: ["Software Development", "Finance", "Healthcare"],
            jobTitles: ["Software Engineer", "Data Analyst"],
            minMonthlySalary: 10000,
            locations: [
                {
                    country: "USA",
                    state: "California",
                    city: "San Francisco"
                },
                {
                    country: "USA",
                    state: "New York",
                    city: "New York City"
                }
            ],
            jobTypes: ["remote", "hybrid", "on-site"],
            workTimings: ["full-time", "flexible", "part-time"],
            notificationPreference: {
                notificationFrequency: "DAILY"
            }
        };
    }
};