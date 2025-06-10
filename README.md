# JK Tech APP
JK Tech Blog app for interview

# Project Setup 

## Tech Stack

- **Node.js** (Version 18)
- **TypeScripts**
- **PostgresSQL**
- **Docker**
- **Docker Desktop**

## Local Setup Instruction

1. Open Docker Desktop for runnig docker container.

2. Run Docker Compose build command to create docker images for backend, frontend and db-migration services

```sh
docker-compose build --no-cache
```

3. Run Docker compose up to up and running the backend, frontend, Postgres images and run db migration script to create required tables

```sh
docker-compose up
```

4. Once all services is running up click on [App](http://localhost:3000) to access the web App.