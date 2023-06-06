pipeline {
    agent {
        docker {
            image 'node:lts-slim'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh 'yarn install'
            }
        }
        stage('Test') {
            steps {
                sh 'NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=techstories yarn test'
            }
        }
    }
}