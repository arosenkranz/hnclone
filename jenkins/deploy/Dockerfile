FROM jenkins/jenkins:lts-jdk11
# disable setup wizard
ENV CURL_OPTIONS -sSfLk
ENV JAVA_OPTS -Djenkins.install.runSetupWizard=false
ENV CASC_JENKINS_CONFIG /var/jenkins_home/casc.yaml
# copy plugins
COPY --chown=jenkins:jenkins plugins.txt /usr/share/jenkins/ref/plugins.txt
# install plugins
# RUN jenkins-plugin-cli -f /usr/share/jenkins/ref/plugins.txt
RUN sh -c 'export JAVA_TOOL_OPTIONS="-Dhttps.proxyHost=${PROXY_HOST} -Dhttps.proxyPort=${PROXY_PORT} -Dhttp.proxyHost=${PROXY_HOST} -Dhttp.proxyPort=${PROXY_PORT}" && \
  cat /usr/share/jenkins/plugins.txt | while read line; \
  do /bin/jenkins-plugin-cli --war "/usr/share/jenkins/jenkins.war" --plugins "$line"; done'

COPY --chown=jenkins:jenkins casc.yaml /var/jenkins_home/casc.yaml
