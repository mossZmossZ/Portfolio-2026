pipeline {
  agent any

  environment {
    // Docker image coordinates
    REGISTRY     = "docker.io"
    IMAGE_NAME   = "mosszmossz/portfolio-2026"
    IMAGE_TAG    = "latest"

    // Node options (for large Next.js builds)
    NODE_OPTIONS = "--max_old_space_size=4096"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Validate') {
      steps {
        sh 'node -v'
        sh 'npm -v'

        // Clean install dependencies and run linting
        sh 'npm ci'
        sh 'npm run lint'
      }
    }

    stage('Testing') {
      steps {
        // For this project, the main "test" is a successful production build
        sh 'npm run build'
      }
    }

    stage('Security Testing') {
      steps {
        // Basic dependency vulnerability scan
        // Fail the build on high/critical issues
        sh 'npm audit --audit-level=high'
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          sh """
            docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
          """
        }
      }
    }

    stage('Push Docker Image') {
      steps {
        script {
          withCredentials([usernamePassword(
            credentialsId: 'docker-registry-credentials',
            usernameVariable: 'DOCKER_USER',
            passwordVariable: 'DOCKER_PASS'
          )]) {
            sh """
              echo "${DOCKER_PASS}" | docker login -u "${DOCKER_USER}" --password-stdin ${REGISTRY}
              docker push ${IMAGE_NAME}:${IMAGE_TAG}
            """
          }
        }
      }
    }
  }

  post {
    always {
      echo 'Pipeline completed.'
    }
    success {
      echo 'Build, tests, security scan, and image push succeeded.'
    }
    failure {
      echo 'Pipeline failed. Please inspect the stage logs.'
    }
  }
}

