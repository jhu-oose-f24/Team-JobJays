
import useSWR from 'swr';
import { EmployerProfile, JobPost } from './types'; // Ensure you have the correct types for your data

// Fetcher function
export const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Function to calculate days remaining until the job post is closed
export function calculateDaysRemaining(endDate: string): number {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
}

// Function to add additional attributes to job posts
export function addJobAttributes(job: JobPost): JobPost {
    //console.log(job)
    const daysRemaining = calculateDaysRemaining(new Date(job.closedDate).toISOString());
    const jobType = job.type || 'Full Time'; // Default to Full Time if not specified
    const jobStatus = daysRemaining > 0 ? 'Active' : 'Expired';

    return {
        ...job,
        daysRemaining,
        type: jobType,
        status: jobStatus
    };
}

// Hook to fetch the EmployerProfile and process job posts
export function useUser(employerId: number) {
    const { data, error, isLoading } = useSWR(`http://localhost:8080/api/companies/profile/${employerId}`, fetcher);

    // Process job posts if data is available
    const processedEmployerProfile = data && data.jobPosts ? {
        ...data,
        jobPosts: data.jobPosts.map((job: JobPost) => addJobAttributes(job))
    } : data;

    return {
        EmployerProfile: processedEmployerProfile as EmployerProfile,
        isLoading,
        isError: error
    };
}

export function fetchUserProfile(id: number) {

}

export function fetchUserData(id:number) {

}

export function fetchJobPost(id:number) {
    const { data, error, isLoading, mutate } = useSWR(`http://localhost:8080/api/posts/jobs/${id}`, fetcher);

    // Data should already be processed
    const processedJobPost = data ? addJobAttributes(data as JobPost) : null;
    return {
        JobPost: processedJobPost as JobPost,
        isLoading,
        isError: error,
        mutate
    };

}
export const createJobPost = async (
    employerId: number,
    jobData: any,
) => {

    const response = await fetch(`http://localhost:8080/api/companies/profile/${employerId}/post`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
    });
    if (!response.ok) {
        const error = await response.json();
        // console.log(error);
        return { success: false, error };
    }
    const data = await response.json();
    return {success: true, data: data};
}

export const updateJobPost = async (
    id: number,
    updatedData: any,
    mutate:any,
    jobPost:JobPost
) => {
    try {
        const response = await fetch(`http://localhost:8080/api/companies/profile/1/post/${id}`, { //TODO replace hardcoded 1 with employer id from satte managed employer
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });
        if (response.ok) {
            const data = await response.json();
            mutate({ ...jobPost }); // Optimistically update the UI
            return { success: true, data: data}
        }
        else {
            const error = await response.json();
            console.log(`Unexpected response: ${response.status} - ${response.statusText}`);
            return {success: false, error};
        }
    } catch (error:any) {
        console.error("Error updating job post:", error);
        return {success: false, error};
    }
}


