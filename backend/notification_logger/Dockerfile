# Use an official Gradle image with Java 23 for the build stage
FROM gradle:8.10.2-jdk23 AS build
WORKDIR /app
COPY --chown=gradle:gradle . .

# Build the application
RUN gradle build --no-daemon

# Use a lightweight OpenJDK 23 runtime image for the final stage
FROM eclipse-temurin:23-jre-alpine
WORKDIR /app

# Copy the built application JAR from the build stage
COPY --from=build /app/build/libs/*.jar app.jar

# Set the entrypoint to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
