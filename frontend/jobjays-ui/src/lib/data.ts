// // //Dummy Data for the application
// //
// // // placeholder-data.ts
// //
// // import { Post, JobPost, User, JobListing, Employer, Applicant, Profile, EmployerProfile, ApplicantProfile } from './types';
// //
// // // Placeholder for Post
// // const samplePost: Post = {
// //     id: 101,
// //     title: "Software Engineer",
// //     description: "Develop and maintain web applications.",
// //     location: "New York, NY",
// //     salary: 120000,
// //     publish() {
// //         console.log(`${this.title} has been published.`);
// //     },
// //     close() {
// //         console.log(`${this.title} has been closed.`);
// //     }
// // };
// //
// // const sampleJobListing: { jobID: number; location: string; title: string; type: string; salary: number } = {
// //     jobID: 101,
// //     title: "Product Manager",
// //     type: "Full Time",
// //     location: "New York, NY",
// //     salary: 230000
// // };
// //
// // const sampleJobListingB: { jobID: number; location: string; title: string; type: string; salary: number } = {
// //     jobID: 101,
// //     title: "Marketing Manager",
// //     type: "Part Time",
// //     location: "New York, NY",
// //     salary: 708000
// // };
// //
// // const sampleJobListingC: { jobID: number; location: string; title: string; type: string; salary: number } = {
// //     jobID: 101,
// //     title: "Software Engineer",
// //     type: "Internship",
// //     location: "San Francisco, CA",
// //     salary: 4000
// // };
// //
// //
// // // Placeholder for JobPost
// // // @ts-ignore
// // const sampleJobPost: JobPost = {
// //     ...samplePost,
// //     jobID: 102,
// //     postedDate: new Date('2024-09-01'),
// //     closingDate: new Date('2024-10-01'),
// //     employer: {
// //         userID: 1,
// //         username: "employer123",
// //         email: "employer123@company.com",
// //         password: "securepassword",
// //         companyName: "Tech Corp",
// //         contactInfo: "contact@techcorp.com",
// //         profile: {} as EmployerProfile,  // Will be replaced later
// //         postJob() {
// //             console.log(`Employer ${this.companyName} posted a job.`);
// //         },
// //         viewApplications() {
// //             console.log(`Employer ${this.companyName} is viewing applications.`);
// //         }
// //     }
// // };
// //
// // // Placeholder for User
// // const sampleUser: User = {
// //     userID: 2,
// //     username: "user123",
// //     email: "user123@example.com",
// //     password: "password123"
// // };
// //
// // // Placeholder for Employer
// // const sampleEmployer: Employer = {
// //     userID: 3,
// //     username: "employer456",
// //     email: "employer456@business.com",
// //     password: "employerPass",
// //     companyName: "InnovateTech",
// //     contactInfo: "info@innovatetech.com",
// //     profile: {} as EmployerProfile,  // Will be replaced later
// //     postJob() {
// //         console.log(`Employer ${this.companyName} posted a job.`);
// //     },
// //     viewApplications() {
// //         console.log(`Employer ${this.companyName} viewed applications.`);
// //     }
// // };
// //
// // // Placeholder for Applicant
// // const sampleApplicant: Applicant = {
// //     userID: 4,
// //     username: "applicant123",
// //     email: "applicant123@gmail.com",
// //     password: "applicantPass",
// //     applicantId: 987,
// //     resume: "https://resume.com/applicant123.pdf",
// //     profile: {} as ApplicantProfile,  // Will be replaced later
// //     applyToJob() {
// //         console.log(`Applicant ${this.username} applied to a job.`);
// //     },
// //     viewAppliedJobs() {
// //         console.log(`Applicant ${this.username} viewed applied jobs.`);
// //     }
// // };
// //
// // // Placeholder for Profile
// // const sampleProfile: Profile = {
// //     profileID: 101,
// //     user: sampleUser,
// //     name: "John Doe",
// //     bio: "A passionate software developer.",
// //     editProfile() {
// //         console.log(`${this.name} edited their profile.`);
// //     }
// // };
// //
// // // Placeholder for EmployerProfile
// // const sampleEmployerProfile: {
// //     jobPosts: JobPost[];
// //     editProfile: () => void;
// //     manageJobPosts(): void;
// //     profileID: number;
// //     name: string;
// //     bio: string;
// //     user: User
// // } = {
// //     ...sampleProfile,
// //     jobPosts: [sampleJobPost],
// //
// //     manageJobPosts() {
// //         console.log(`Employer ${this.name} is managing job posts.`);
// //     }
// // };
// //
// // // Placeholder for ApplicantProfile
// // const sampleApplicantProfile: ApplicantProfile = {
// //     ...sampleProfile,
// //     appliedJobs: [sampleJobPost],
// //     savedJobs: [sampleJobPost]
// //     // trackApplications() {
// //     //     console.log(`${this.name} is tracking their applications.`);
// //     // }
// // };
// //
// // // Assign profiles to Employer and Applicant objects
// // sampleEmployer.profile = <EmployerProfile>sampleEmployerProfile;
// // sampleApplicant.profile = sampleApplicantProfile;
// //
// // // Exporting the placeholders
// // export {
// //     samplePost,
// //     sampleJobListing,
// //     sampleJobListingB,
// //     sampleJobListingC,
// //     sampleJobPost,
// //     sampleUser,
// //     sampleEmployer,
// //     sampleApplicant,
// //     sampleProfile,
// //     sampleEmployerProfile,
// //     sampleApplicantProfile
// // };
// // dummyData.ts
//
// import {
//     JobPost, Location, Employer, Applicant,
//     SavedJobCollection, EmployerProfile, ApplicantProfile,
//     anonDataTrackingId, TimeSpentOnPage, Impressions,
//     ProfileViews, Saves, EmployerStats
// } from './types';
//
//
// // Dummy Locations
// const location1: Location = { country: "USA", state: "California", city: "Los Angeles" };
// const location2: Location = { country: "Canada", state: "Ontario", city: "Toronto" };
// const location3: Location = { country: "UK", state: "England", city: "London" };
//
//
//
// // Dummy JobPosts
// const jobPost1: JobPost = {
//     id: 1,
//     title: "Full-Stack Developer",
//     description: "Build and maintain web applications",
//     companyName: "Tech Corp",
//     location: location1,
//     minSalary: 70000,
//     maxSalary: 90000,
//     postedDate: new Date(),
//     closedDate: new Date(),
//     numApplicants: 20,
//     jobType: "Hybrid",
//     industry: "Technology",
//     tags: ["JavaScript", "React", "Node.js"],
//     skillsRequired: ["JavaScript", "HTML", "CSS"],
//     workTiming: "Full Time",
//     status: "Active",
//     daysRemaining: 30
// };
// const jobPost2: JobPost = {
//     id: 2,
//     title: "Data Engineer",
//     description: "Create data pipelines",
//     companyName: "DataWorks",
//     location: location2,
//     minSalary: 80000,
//     maxSalary: 120000,
//     postedDate: new Date(),
//     closedDate: new Date(),
//     numApplicants: 35,
//     jobType: "Remote",
//     industry: "Data",
//     tags: ["SQL", "ETL", "Python"],
//     skillsRequired: ["SQL", "Python", "Data Warehousing"],
//     workTiming: "Full Time",
//     status: "Active",
//     daysRemaining: 25
// };
// const jobPost3: JobPost = {
//     id: 3,
//     title: "UX Designer",
//     description: "Design user interfaces",
//     companyName: "Creative Solutions",
//     location: location3,
//     minSalary: 60000,
//     maxSalary: 85000,
//     postedDate: new Date(),
//     closedDate: new Date(),
//     numApplicants: 15,
//     jobType: "Onsite",
//     industry: "Design",
//     tags: ["Sketch", "Figma", "Prototyping"],
//     skillsRequired: ["Figma", "Sketch", "Wireframing"],
//     workTiming: "Full Time",
//     status: "Active",
//     daysRemaining: 40,
//
// };
// export const jobPosts: JobPost[] = [jobPost1, jobPost2, jobPost3];
//
//
//
// // Dummy Employers
// const employerProfile1: EmployerProfile = { name: "John's Tech", bio: "Tech leader", jobPostsSize: 5, jobPosts: [jobPost1] };
// const employerProfile2: EmployerProfile = { name: "Data Hub", bio: "Leading data firm", jobPostsSize: 8, jobPosts: [jobPost2] };
// const employerProfile3: EmployerProfile = { name: "Design Pro", bio: "Creative design agency", jobPostsSize: 3, jobPosts: [jobPost3] };
// const employer1: Employer = { employer_id: 1, username: "tech_guru", employerProfile: employerProfile1 };
// const employer2: Employer = { employer_id: 2, username: "data_master", employerProfile: employerProfile2 };
// const employer3: Employer = { employer_id: 3, username: "design_leader", employerProfile: employerProfile3 };
// export const employers: Employer[] = [employer1, employer2, employer3];
//
// // Dummy Applicants
// const applicantProfile1: ApplicantProfile = {
//     name: "Alice",
//     bio: "Aspiring developer",
//     appliedJobs: [jobPost1],
//     savedJobs: [],
//     nationality: "USA",
//     title: "Junior Developer",
//     website: "alice.dev",
//     gender: "Female",
//     education: "B.Sc. Computer Science",
//     dateOfBirth: new Date("1995-06-15"),
//     maritalStatus: "Single",
//     experience: "2 years"
// };
// const applicantProfile2: ApplicantProfile = {
//     name: "Bob",
//     bio: "Data enthusiast",
//     appliedJobs: [jobPost2],
//     savedJobs: [],
//     nationality: "Canada",
//     title: "Data Analyst",
//     website: "bobdata.com",
//     gender: "Male",
//     education: "M.Sc. Data Science",
//     dateOfBirth: new Date("1992-03-10"),
//     maritalStatus: "Married",
//     experience: "4 years"
// };
// const applicantProfile3: ApplicantProfile = {
//     name: "Clara",
//     bio: "UX designer",
//     appliedJobs: [jobPost3],
//     savedJobs: [],
//     nationality: "UK",
//     title: "UX Designer",
//     website: "claradesign.com",
//     gender: "Non-binary",
//     education: "B.A. Design",
//     dateOfBirth: new Date("1998-11-22"),
//     maritalStatus: "Single",
//     experience: "1 year"
// };
// const applicant1: Applicant = { applicantId: 1, username: "alice_dev", applicantProfile: applicantProfile1, photo: [] };
// const applicant2: Applicant = { applicantId: 2, username: "bob_analytics", applicantProfile: applicantProfile2, photo: [] };
// const applicant3: Applicant = { applicantId: 3, username: "clara_ui", applicantProfile: applicantProfile3, photo: [] };
// export const applicants: Applicant[] = [applicant1, applicant2, applicant3];
//
// // Dummy SavedJobCollections
// const savedJobCollection1: SavedJobCollection = { id: 1, name: "Development Roles", jobPosts: [jobPost1] };
// const savedJobCollection2: SavedJobCollection = { id: 2, name: "Data Science Jobs", jobPosts: [jobPost2] };
// const savedJobCollection3: SavedJobCollection = { id: 3, name: "Design Opportunities", jobPosts: [jobPost3] };
// export const savedJobCollections: SavedJobCollection[] = [savedJobCollection1, savedJobCollection2, savedJobCollection3];
//
// // Dummy anonDataTrackingIds
// const anonTrackingId1: anonDataTrackingId = { trackingId: "12345", timestamp: new Date() };
// const anonTrackingId2: anonDataTrackingId = { trackingId: "67890", timestamp: new Date() };
// const anonTrackingId3: anonDataTrackingId = { trackingId: "11223", timestamp: new Date() };
// export const anonTrackingIds: anonDataTrackingId[] = [anonTrackingId1, anonTrackingId2, anonTrackingId3];
//
// // Dummy TimeSpentOnPages
// const timeSpent1: TimeSpentOnPage = { id: anonTrackingId1, state: "Active", timeSpent: 120, page: "/job/1" };
// const timeSpent2: TimeSpentOnPage = { id: anonTrackingId2, state: "Active", timeSpent: 300, page: "/job/2" };
// const timeSpent3: TimeSpentOnPage = { id: anonTrackingId3, state: "Active", timeSpent: 50, page: "/job/3" };
// export const timeSpentRecords: TimeSpentOnPage[] = [timeSpent1, timeSpent2, timeSpent3];
//
// // Dummy Impressions
// const impression1: Impressions = { impressions: 100 };
// const impression2: Impressions = { impressions: 200 };
// const impression3: Impressions = { impressions: 50 };
// export const impressions: Impressions[] = [impression1, impression2, impression3];
//
// // Dummy ProfileViews
// const profileView1: ProfileViews = { views: 150, user: employer1 };
// const profileView2: ProfileViews = { views: 300, user: applicant2 };
// const profileView3: ProfileViews = { views: 100, user: employer3 };
// export const profileViews: ProfileViews[] = [profileView1, profileView2, profileView3];
//
// // Dummy Saves
// const save1: Saves = { saves: 25, jobPost: jobPost1 };
// const save2: Saves = { saves: 40, jobPost: jobPost2 };
// const save3: Saves = { saves: 15, jobPost: jobPost3 };
// export const saves: Saves[] = [save1, save2, save3];
//
// // Dummy EmployerStats
// const employerStat1: EmployerStats = employer1;
// const employerStat2: EmployerStats = save2;
// const employerStat3: EmployerStats = profileView3;
// export const employerStats: EmployerStats[] = [employerStat1, employerStat2, employerStat3];
//
//
//
