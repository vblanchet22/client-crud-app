pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        SONARQUBE_ENV = 'SonarCloud'
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

        stage('Generate Prisma Client') {
            steps {
                sh 'npx prisma generate'
            }
        }

        stage('Build') {
            steps {
                sh 'ls -la && ls prisma && cat prisma/schema.prisma'
                sh 'npm run build'
            }
        }

        stage('Run tests with coverage') {
            steps {
                sh 'npm run test -- --coverage'
            }
        }

        stage('SonarCloud Analysis') {
            steps {
                withSonarQubeEnv("${SONARQUBE_ENV}") {
                    sh 'sonar-scanner'
                }
            }
        }
    }
}
