pipeline {
    agent any

    environment {
        IMAGE_NAME = 'harmesh95/sixsquare-frontend'
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')  // Set in Jenkins
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${IMAGE_NAME}:latest", "frontend")
                }
            }
        }

        stage('Login & Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKERHUB_CREDENTIALS) {
                        dockerImage.push('latest')
                    }
                }
            }
        }
    }

    post {
        success {
            echo '✅ Docker image pushed successfully.'
        }
        failure {
            echo '❌ Docker push failed.'
        }
    }
}
