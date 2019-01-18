FROM loyaltyone/docker-alpine-java-node

MAINTAINER eatmarcus

WORKDIR /app

COPY target /app/springboot/

RUN chmod 777 -R /app

EXPOSE 8080

ENTRYPOINT java -jar ./springboot/policybuilder-0.0.1-SNAPSHOT.jar


