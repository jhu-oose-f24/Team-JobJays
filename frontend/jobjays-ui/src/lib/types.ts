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


export interface User {
    userID: number;
    username: string;
    //email: string;
    //password: string;

}
export type UserType = Employer | Applicant; // Union type for User
export type ProfileType = EmployerProfile | ApplicantProfile; // Union type for Profile

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
    //trackApplications: () => void;
}

export interface anonDataTrackingId {
    trackingId: string;
    userAgent: string;
    timestamp: Date;
}

export interface TimeSpentOnPage { //time spent on a specific page
    id: anonDataTrackingId;
    timeSpent: number;
    page: string;

}
export interface Impressions { //amount of times your job post has been viewed
    id: anonDataTrackingId;
    impressions: number;
    jobPost: JobPost;

}

export interface ProfileViews { //amount of times your profile has been viewed
    id: anonDataTrackingId;
    views: number;
    user: UserType;
}

export interface Saves { //amount of saves your job post has
    id: anonDataTrackingId;
    saves: number;
    jobPost: JobPost;
}

export type EmployerStats = Employer | Saves | ProfileViews | Impressions | TimeSpentOnPage; // Union type for Employer statistics


