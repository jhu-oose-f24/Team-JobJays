# Use an official Maven image with Java 23 for the build stage
FROM maven:3.9.6-eclipse-temurin-22 AS build
WORKDIR /app

# Copy only the Maven configuration files to download dependencies first
COPY pom.xml .
COPY src ./src

# Build the application (package into a JAR)
RUN mvn clean package -DskipTests

# Use a lightweight OpenJDK 23 runtime image for the final stage
FROM eclipse-temurin:22-jre-alpine
WORKDIR /app

# Copy the built application JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Set the entrypoint to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
