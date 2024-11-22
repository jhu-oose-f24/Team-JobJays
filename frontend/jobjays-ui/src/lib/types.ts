export interface Post {
    id: number;
    title: string;
    description: string;
    location: Location;
    // salary: number;
    // publish: () => void;
    // close: () => void;
}

export interface UserTypeDto {
    userType: string;
}

export interface JobPost extends Post {
    id: number;
    title: string;
    description: string;
    companyName: string;
    location: Location;
    minSalary: number;
    maxSalary: number;
    postedDate: Date;
    closedDate: Date;
    numApplicants: number;
    jobType: string; //hybrid, onsite, remote
    industry: string;
    tags: string[];
    skillsRequired: string[];
    //workTiming: "Full Time" | "Part Time" | "Internship"; //TODO change to workTiming
    workTiming: string;
    status: "Active" | "Expired";
    daysRemaining: number;

}

export interface Location {
    country: string;
    state: string;
    city: string;
}


export interface User {
    //userID: number;
    username: string;
    //email: string;
    //password: string;

}
export type UserType = Employer | Applicant; // Union type for User
export type ProfileType = EmployerProfile | ApplicantProfile; // Union type for Profile

export interface Employer extends User {
    employer_id: number;
    username: string;
    employerProfile: EmployerProfile;

}

export interface Applicant extends User {
    applicantId: number;
    username: string;
    applicantProfile: ApplicantProfile;
    photo: object[];
    //applyToJob: () => void;
    //viewAppliedJobs: () => void;
}

export interface Profile {
    //userId:number;
    name: string;
    bio: string;
    //editProfile: () => void;
}

export interface SavedJobCollection {
    id: number;
    name: string;
    jobPosts: JobPost[] ;//Set<JobPost>
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
    savedJobs: SavedJobCollection[]; //Set<SavedJobCollection>
    nationality: string;
    title: string;
    website: string;
    gender: string;
    education: string;
    dateOfBirth: Date;
    maritalStatus: string;
    experience: string;
}

export interface anonDataTrackingId {
    trackingId: string; //for tracking user session data
    //userAgent: string;
    timestamp: Date;
}

export interface TimeSpentOnPage { //time spent on a specific page
    id: anonDataTrackingId;
    state: string;
    timeSpent: number;
    page: string;

}
export interface Impressions { //amount of times your job post has been viewed
    impressionsCount: number;
    //jobPost: JobPost;

}

export interface ImpressionsChartData {
    date: Date;
    impressions: number;
}

export interface ProfileViews { //amount of times your profile has been viewed
    views: number;
    user: UserType;
}

export interface Saves { //amount of saves your job post has
    saves: number;
    jobPost: JobPost;
}

export type EmployerStats = Employer | Saves | ProfileViews | Impressions | TimeSpentOnPage; // Union type for Employer statistics


