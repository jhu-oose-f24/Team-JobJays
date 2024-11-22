# Instructions for Running the Whole App

**NOTE:** You will need to go over these steps one by one sequentially and read them carefully to avoid possible frustration.

We recommend running the frontend on your local machine (Mac, PC, Linux) as the backend requires high computational resources. If you do that, you will send HTTP requests to a remote server and wait for a response—also, some network issues could arise due to the IP difference; in that case, please contact us for help.

We have one main and public API service that runs on port 8080, and other helper microservices such as `applicant-job-matcher`, `preference-updater`, and `notification-sender` that use up memory and CPU as well. Helper microservices are dependent on the Kafka communication protocol, which means in order to run them successfully, you will need a running Kafka server (we prefer running it in Zookeeper mode, which is accepted as industry standard to make the message transport reliable and monitorable).

## Run Only Frontend Locally

The app is built on top of the NEXT.JS framework, and the package manager library is `pnpm`. Make sure API calls are made to the Remote Server.

### Step 1:

Clone the repository:

```bash
git clone https://github.com/jhu-oose-f24/Team-JobJays.git
```

### Step 2:

Go to the frontend directory in the `Team-JobJays` folder:

```bash
cd frontend/jobjays-ui
```

### Step 3:

Install dependencies:

```bash
pnpm i
```

### Step 4:

Build the project:

```bash
pnpm build
```

### Step 5:

Start the app:

```bash
pnpm start
```

### Step 6:

Open the project in a browser:

```
http://localhost:3000
```

## Database

You can use your own database instance—we'd recommend a Docker image—or you can install the PostgreSQL server itself. We will provide the Docker version; you can refer to the PostgreSQL main site for more information.

Your decision needs to be mirrored on the backend—if you want to call your local database, then you will need to change `application.properties` to make this change.

### Run PostgreSQL Docker Image

Refer to the Docker documentation or the PostgreSQL Docker image instructions to set up the database container.

## Connect to Cloud

You can test the connection via terminal, DataGrip, or similar tools.

- **Host:** 74.179.58.106
- **Port:** 5432
- **Database:** postgres
- **Username:** postgres
- **Password:** postgres

## Run Backend Services Locally + Kafka

Provided that you have set up the database, we can go over running backend services.

**NOTE:** These instructions are mostly for developers (technical people) working on features that have dependencies on other services. As stated above, one main and three helper services are here.

The main app is built with Maven, others mostly with Gradle. We provide a bash script that will run Kafka and Zookeeper as Docker containers, and helper services will be built and run.

### Prerequisites
-  Docker Engine
-  JDK 22
-  Java 17
-  Maven 3.9.8

Ensure you have Docker Engine installed on your machine.

### Running the Main App (`jobjays-api`)

#### Step 1:

Go to the backend folder (assuming you are in the `Team-JobJays` directory):

```bash
cd backend
```

#### Step 2:

Run helper services and Kafka.

For Mac/Linux:

```bash
./run-services.sh
```

For Windows:

```bash
./run-services.bat
```

#### Step 3:

Run the main app:

```bash
mvn spring-boot:run
```

#### Step 4:

Access the main app at `http://localhost:8080`—note you could get a 403 ERROR due to not having an access token (which can be gained after a successful login) and you are not authorized to access APIs.

After completing all, you should see two containers running Kafka and Zookeeper, one HTTP-accessible service at port 8080, and other background services.
