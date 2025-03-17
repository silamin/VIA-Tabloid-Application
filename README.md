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
