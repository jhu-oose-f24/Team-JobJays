#!/bin/bash


# Run Docker Compose to start all services
echo "Starting services with Docker Compose..."
docker-compose up --build -d
# Navigate to each service and run gradle build
SERVICES=("applicant_job_matcher" "notification_logger" "notification_sender" "preference_updater")

for SERVICE in "${SERVICES[@]}"; do
  echo "Building $SERVICE..."
  cd "$SERVICE" || exit
  chmod +x ./gradlew
  ./gradlew build -x test
  if [ $? -ne 0 ]; then
    echo "Failed to build $SERVICE"
    exit 1
  fi
  cd ..
done

