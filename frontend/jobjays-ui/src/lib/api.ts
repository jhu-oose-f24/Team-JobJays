import useSWR from 'swr' ;
import {Applicant, ApplicantProfile, Employer, EmployerProfile, JobPost, SavedJobCollection} from './types';

// Fetcher function
export const fetcher = (url: string) => {
    const token = localStorage.getItem("token");
    // const headersTest = new Headers();
    // headersTest.set("Authorization", `Bea`)

    const headers = {
        "Authorization": `Bearer ${token}`
    };
    console.log("Headers being sent:", headers);
    return fetch(url, {
        method: "GET",
        headers: headers,
    }).then((res) => res.json());
};



// Function to calculate days remaining until the job post is closed
export function calculateDaysRemaining(endDate: string): number {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Function to add additional attributes to job posts
export function addJobAttributes(job: JobPost): JobPost {
    const daysRemaining = calculateDaysRemaining(new Date(job.closedDate).toISOString());
    const jobStatus = daysRemaining > 0 ? 'Active' : 'Expired';

    return {
        ...job,
        daysRemaining,
        status: jobStatus
    };
}

export function useApplicant() {
    console.log("In use applicant");
    const { data, error, isLoading } = useSWR("http://localhost:8080/api/applicants/profile", fetcher);


    return {
        applicantProfile: data as ApplicantProfile,
        isLoading,
        isError: error
    };
}

// Hook to fetch the EmployerProfile and process job posts
export function useEmployer() {
    // employerId = localStorage.getItem('employerId') ? parseInt(localStorage.getItem('employerId') as string) : 0;
    const { data, error, isLoading } = useSWR(`http://localhost:8080/api/companies/profile`, fetcher);

    // Process job posts if data is available
    // const processedEmployerProfile = data && data.jobPosts ? {
    //     ...data,
    //     jobPosts: data.jobPosts.map((job: JobPost) => addJobAttributes(job))
    // } : data;

    return {
        EmployerProfile: data as EmployerProfile,
        isLoading,
        isError: error
    };
}

export function fetchUserProfile(id: number) {
    console.log(id);
}

export function fetchJobApplicants(id:number) {
    console.log(id);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, error, isLoading} = useSWR(`http://localhost:8080/api/${id}/applicants`, fetcher);
    console.log(data);
    return {
        applicants: data as Applicant,
        isLoading,
        isError: error
    };
}

export function useJobApplicants(jobId: number | null) {
    const { data, error } = useSWR(
      jobId ? `http://localhost:8080/api/${jobId}/applicants` : null,
      fetcher
    );
  
    console.log('Applicants data:', data); // For debugging
  
    return {
      applicants: data as Applicant[] | undefined,
      isLoading: !error && !data,
      isError: error,
    };
  }

export function fetchJobPost(id:number) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
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

export function fetchAllJobPosts() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, error, isLoading, mutate } = useSWR(`http://localhost:8080/api/posts/jobs`, fetcher);

    const processedJobPosts = data ? (data as JobPost[]).map(addJobAttributes) : null;
    
    return {
        JobPosts: processedJobPosts as JobPost[],
        isLoading,
        isError: error,
        mutate
    };
}

export function fetchAllCompanies() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, error, isLoading, mutate } = useSWR(`http://localhost:8080/api/companies`, fetcher);
    return {
        Employers: data as Employer[],
        isLoading,
        isError: error,
        mutate
    };
}


export const createJobPost = async (
    jobData: any,
) => {

    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": 'application/json',
    };
    const response = await fetch(`http://localhost:8080/api/companies/profile/post`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(jobData),
    });

    // const headersTest = new Headers();
    // headersTest.set("Authorization", `Bea`)

    console.log("in create job post");
    if (!response.ok) {
        // console.log("Response Content-Type:", response.headers.get('content-type'));
        const error = await response.json();
        // console.log(error)

        return { success: false, error };
    }
    // console.log(response.json())
    const data = await response.json();
    return {success: true, data: data};
}

export const updateJobPost = async (
    id: number,
    updatedData: any,
    mutate:any,
    jobPost:JobPost
) => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": 'application/json',
    };
    try {
        const response = await fetch(`http://localhost:8080/api/companies/profile/post/${id}`, {
            method: 'PUT',
            headers: headers,
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

export const applyToJob = async (
    id: number
) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8080/api/applicants/apply/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        const error = await response.json();
        console.log(error);
        return { success: false, error };
    }
    // api does not return anything on success
    return { success: true };
}

export const addImpressionEvent = async (id: number) => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": 'application/json',
    };
    try {
        const response = await fetch(`http://localhost:8080/api/metrics/impressions/${id}`, {
            method: 'POST',
            headers: headers
        });
        if (!response.ok) {
           console.error(`Error incrementing view count: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Failed to increment job post view count:", error);
    }
}

export const createNewSaveCollection = async (collectionName: string) => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": 'plain/text',
    }
    try {
        const response = await fetch(`http://localhost:8080/api/applicants/create-job-collection`, {
            method: 'POST',
            headers: headers,
            body: collectionName
        });
        if (response.ok) {
            console.log("Collection created successfully");
            const data: SavedJobCollection = await response.json();
            return { success: true, data };

        } else {
            console.error(`Error creating collection: ${response.statusText}`);
            const error = await response.json();
            return { success: false, error };
        }
    } catch (error) {
        console.error("Failed to create new collection:", error);
        return { success: false, error };
    }
}

//add a job to Saved
export const saveJobToCollection = async (listId: number, jobId:number) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8080/api/applicants/saved-job/${listId}/${jobId}/add`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        const error = await response.json();
        console.log(error);
        return { success: false, error };
    } else {
        console.log("Job saved successfully");
        return { success: true };
    }

}


//get saved a job
export function useSavedJobCollections() {
    const { data, error, isLoading } = useSWR(`http://localhost:8080/api/applicants/saved-jobs/collections`, fetcher);
    //returns list of savedJobCollection

    return {
        Collections: data as SavedJobCollection[],
        isLoading,
        isError: error
    };


}

export function useGetSavedJobs() {
    const { data, error, isLoading } = useSWR(
        `http://localhost:8080/api/applicants/profile/saved-jobs`,
        fetcher
    );

    // Process the data
    const savedJobs = data
        ? data.map((job: JobPost) => addJobAttributes(job))
        : [];

    return {
        savedJobs,
        isLoading,
        isError: error,
    };
}

export function logout() {
    localStorage.removeItem("token");
}






