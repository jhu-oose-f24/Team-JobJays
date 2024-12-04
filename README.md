# Software Summary
This is a web application that allows Johns Hopkins students to find the perfect opportunity. Users can search based on titles, employers and more. And with our unqiue use of artificial intelligence, you can even get receive advice whenever you’re searching for opportunities. On the other hand, JobJays gives employers a user-friendly way to post opportunities and view possible candidates that would make a good fit.
# Team Members
- Ahmed Hashi
- Enoch Appiah
- Murad Azimzada
- Samuel Muzac
- Jiaxuan “Gavin” Luo
- Xinyang “Loren” Li
# Iteration 1
For this iteration, the main features we focused on were all thing related to jobs (creating, editing, searching) and being able to create users whether that be for a jobseeker or employer. All the necessary backend work for those user stories has been implemented and tested to ensure functionality. As seen in class, various front-end pages have been implemented but still need polishing, as we split up the work and want to get together once more to ensure that the entire UI follows a core theme regardless of the page. Once that is done, we will start the backend integration, which will be a task we plan on completing in iteration 2. Besides these deliverables, we also spent time setting up all the architecture we needed, such as Spring Boot, Next.js, our PostgreSQL database, and more. We made sure to communicate with each other on which specific tools we wanted to use (e.g Maven vs Gradle) before we moved any further. Moreover, we made sure to leave time for debugging and adjustments as this is a new experience for some on the team.
We also made good use of Github to facilitate project planning. We would get together and split up the different work that was left.
Our team did some more work on the UML diagrams during this iteration as well. We went through various drafts to see what’s working and what isn’t. We feel that it can still change but the one titled ‘class_diagram.mermaid’

# Iteration 2
For this iteration, we focused on integration and fleshing out some of our features. A point of feedback from Iteration 1 was the absence of integration of the frontend to the backend, so we went back and made our web application useable. We made it possible to go to each feature we started implementing from the home page and a way to return back home. 
We implemented a basic use of our search feature so that if the user searches for an employer, every employer with the letter/sequence of letters will be pulled from the database and listed for the users view. We also implemented User autenthication and the ability for a user to signup for an account on our application. The signup button transitions the user to a page where they can fill out their information to create their user profile. If the user happens to already have an account they can login into their account (by pressing Login they're transported to a page where they can input their details). The Post a job button now allows for the user (employer) to post a job for their company profile that the appicant user can view. Each job that is posted can also be edited, so the Job details can be changed. 

We implemented a notification system using Kafka for handling message queues and streams. The system is designed to notify users about relevant job matches and updates. Here's how we approached it:

Kafka Topics: We set up Kafka topics for managing different types of notifications:
applicant_preferences: This topic stores user preferences for job search criteria, such as industry, job type, and location.
new_jobs: New job postings are sent to this topic, which triggers the matching algorithm.
job_notifications: This topic handles the notifications sent to applicants based on job matches.
preference_update_requests: This topic processes requests to update user preferences.
Streams and Matching:

A Kafka Stream processes incoming job postings from the new_jobs topic and matches them against stored applicant preferences from applicant_preferences.
The matching algorithm tokenizes job descriptions and applicant preferences, scoring them based on relevance. Scoring factors include:
Industry match
Job title similarity
Salary range
Jobs with scores above a certain threshold are considered good matches and sent to the job_notifications topic.
Scoring Algorithm:
The scoring algorithm assigns weights to different factors like industry (most significant), job title, and salary preferences. A job is considered a match if it scores above 13 out of 20.
Notification Sending:

The notification_sender service subscribes to the job_notifications topic and sends out notifications (email) based on the user’s preference.
This basic setup ensures that relevant job matches are pushed to users in near real-time, but additional logging and performance improvements will be implemented in the next iteration. For future iterations, we will also optimize the scoring algorithm and improve the Kafka Streams handling to make the system more robust and scalable.  

Finally we started the implementation of our chatbot. Since the bot is still in the development process it hasn't been fully integreated but can be accessed through localhost:3000/advice. The user is able to speak to the bot where they recieve a response in real time. 
For the following iteration we plan to make sure the applicant and the employer/company users have different levels of access to prevent companies and users from accessing each others' data. 

User authentication:
When user registered an account, they will receive an mail to validate their account. Once they click the link in the email ,they can log in to the job system.
Besides, after login, we will store the login info in the session, so that users can do some thing like editing their own profile and uploading their resumes, while other applicants cannot have permission.

# Iteration 3
For this iteration, we added new features, enhanced other larger features, and fixed some errors. 

For one, we added more to our chatbot feature so that: 

- (1) users can get basic job advice with questions like "What is a resume?" and "What are some helpful tips to write a good resume?" This feature is well-suited for anyone, but especially those new to the job search process and who are looking for some basic, reliable guidance. 
- (2) users can start to leverage their own profile (such as experiences, preference) and saved jobs to receive advice from the chatbot. This involved lots of prompt engineering to find which prompts yield the best results and more research will be done in the next iteration to further advance this. A good question to ask is "Based on my profile, which of my saved jobs would be best suited for me?". In the next iteration, hopefully, once the login functionality is fleshed out, we can further make it more personalized. 

Also, in this iteration, as stated in the directions, we aimed to complete all of the "must have" features. The biggest outstanding feature we needed to start and finish was applying to jobs. We were able to add this functionality along with being able to view applicants (/view-applicants/[id]). We also implemented the feature for applicants to save jobs that they may be interested in and would like to come back to or that they would like the chatbot to easily reference. We also implemented a feature that tracks the views of a job post so that an emplouyer can see the impressions that their job posts have had.

We also got ahead on the next iteration and began to work on polishing the UI. This task will continued to be worked on for the next iteration so we can ensure we have a great looking, cohesive application. 

We also made changes to our UML diagram to mimic the state of our application at this point, which you can find in: ‘class_diagram.mermaid’ 


# Iteration 4

For this iteration, we focused on key milestones that brought the project closer to becoming a fully functional and secure platform. One of the primary achievements was the successful deployment of the frontend on Vercel, ensuring that users could interact with the platform in a live, production-ready environment. To enhance the security of the platform, we implemented JWT-based (JSON Web Token) authentication for both employers and applicants. This allowed us to securely manage user sessions and protect sensitive information while enabling secure access to various features. With JWT in place, all API endpoints are now secured, ensuring that only authorized users can perform specific actions or retrieve data.

Another critical area of focus was improving the user interface (UI) for both applicants and employers. We worked on making the UI not only visually appealing but also highly intuitive, ensuring that users could navigate the platform effortlessly and have a positive experience. Additionally, we finalized and thoroughly tested the login functionality, ensuring that users could log in seamlessly without encountering any glitches or errors.

On the backend side, we successfully deployed the core backend systems, ensuring that the necessary infrastructure was in place to support the frontend and upcoming features. While functional, we identified some areas for improvement in the backend, which we aim to address in the next iteration. Overall, Iteration 4 was a significant step forward, focusing on both functionality and security to deliver a robust and user-friendly experience.

# Iteration 5

Building on the solid foundation laid in Iteration 4, this phase was dedicated to adding new features, improving existing functionalities, and further optimizing the platform. One of the most exciting additions during this iteration was the Resume Upload feature. This feature allows applicants to easily upload their resumes directly to the platform, simplifying the application process for jobs. With this enhancement, applicants now have a more streamlined and convenient way to showcase their qualifications to potential employers.

We also introduced the Impressions feature, designed to boost user engagement by allowing applicants and employers to interact with the platform in more dynamic ways. This feature adds depth to the user experience, making the platform more engaging and interactive.

On the technical side, we addressed and resolved critical issues related to the notification URL in the production environment, ensuring that users now receive notifications reliably and on time. This fix was essential to maintaining effective communication between the platform and its users.

Additionally, we made significant progress in automating and streamlining development workflows. Continuous Integration (CI) pipelines were implemented to automatically build the application on every push request, ensuring that code changes are tested and validated without manual intervention. For Continuous Deployment (CD), we configured the system to use Action Runner, enabling automatic updates to Docker containers after every merge. This has greatly improved the efficiency and reliability of the deployment process.

Work in Progress:
We began work on the Application feature, which is designed to allow applicants to monitor the status of their job applications. This feature is being developed to provide real-time insights into the progress of submitted applications, empowering users to track their job-seeking efforts more effectively. While still a work in progress, this feature is a top priority and will continue to be developed and refined in the next iteration.

### Running services

Please refer this file (https://github.com/jhu-oose-f24/Team-JobJays/blob/main/how_to_run_services_for_testing.md).

# Miscellaneous
## How Preference, JobMatching Services works(video explanation) - 
(https://drive.google.com/file/d/1K8zL4N61aZ6ESc-EVxIhXuNwvQRUu8E2/view?usp=sharing)
