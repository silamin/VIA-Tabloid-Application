# VIA Tabloid Application (VIATAB)

The VIA Tabloid Application is a web application that displays sensational stories from different departments in VIA. This project is built following DevOps practices and consists of three main components:
- **Backend**: Spring Boot REST API
- **Frontend**: React (with TypeScript)
- **Database**: PostgreSQL

## Prerequisites
- [Docker](https://www.docker.com/) installed and running on your machine.
- [Docker Compose](https://docs.docker.com/compose/) installed.

## Getting Started

### 1. Pull and Run PostgreSQL Container
First, pull and run the PostgreSQL container manually:
```bash
docker run --name springboot_postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres
```
This command:

- Pulls the official PostgreSQL image (if not already pulled).
- Creates a container named springboot_postgres.
- Sets the PostgreSQL password to mysecretpassword.

### 2. Run the Application Stack with Docker Compose
Make sure you are in the root directory of your project (where your docker-compose.yml file is located). Then run:
```bash
docker-compose up -d --build
```

This command will:

- Build the Docker images for your Spring Boot backend and React frontend.
- Start up the containers defined in your docker-compose.yml file.
- Orchestrate the entire stack, ensuring the backend, frontend, and database work together.

  ### 2. Enjoy the Application
  Once the containers are running, open your browser and navigate to:

```bash
http://localhost:3000
```

This is where your React frontend is served. From here, you can interact with the application, which communicates with the Spring Boot REST API and PostgreSQL database.
  ### 3. Shutting Down the Application
  When you're done, you can stop and remove the running containers by running:

```bash
docker-compose down
```
This command will stop the containers and clean up the resources created by Docker Compose.

## Additional Notes

- This setup is intended for development and testing purposes. For production, consider using environment variables, persistent storage for your database, and secure configurations for sensitive data.
- The application demonstrates how a Spring Boot REST API, React frontend, and PostgreSQL database can be orchestrated using Docker and Docker Compose.
- 
Enjoy using the VIA Tabloid Application!


