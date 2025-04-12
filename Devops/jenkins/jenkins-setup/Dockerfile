FROM jenkins/jenkins:2.479.3-jdk17

# Switch to root user to install dependencies
USER root

# Install necessary utilities and Docker CLI
RUN apt-get update && apt-get install -y lsb-release
RUN curl -fsSLo /usr/share/keyrings/docker-archive-keyring.asc \
  https://download.docker.com/linux/debian/gpg
RUN echo "deb [arch=$(dpkg --print-architecture) \
  signed-by=/usr/share/keyrings/docker-archive-keyring.asc] \
  https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list
RUN apt-get update && apt-get install -y docker-ce-cli

# Install the latest stable Node.js version (automatically fetching the latest)
RUN curl -fsSL https://deb.nodesource.com/setup_current.x | bash - && \
    apt-get install -y nodejs

# Switch back to jenkins user
USER jenkins

# Install Jenkins plugins including SSH Agent and others
RUN jenkins-plugin-cli --plugins "blueocean docker-workflow ssh-agent"