pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/Dasundh99/DevOps_Final_Group_Project.git'
        BACKEND_IMAGE = 'devops_project-backend'
        FRONTEND_IMAGE = 'devops_project-frontend'
        BACKEND_PORT = '5000'
        FRONTEND_PORT = '3000'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git url: "${REPO_URL}"
            }
        }

        stage('Cleanup Existing Containers') {
            steps {
                script {
                    bat '''
                        powershell -Command "Start-Process -Verb runAs 'cmd.exe' -ArgumentList '/c docker rm -f backend || echo \"backend container does not exist\"'"
                        powershell -Command "Start-Process -Verb runAs 'cmd.exe' -ArgumentList '/c docker rm -f frontend || echo \"frontend container does not exist\"'"
                    '''
                }
            }
        }

        
        stage('Free Up Ports') {
            steps {
                script {
                    bat """
                        @echo off
                        for /f "tokens=5" %%a in ('netstat -aon ^| findstr :${BACKEND_PORT}') do (
                            taskkill /f /pid %%a 2>nul
                            if errorlevel 1 (
                                echo No process found on port ${BACKEND_PORT}
                            ) else (
                                echo Terminated process on port ${BACKEND_PORT}
                            )
                        )
                        for /f "tokens=5" %%a in ('netstat -aon ^| findstr :${FRONTEND_PORT}') do (
                            taskkill /f /pid %%a 2>nul
                            if errorlevel 1 (
                                echo No process found on port ${FRONTEND_PORT}
                            ) else (
                                echo Terminated process on port ${FRONTEND_PORT}
                            )
                        )
                        exit /b 0
                    """
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                script {
                    dir('BACKEND') {
                        bat "powershell -Command \"Start-Process -Verb runAs 'cmd.exe' -ArgumentList '/c docker build -t ${BACKEND_IMAGE} .'\""
                    }
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                script {
                    dir('frontend') {
                        bat "powershell -Command \"Start-Process -Verb runAs 'cmd.exe' -ArgumentList '/c docker build -t ${FRONTEND_IMAGE} .'\""
                    }
                }
            }
        }

        stage('Run Containers') {
            steps {
                bat "docker run -d --name backend --link mongodb:mongodb -p 5000:5000 ${BACKEND_IMAGE}"
                bat "docker run -d --name frontend --link backend:backend -p 3000:3000 ${FRONTEND_IMAGE}"
            }
        }
    }
}
