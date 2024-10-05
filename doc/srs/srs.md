## Problem Statement
Job seekers face challenges in finding relevant job openings due to overwhelming listings and limited search tools, while employers struggle to reach qualified candidates efficiently. The lack of personalized notifications causes candidates to miss opportunities, and filtering options are often inadequate for refining searches. Employers also encounter difficulties managing and tracking applications, which slows down the hiring process. Additionally, both parties require secure authentication and data protection to ensure privacy and trust in the platform.

## Potential Clients
- New grads
- Jobseekers
- Recruiters

## Proposed Solution 
The proposed solution is to develop a web application that connects job seekers and employers in a more efficient and personalized way. This platform will offer advanced filters and personalized job recommendations based on user profiles which allows users to find relevant job opportunities more efficiently. And also offers users to get timely notifications for new opportunities. For employers, the platform will provide tools to create and post jobs, efficiently manage applications, and communicate with candidates. Employers can also use advanced filters to find suitable candidates, schedule interviews, and track the hiring process.

## Functional Requirements

## Must Have
- As a user looking for a job, I want to be able to create a user profile so that I can see opportunities that are tailored to me and my preferences. This would include user registration and authentication. 
- As a user of this app, I want to be able to go through account registration, so that I can interact with the application.
- As a user of this app, I want to be able to go through account authentication so that I can feel protected from other users. 
- As a user looking for a job, I want to be able to edit my user profile so that I can freely update my preferences if they were to change in the future. (Update time could be a non-functional requirement.)
- As an employer, I want to be able to view user profiles so that I can find qualified candidates for my company/role(s). 
- As an employer, I want to be able to post jobs so that new roles from my company can be exposed to a wider audience.
- As an employer, I want any jobs posted to be automatically removed after the application deadline has passed so that we don’t get any late applications. 
- As an employer, I want to be able to edit jobs that have been posted so that any changes to the job requirements and/or description can be updated if needed.
- As an employer, I want to be able to utilize a smart search so that I can search for ideal candidates for the roles that I have posted. 
- As a jobseeker, I want to be able to utilize a smart search so that I can search for opportunities that best align with the information on my profile.
- As a user looking for a job, I want to be able to view jobs from various employers with the option of using filters so that I can freely apply to new opportunities. 
- As a user looking for a job, I want to receive notifications (via email potentially) from certain companies/jobs so that I can feel less overwhelmed when searching for opportunities that are right for me.
- As an employer, I want to receive notifications (via email potentially) about users that can be a good fit for the non-expired, opportunities I’ve posted.
- As an employer, I want any user to go through channel(s) of authentication, so my company does not have to deal with bot applications and instead focus on candidates that are truly interested in working here. Similarly, as a jobseeker, I want any employer to go through channel(s) of authentication, so I can ensure my safety.
- As a user looking for a job, I want to be able to upload files such as my resume, so employers can have a closer look at my skillsets and experience.

## Nice to Have
- As a user looking for a job, I want to be able to research different companies (Company A, B, & C) and using artificial intelligence, receive a suggestion as to which would be best for me so that I can narrow down the opportunities available to me. 
- As an employer, I want to be able to directly message users so that I can interact with those who are a good fit and encourage them to apply to the opportunities we have available. 
- As an employer, I want to be able to see an activity log for jobseekers so I can learn more about things they do that won't necessarily be found on a resume. 
- As a jobseeker, I want to be able to see who views my user profile so I can get a sense of which companies are interested in me. 

## Non-functional Requirements
- The app interface should be user-friendly and only require a maximum of 5 minutes for a new user to fully adjust and navigate. This includes completing essential tasks such as registering, editing their profile, and searching for jobs without confusion.
- The system should be available at all times to ensure that users, whether they are employers or job seekers, do not experience any interruptions in their user experience. A downtime of no more than 43 minutes per month (99.9% uptime) will be tolerated, and real-time monitoring will ensure that any issues are identified and addressed quickly.
- After a user updates their profile, the system will take no longer than three days to send tailored notifications based on the new preferences. Notifications will be sent out every three days to ensure users stay updated about new opportunities that match their updated criteria.

## Software Architecture & Technology Stack
- The application will be a web app for now, and if time permits, we will try to expand to mobile. 
- In terms of software architecture, we will try to follow a microservices approach (over HTTP and Kafka).
- Frontend: Next.js
- Backend: Spring Boot
- Database: PostgreSQL
- Authentication: JWT (Spring Security)
- Notifications: Twilio or SendGrid
- Containerization: Docker + Docker Compose
- CI/CD: GitHub Actions or GitLab CI
- Hosting: AWS EC2 (for apps), AWS S3 (for static files) (if time allows)

## Similar Apps
- LinkedIn. 
- Indeed
- Handshake
- Glassdoor

## How we're different
The main way we will separate ourselves from other applications is by having a personalized internship page for students. The similar apps mentioned above leave students overwhelmed with full-time positions and forces them to instead resort to other avenues like spreadsheets with internship positions or flyers. We will specifically tailor to students looking for internships by having a place where they can easily find opportunities for them.  
