import useSWR from 'swr' ;
import {
    Applicant,
    ApplicantProfile,
    Employer,
    EmployerProfile, Impressions, ImpressionsChartData,
    JobPost,
    SavedJobCollection,
    UserTypeDto
} from './types';
const BASE_URL = 'https://muradazimzada.me/api';
//const BASE_URL = 'http://74.179.58.106:8080/api';

// Fetcher function
export const fetcher = (url: string) => {
    const token = localStorage.getItem("token");
    // const headersTest = new Headers();
    // headersTest.set("Authorization", `Bea`)

    const headers = {
        "Authorization": `Bearer ${token}`
    };
    //console.log("Headers being sent:", headers);
    return fetch(url, {
        method: "GET",
        headers: headers,
    }).then((res) => res.json());
};

export const fetcherNoAuth = (url: string) => {
    return fetch(url).then((res) => res.json());
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

export async function registerApplicant(applicantData: any) {
    try {
        const response = await fetch(`${BASE_URL}/applicants/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(applicantData),
        });


        if (response.ok) {
            console.log("Backend in response ok");
            const employerData = await response.json();
            return { success: true, data: employerData };
        } else {
            console.log("Not ok");
            const errorData = await response.json();
            // alert(`Error: ${errorData.message}`);
            return { success: false, error: errorData };
        }
    } catch (error) {
        // alert(`An error occurred: ${error}`);
        return { success: false, error };
    }
}

export async function registerEmployer(employerData: any) {
    console.log(BASE_URL)
    try {
        const response = await fetch(`${BASE_URL}/companies/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(employerData),
        });


        if (response.ok) {
            const employerData = await response.json();
            return { success: true, data: employerData };
        } else {
            const errorData = await response.json();
            // alert(`Error: ${errorData.message}`);
            return { success: false, error: errorData };
        }
    } catch (error) {
        // alert(`An error occurred: ${error}`);
        return { success: false, error };
    }
}

export async function loginApplicant(applicantData: any) {
    try {
        const response = await fetch(`${BASE_URL}/auth/applicant`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(applicantData)
        });

        if (response.status == 401) {
            //alert("Invalid username or password");
            return response;
        }

        if (response.ok) {
            const contentType = response.headers.get("content-type");
            let applicantData ;
            if (contentType && contentType.includes("application/json")) {
                applicantData = await response.json();
            } else {
                applicantData = { token: await response.text()}; // wrap the token in an object
            }

            localStorage.setItem("token", applicantData.token);
            localStorage.setItem("role", "candidate");
            return response;
        } else {
            // const errorData = await response.json();
            // console.log(`Error: ${errorData.failReason}`);
            return response;
        }
    } catch (error) {
        alert(`An error occurred: ${error}`);
    }
}

export async function loginEmployer(employerData: any) {
    try {
        const response = await fetch(`${BASE_URL}/auth/employer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(employerData)
        });

        if (response.status == 401) {
            //alert("Invalid username or password");
            return response;
        }

        if (response.ok) {
            const contentType = response.headers.get("content-type");
            let employerData;
            if (contentType && contentType.includes("application/json")) {
                employerData = await response.json();
            } else {
                employerData = { token: await response.text()}; // wrap the token in an object
            }

            localStorage.setItem("token", employerData.token);
            localStorage.setItem("role", "employer");
            return response;
        } else {
            // const errorData = await response.json();
            // console.log(`Error: ${errorData.failReason}`);
            return response;
        }
    } catch (error) {
        alert(`An error occurred: ${error}`);
    }
}



export function useApplicant() {
    console.log("In use applicant");
    const { data, error, isLoading, mutate} = useSWR(`${BASE_URL}/applicants/profile`, fetcher);


    return {
        applicantProfile: data as ApplicantProfile,
        isLoading,
        isError: error,
        mutate
    };
}

export function useAllApplicants() {
    const { data, error, isLoading } = useSWR(`${BASE_URL}/applicants`, fetcher);

    return {
        applicants: data as Applicant[],
        isLoading,
        isError: error
    };
}

export async function updateApplicantProfile(updatedData: any, mutate: any, applicantProfile: ApplicantProfile) {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": 'application/json',
    };
    try {
        const response = await fetch(`${BASE_URL}/applicants/profile`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(updatedData),
        });
        if (response.ok) {
            const data = await response.json();
            console.log("Data:", data);
            mutate({...applicantProfile}); // Optimistically update the UI
            return {success: true, data: data}
        } else {
            const error = await response.json();
            console.log(`Unexpected response: ${response.status} - ${response.statusText}`);
            return {success: false, error};
        }
    } catch (error: any) {
        console.error("Error updating job post:", error);
        return {success: false, error};
    }
}



export function useEmployerFromUsername(username:string) {
    const { data, error, isLoading } = useSWR(`${BASE_URL}/companies/profile/search/username?username=${username}`, fetcher);

    return {
        Employer: data as Employer,
        isLoading,
        isError: error
    };
}


export function useApplicantFromUsername(username:string) {
    const { data, error, isLoading } = useSWR(`${BASE_URL}/applicants/profile/search/username?username=${username}`, fetcher);

    return {
        Applicant: data as Applicant,
        isLoading,
        isError: error
    };
}

// Hook to fetch the EmployerProfile and process job posts
export function useEmployer() {
    // employerId = localStorage.getItem('employerId') ? parseInt(localStorage.getItem('employerId') as string) : 0;
    const { data, error, isLoading, mutate } = useSWR(`${BASE_URL}/companies/profile`, fetcher);

    // Process job posts if data is available
    // const processedEmployerProfile = data && data.jobPosts ? {
    //     ...data,
    //     jobPosts: data.jobPosts.map((job: JobPost) => addJobAttributes(job))
    // } : data;

    return {
        EmployerProfile: data as EmployerProfile,
        isLoading,
        isError: error,
        mutate
    };
}

export async function updateEmployerProfile(updatedData: any, mutate: any, employerProfile: EmployerProfile) {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": 'application/json',
    };
    try {
        const response = await fetch(`${BASE_URL}/companies/profile`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(updatedData),
        });
        if (response.ok) {
            const data = await response.json();
            console.log("Data:", data);
            mutate({...employerProfile}); // Optimistically update the UI
            return {success: true, data: data}
        } else {
            const error = await response.json();
            console.log(`Unexpected response: ${response.status} - ${response.statusText}`);
            return {success: false, error};
        }
    } catch (error: any) {
        console.error("Error updating job post:", error);
        return {success: false, error};
    }
}

export function fetchUserProfile(id: number) {
    console.log(id);
}

export function fetchJobApplicants(id:number) {
    console.log(id);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, error, isLoading} = useSWR(`${BASE_URL}/${id}/applicants`, fetcher);
    console.log(data);
    return {
        applicants: data as Applicant,
        isLoading,
        isError: error
    };
}

export function useJobApplicants(jobId: number | null) {
    const { data, error } = useSWR(
      jobId ? `${BASE_URL}/${jobId}/applicants` : null,
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
    const { data, error, isLoading, mutate } = useSWR(`${BASE_URL}/posts/jobs/${id}`, fetcher);

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
    const { data, error, isLoading, mutate } = useSWR(`${BASE_URL}/posts/public/jobs`, fetcher);

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
    const { data, error, isLoading, mutate } = useSWR(`${BASE_URL}/companies/public`, fetcher);
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
    const response = await fetch(`${BASE_URL}/companies/profile/post`, {
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
        const response = await fetch(`${BASE_URL}/companies/profile/post/${id}`, {
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
    const response = await fetch(`${BASE_URL}/applicants/apply/${id}`, {
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
        const response = await fetch(`${BASE_URL}/metrics/impressions/${id}`, {
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


export function useEmployerJobImpressions() {
    const { data, error, isLoading } = useSWR(`${BASE_URL}/metrics/impressions/employer/total`, fetcher);

    return {
        impressions: data as Impressions,
        isLoading,
        isError: error
    };
}


export function usePostImpressions(id: number) {
    const { data, error, isLoading } = useSWR(`${BASE_URL}/metrics/impressions/${id}`, fetcher);

    return {
        impressions: data as Impressions,
        isLoading,
        isError: error
    };
}

export function useJobImpressionsByDateRange(start:Date, end:Date) {
    const { data, error, isLoading } = useSWR(`${BASE_URL}/metrics/impressions/range?start=${start}&end=${end}`, fetcher);

    return {
        impressions: data as Impressions,
        isLoading,
        isError: error
    };
}

export function useJobImpressionsBeforeDate(date:Date) {
    const { data, error, isLoading } = useSWR(`${BASE_URL}/metrics/impressions/before?date=${date}`, fetcher);

    return {
        impressions: data as Impressions,
        isLoading,
        isError: error
    };
}


export function useImpressionChartData() {
    const { data, error, isLoading } = useSWR(`${BASE_URL}/metrics/impressions/chart`, fetcher);
    return {
        impressionData: data as ImpressionsChartData[],
        isLoading,
        isError: error
    };
}

export const createNewSaveCollection = async (collectionName: string) => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": 'plain/text',
    }
    try {
        const response = await fetch(`${BASE_URL}/applicants/create-job-collection`, {
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
    const response = await fetch(`${BASE_URL}/applicants/saved-job/${listId}/${jobId}/add`, {
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
    const { data, error, isLoading } = useSWR(`${BASE_URL}/applicants/saved-jobs/collections`, fetcher);
    //returns list of savedJobCollection

    return {
        Collections: data as SavedJobCollection[],
        isLoading,
        isError: error
    };


}

export function useGetSavedJobs() {
    const { data, error, isLoading } = useSWR(
        `${BASE_URL}/applicants/profile/saved-jobs`,
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


export function useUserType() {
    const { data, error, isLoading } = useSWR(`${BASE_URL}/metrics/user-type`, fetcher);

    return {
        userType: data as UserTypeDto,
        isLoading,
        isError: error
    };
}

export function useToken() {
    return localStorage.getItem("token");
}

export function useRole() {
    return localStorage.getItem("role");
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
}

export async function addApplicantSkills(skills: string[]) {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
    for (const skill of skills) {
        const response = await fetch(`${BASE_URL}/applicants/profile/skills/add`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(skill),
        });
        if (!response.ok) {
            throw new Error(`Error saving skill: ${skill}`);
        }
        // Optionally handle the response
    }
    // Return success message or nothing
    return;
}

export function useApplicantSkills() {
    const { data, error, isLoading } = useSWR(`${BASE_URL}/applicants/profile/skills`, fetcher);

    return {
        skills: data as string[],
        isLoading,
        isError: error,
    };
}




export function useSimilarJobs() {
    const { data, error, isLoading } = useSWR(`${BASE_URL}/find/posts/jobs/salary`, fetcher);

    if (error) {
        console.error("Error fetching data:", error);
    }

    return {
        jobList: data || []
    };
}







