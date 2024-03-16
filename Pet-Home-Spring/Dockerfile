FROM openjdk:8-jdk-alpine
VOLUME /tmp
ARG JAR_FILE=target/Pet-Home-Spring-0.0.1-SNAPSHOT.jar
ADD ${JAR_FILE} pet-backend.jar
EXPOSE 9188
ENTRYPOINT ["java","-jar","/pet-backend.jar"]