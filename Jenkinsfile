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
                git url: "${REPO_URL}"
            }
        }

       stage('Cleanup Existing Containers') {
            steps {
                script {
                    bat 'docker rm -f mongodb || echo "mongodb container does not exist"'
                    bat 'docker rm -f backend || echo "backend container does not exist"'
                    bat 'docker rm -f frontend || echo "frontend container does not exist"'
                }
            }
        }
        
        stage('Build Backend Image') {
            steps {
                script {
                    dir('BACKEND') {
                        bat "docker build -t ${BACKEND_IMAGE} ."
                    }
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                script {
                    dir('frontend') {
                        bat "docker build -t ${FRONTEND_IMAGE} ."
                    }
                }
            }
        }

        stage('Run Containers') {
            steps {
                bat "docker run -d --name mongodb ${MONGO_IMAGE}"
                bat "docker run -d --name backend --link mongodb:mongodb -p 5000:5000 ${BACKEND_IMAGE}"
                bat "docker run -d --name frontend --link backend:backend -p 3000:3000 ${FRONTEND_IMAGE}"
            }
        }
    }
}
