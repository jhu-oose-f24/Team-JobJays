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
Our team did some more work on the UML diagrams during this iteration as well. We went through various drafts to see what’s working and what isn’t. We feel that it can still change but the one titled ‘class-uml.svg’

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

#TODO: Add more for user authentication

# Running the Application

## Backend
Springboot 3.3.4
JDK 22
Java 17
Maven 3.9.8
Make sure you have these installed on your machine before running the application.
To run the backend, navigate to the `backend` directory and run the following command:

```mvn spring-boot:run```

It should be running on port 8080

## Frontend
run the commands:
```pnpm install```
```pnpm dev```

then navigate to `http://localhost:3000` to view the application.
