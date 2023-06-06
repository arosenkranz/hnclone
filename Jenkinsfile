pipeline {
    agent {
        docker {
            image 'node:lts-slim'
        }
    }
    environment {
        CI = 'true'
        DATABASE_URL="postgresql://user:password@localhost:5432/db?schema=techstories"
        NEXTAUTH_SECRET="secret"
        NEXTAUTH_URL="http://localhost:3000"
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