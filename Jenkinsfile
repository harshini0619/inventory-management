pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                bat 'docker build -t inventory-app .'
            }
        }

        stage('Stop Old Container') {
            steps {
                bat 'docker stop inventory-container || exit 0'
                bat 'docker rm inventory-container || exit 0'
            }
        }

        stage('Run Container') {
            steps {
                bat 'docker run -d -p 3001:80 --name inventory-container inventory-app'
            }
        }
    }
}
