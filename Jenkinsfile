pipeline {
    agent any

    environment {
        SONARQUBE_SERVER = 'SonarCloud'
    }

    tools {
        nodejs 'NodeJS'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test + Coverage') {
            steps {
                sh 'npm run test -- --coverage'
            }
        }

        stage('SonarCloud analysis') {
            steps {
                withSonarQubeEnv("${SONARQUBE_SERVER}") {
                    sh 'sonar-scanner'
                }
            }
        }
    }
}
