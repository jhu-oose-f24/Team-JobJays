# Book Management Application

This is a simple Spring Boot application for managing books. You can add book details like title, author, and ISBN and view the list of all stored books.

## Prerequisites

- **Java 17** or higher
- **Maven**
- **MySQL Server**

## How to Run the Application Locally

### Step 1: Download the zip file and unzip it
Once you unzip it, you can get a java project.

### Step 2: Set Up MySQL Database
1.Start MySQL server.
2.Create the database:
CREATE DATABASE bookapp;

### Step 3: Configure the Database Connection
Update the database credentials in src/main/resources/application.properties:

spring.datasource.url=jdbc:mysql://localhost:3306/book_app?useSSL=false&serverTimezone=UTC
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password

### Step 4: Build and Run the Application
1.Build the project:
    mvn clean install
2.Run the application:
    mvn spring-boot:run

### Step 5: Access the Application
Open your browser and go to:http://localhost:8080/

### Step 6: Test the Application
1.Add a Book: Enter the book details and click "Add Book."
2.View Books: All books will be listed on the same page.

The final result like the image below:
![img_1.png](img_1.png)