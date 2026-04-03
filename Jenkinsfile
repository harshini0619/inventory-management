pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t inventory-app .'
            }
        }

        stage('Run Container') {
            steps {
                sh 'docker stop inventory-container || true'
                sh 'docker rm inventory-container || true'
                sh 'docker run -d -p 8080:80 --name inventory-container inventory-app'
            }
        }
    }
}