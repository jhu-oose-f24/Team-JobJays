export interface Post {
    jobID: number;
    title: string;
    description: string;
    location: string;
    salary: number;
    publish: () => void;
    close: () => void;
}

export interface JobPost extends Post {
    jobID: number;
    postedDate: Date;
    closingDate: Date;
    employer: Employer;
}

export interface User {
    userID: number;
    username: string;
    email: string;
    password: string;

}

export interface Employer extends User {
    companyID: number;
    companyName: string;
    contactInfo: string;
    profile: EmployerProfile
    postJob: () => void;
    viewApplications: () => void;

}

export interface Applicant extends User {
    applicantId: number;
    resume: string;
    profile: ApplicantProfile;
    applyToJob: () => void;
    viewAppliedJobs: () => void;
}

export interface Profile {
    profileID: number;
    user: User;
    firstName: string;
    lastName: string;
    bio: string;
    editProfile: () => void;
}

export interface EmployerProfile extends Profile {
    jobPosts: JobPost[];
    manageJobPosts: () => void;
}

export interface ApplicantProfile extends Profile {
    appliedJobs: JobPost[];
    trackApplications: () => void;
}



