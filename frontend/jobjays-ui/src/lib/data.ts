//Dummy Data for the application

// placeholder-data.ts

import { Post, JobPost, User, Employer, Applicant, Profile, EmployerProfile, ApplicantProfile } from './types';

// Placeholder for Post
const samplePost: Post = {
    jobID: 101,
    title: "Software Engineer",
    description: "Develop and maintain web applications.",
    location: "New York, NY",
    salary: 120000,
    publish() {
        console.log(`${this.title} has been published.`);
    },
    close() {
        console.log(`${this.title} has been closed.`);
    }
};

// Placeholder for JobPost
const sampleJobPost: JobPost = {
    ...samplePost,
    jobID: 102,
    postedDate: new Date('2024-09-01'),
    closingDate: new Date('2024-10-01'),
    employer: {
        userID: 1,
        username: "employer123",
        email: "employer123@company.com",
        password: "securepassword",
        companyID: 456,
        companyName: "Tech Corp",
        contactInfo: "contact@techcorp.com",
        profile: {} as EmployerProfile,  // Will be replaced later
        postJob() {
            console.log(`Employer ${this.companyName} posted a job.`);
        },
        viewApplications() {
            console.log(`Employer ${this.companyName} is viewing applications.`);
        }
    }
};

// Placeholder for User
const sampleUser: User = {
    userID: 2,
    username: "user123",
    email: "user123@example.com",
    password: "password123"
};

// Placeholder for Employer
const sampleEmployer: Employer = {
    userID: 3,
    username: "employer456",
    email: "employer456@business.com",
    password: "employerPass",
    companyID: 789,
    companyName: "InnovateTech",
    contactInfo: "info@innovatetech.com",
    profile: {} as EmployerProfile,  // Will be replaced later
    postJob() {
        console.log(`Employer ${this.companyName} posted a job.`);
    },
    viewApplications() {
        console.log(`Employer ${this.companyName} viewed applications.`);
    }
};

// Placeholder for Applicant
const sampleApplicant: Applicant = {
    userID: 4,
    username: "applicant123",
    email: "applicant123@gmail.com",
    password: "applicantPass",
    applicantId: 987,
    resume: "https://resume.com/applicant123.pdf",
    profile: {} as ApplicantProfile,  // Will be replaced later
    applyToJob() {
        console.log(`Applicant ${this.username} applied to a job.`);
    },
    viewAppliedJobs() {
        console.log(`Applicant ${this.username} viewed applied jobs.`);
    }
};

// Placeholder for Profile
const sampleProfile: Profile = {
    profileID: 101,
    user: sampleUser,
    name: "John Doe",
    bio: "A passionate software developer.",
    editProfile() {
        console.log(`${this.name} edited their profile.`);
    }
};

// Placeholder for EmployerProfile
const sampleEmployerProfile: EmployerProfile = {
    ...sampleProfile,
    jobPosts: [sampleJobPost],
    manageJobPosts() {
        console.log(`Employer ${this.name} is managing job posts.`);
    }
};

// Placeholder for ApplicantProfile
const sampleApplicantProfile: ApplicantProfile = {
    ...sampleProfile,
    appliedJobs: [sampleJobPost],
    trackApplications() {
        console.log(`${this.name} is tracking their applications.`);
    }
};

// Assign profiles to Employer and Applicant objects
sampleEmployer.profile = sampleEmployerProfile;
sampleApplicant.profile = sampleApplicantProfile;

// Exporting the placeholders
export {
    samplePost,
    sampleJobPost,
    sampleUser,
    sampleEmployer,
    sampleApplicant,
    sampleProfile,
    sampleEmployerProfile,
    sampleApplicantProfile
};
