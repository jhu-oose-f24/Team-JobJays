export interface Post {
    id: number;
    title: string;
    description: string;
    location: Location;
    salary: number;
    publish: () => void;
    close: () => void;
}

export interface JobListing extends Post {
    id: number;
    companyName: string;
    title: string;
    description: string;
    location: Location;
    salary: number;
    type: "Full Time" | "Part Time" | "Internship";
    status: "Active" | "Expired";
    postedDate: Date;
    closingDate: Date;
    applications: number;
    daysRemaining: number;
}

export interface JobPost extends Post {
    id: number;
    title: string;
    description: string;
    companyName: string
    location: Location;
    minSalary: number;
    maxSalary: number;
    postedDate: Date;
    closedDate: Date;
    numApplicants: number;
    daysRemaining: number;
    type: "Full Time" | "Part Time" | "Internship";
    status: "Active" | "Expired";

}

export interface Location {
    country: string;
    state: string;
    city: string;
}

 // export interface JobPost extends Post {
 //     jobID: number;
 //     postedDate: Date;
 //     closingDate: Date;
 //     employer: Employer;
 // }

export interface User {
    userID: number;
    username: string;
    //email: string;
    //password: string;

}

export interface Employer extends User {
    //TODO commented out fields are not implemented
    employer_id: number;
    username: string;
    employerProfile: EmployerProfile;
    //postJob: () => void;
    //viewApplications: () => void;

}

export interface Applicant extends User {
    applicantId: number;
    username: string;
    applicantProfile: ApplicantProfile;
    //applyToJob: () => void;
    //viewAppliedJobs: () => void;
}

export interface Profile {
    //userId:number;
    name: string;
    bio: string;
    //editProfile: () => void;
}

export interface EmployerProfile extends Profile {
    name: string;
    bio: string;
    jobPostsSize: number;
    jobPosts: JobPost[];
    //manageJobPosts: () => void;
}

export interface ApplicantProfile extends Profile {
    //userId:number;
    name:string;
    bio: string;
    appliedJobs: JobPost[];
    savedJobs: JobPost[];
    //trackApplications: () => void;
}



