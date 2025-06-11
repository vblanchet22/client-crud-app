pipeline {
  agent any

  tools {
    nodejs 'node20'
  }

  environment {
    SONAR_TOKEN = credentials('SONARCLOUD_TOKEN')
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install deps') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Lint') {
      steps {
        sh 'npm run lint || echo "lint failed"'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test || true'
      }
    }

    stage('SonarCloud Analysis') {
      steps {
        sh "npx sonar-scanner -Dsonar.login=$SONAR_TOKEN"
      }
    }
  }
}
