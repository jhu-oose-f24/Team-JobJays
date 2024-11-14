# Team JobJays

Springboot 3.3.4
JDK 22
Java 17
Maven 3.9.8
Cloud:AWS

I use the bookapp to start the wholeproject.
Don't worry, the project name and direction is correct. I just use the bookWebApp to validate my setup.
## How to Run the Application

### Step 1: Download the zip file and unzip it
Once you unzip it, you can get a java project.

### Step 2: make sure the POSTGRES SQL is running
I use the AWS cloud which IP is 18.117.70.215.
Make sure the postgres is running.


### Step 3: Run the Application
just run the application.


### Step 4: Access the Application
(you can modify the port in application.properties)
Open your browser and go to:http://localhost:8080/

### Step 5: Test the Application
1.Add a Book: Enter the book details and click "Add Book."
2.View Books: All books will be listed on the same page.

The final result like the image below:
![img_1.png](img_1.png)

### Running Backend Microservices Services on Windows, Mac, and Linux

This project contains multiple microservices that need to be run simultaneously. We've provided simple batch and shell scripts to streamline this process for both Windows and Mac/Linux environments.

#### Prerequisites:
- **Java** and **Gradle** installed and configured.
- Ensure `gradlew.bat` (Windows) and `gradlew` (Mac/Linux) are available in each service directory.

#### Services to be run:
- `applicant_job_matcher`
- `employer_applicant_recommendation`
- `notification_logger`
- `notification_sender`
- `preference_updater`

---

### For **Windows** Users

#### Steps to Run All Services:

1. **Navigate to the Backend Folder**  
   Open **Command Prompt** and navigate to the `backend` directory:
   ```batch
   cd path\to\your\backend
   ```

2. **Run the Windows Script**  
   Run the provided `run-services.bat` script to start all services:
   ```batch
   run-services.bat
   ```

   The script will:
    - Change directory into each service folder.
    - Execute `gradlew.bat run` to start the service.

3. **Verify the Services**  
   After running, check the logs to verify that all services have started successfully.

---

### For **Mac/Linux** Users

#### Steps to Run All Services:

1. **Open Terminal**  
   Navigate to the `backend` directory:
   ```bash
   cd /backend (ignore this step if you are already in the backend directory)
   ```

2. **Run the Mac/Linux Script**  
   Run the provided `run-services.sh` script to start all services:
   ```bash
   ./run-services.sh
   ```

   The script will:
    - Change directory into each service folder.
    - Execute `./gradlew run` to start the service.

3. **Verify the Services**  
   After running, check the logs to verify that all services have started successfully.

---

#### Additional Notes:
- Ensure each service has its `gradlew.bat` or `gradlew` file depending on the operating system.
- If any service fails to start, the script will stop, and an error message will be displayed.

