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
                git url: "${REPO_URL}", branch: 'master'
            }
        }

        stage('Build Backend Image') {
            steps {
                script {
                    docker.build("${BACKEND_IMAGE}", '-f BACKEND/DockerFile .')
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                script {
                    docker.build("${FRONTEND_IMAGE}", '-f frontend/DockerFile .')
                }
            }
        }

        stage('Run Containers') {
            steps {
                script {
                    docker.run('-d --name mongodb devops_project-mongodb')
                    docker.run("-d --name backend --link mongodb:mongodb -p 5000:5000 ${BACKEND_IMAGE}")
                    docker.run("-d --name frontend --link backend:backend -p 3000:3000 ${FRONTEND_IMAGE}")
                }
            }
        }
    }

    post {
        always {
            script {
                docker ps -a
            }
        }
    }
}
