# VIA Tabloid Application (VIATAB)

The VIA Tabloid Application is a web application that displays sensational stories from different departments in VIA. This project is built following DevOps practices and consists of three main components:
- **Backend**: Spring Boot REST API
- **Frontend**: React (jsx)
- **Database**: PostgreSQL

## Prerequisites
- [Docker](https://www.docker.com/) installed and running on your machine.

## Getting Started (Part 1 + 2)

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

## Deploying to Kubernetes (Part 3)
After successfully running the application with Docker Compose, we deployed the entire stack on Kubernetes using Minikube. The following steps summarize the process:
Build and Push Docker Images

### 1. Build and Push Docker Images
We built the backend and frontend images using:

```bash
docker build -t via-tabloid-application-backend:latest ./backendV1
docker build -t via-tabloid-application-frontend:latest ./my-react-app
```

Then we pushed these images to Docker Hub:

```bash
docker push via-tabloid-application-backend:latest
docker push via-tabloid-application-frontend:latest
```

### 2. Deploy to Kubernetes
With Minikube running:

```bash
minikube start
```

We applied our manifests:

```bash
kubectl apply -f path/to/your/deployment.yaml
kubectl apply -f path/to/your/service.yaml
```

Then we verified that the pods and services were running:


```bash
kubectl get pods
kubectl get services
```
### 3. Accessing the Application
Since the backend and frontend services are exposed as NodePort, we used:
```bash
minikube service viatab-frontend
minikube service viatab-backend
```

to open the services in the default web browser.

**Why Kubernetes?**
Kubernetes was chosen for its ability to efficiently manage, scale, and deploy containerized applications across multiple nodes—ideal for production-grade deployments.

### 4. View the Kubernetes Dashboard
To launch the Minikube dashboard for monitoring:


```bash
minikube dashboard
```

This project is for educational purposes and follows DevOps best practices.
