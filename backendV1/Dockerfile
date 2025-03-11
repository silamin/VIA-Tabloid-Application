FROM openjdk:21-slim

WORKDIR /app

# Ensure the JAR file exists in the target directory!
COPY target/backendV1-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

# Run the jar using a relative path (it will look in /app because of WORKDIR)
ENTRYPOINT ["java", "-jar", "app.jar"]
