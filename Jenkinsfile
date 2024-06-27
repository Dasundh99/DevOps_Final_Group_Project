pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/Dasundh99/DevOps_Final_Group_Project.git'
        BACKEND_IMAGE = 'devops_project-backend'
        FRONTEND_IMAGE = 'devops_project-frontend'
        MONGO_IMAGE = 'devops_project-mongodb'
    }

    stages {
        stage('Clone Repository') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend Image') {
            steps {
                bat "cd BACKEND && docker build -t ${BACKEND_IMAGE} ."
            }

        }

        stage('Build Frontend Image') {
            steps {
                bat "cd frontend && docker build -t ${FRONTEND_IMAGE} ."
            }
        }

        stage('Run Containers') {
            steps {
                bat "docker run -d --name mongodb devops_project-mongodb"
                bat "docker run -d --name backend --link mongodb:mongodb -p 5000:5000 ${BACKEND_IMAGE}"
                bat "docker run -d --name frontend --link backend:backend -p 3000:3000 ${FRONTEND_IMAGE}"
            }
        }
    }
}
