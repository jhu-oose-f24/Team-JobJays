@echo off
setlocal enabledelayedexpansion

rem Run Docker Compose to start all services
echo Starting services with Docker Compose...
docker-compose up --build

rem Define all services
set SERVICES=applicant_job_matcher notification_logger notification_sender preference_updater

for %%S in (%SERVICES%) do (
    echo Building %%S...
    cd %%S
    call gradlew.bat build -x test
    if errorlevel 1 (
        echo Failed to build %%S
        exit /b 1
    )
    cd ..
)
