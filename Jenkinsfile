pipeline {
    agent any
    environment {
        CI = 'true'
        DATABASE_URL="postgresql://user:password@localhost:5432/db?schema=techstories"
        NEXTAUTH_SECRET="secret"
        NEXTAUTH_URL="http://localhost:3000"
        DATADOG_API_KEY="<dd_api_key>"
        // set git metadata, wrapped in double quotes
        JENKINS_URL="${env.JENKINS_URL}"
        BUILD_TAG="${env.BUILD_TAG}"
        BUILD_NUMBER="${env.BUILD_NUMBER}"
        BUILD_URL="${env.BUILD_URL}"
        WORKSPACE="${env.WORKSPACE}"
        JOB_NAME="${env.JOB_NAME}"
        JOB_URL="${env.JOB_URL}"
        GIT_URL="${env.GIT_URL}"
        GIT_URL_1="${env.GIT_URL_1}"
        GIT_COMMIT="${env.GIT_COMMIT}"
        GIT_BRANCH="${env.GIT_BRANCH}"
        NODE_NAME="${env.NODE_NAME}"
        NODE_LABELS="${env.NODE_LABELS}"
        DD_CUSTOM_TRACE_ID="${env.DD_CUSTOM_TRACE_ID}"
        DD_CUSTOM_PARENT_ID="${env.DD_CUSTOM_PARENT_ID}"

        // get git author and commit message
        DD_GIT_AUTHOR_NAME="${sh(returnStdout: true, script: 'git log -1 --pretty=format:\'%an\'').trim()}"
        DD_GIT_AUTHOR_EMAIL="${sh(returnStdout: true, script: 'git log -1 --pretty=format:\'%ae\'').trim()}"
        DD_GIT_COMMIT_MESSAGE="${sh(returnStdout: true, script: 'git log -1 --pretty=format:\'%s\'').trim()}"
        DD_GIT_REPOSITORY_URL="${sh(returnStdout: true, script: 'git config --get remote.origin.url').trim()}"
        DD_GIT_COMMIT_SHA="${sh(returnStdout: true, script: 'git rev-parse HEAD').trim()}"
        DD_GIT_BRANCH="${sh(returnStdout: true, script: 'git rev-parse --abbrev-ref HEAD').trim()}"
    }
    stages {
        stage('Upload Git Metadata') {
            steps {
                sh 'npx @datadog/datadog-ci git-metadata upload'
            }
        }
        stage('Install') {
            steps {
                sh 'yarn install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=techstories yarn test'
            }
        }
    }
}