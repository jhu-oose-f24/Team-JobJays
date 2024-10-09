
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
export function useUser(id: number) {
    const { data, error, isLoading } = useSWR(`http://localhost:8080/api/companies/profile/${id}`, fetcher);

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
    const { data, error, isLoading } = useSWR(`http://localhost:8080/api/posts/jobs/${id}`, fetcher);

    // Data should already be processed
    const processedJobPost = data ? addJobAttributes(data as JobPost) : null;
    return {
        JobPost: processedJobPost as JobPost,
        isLoading,
        isError: error
    };
}
