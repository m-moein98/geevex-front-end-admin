# Angular Admin Panel

This project is an **Angular-based Admin Panel** designed for managing and monitoring application data. It provides a modern UI and is fully containerized for easy deployment.

---

## 🚀 Features

* Angular-based responsive admin panel
* Containerized with **Docker**
* Uses **Node.js v14.20.0** exclusively
* Ready-to-use **Dockerfile** and **docker-compose.yml** for development and production

---

## 🛠️ Requirements

Before running the project, make sure you have the following installed:

* [Docker](https://www.docker.com/get-started)
* [Docker Compose](https://docs.docker.com/compose/)

---

## 📦 Setup & Installation

### 1. Build the Docker image

```bash
docker-compose build
```

### 2. Run the container

```bash
docker-compose up -d
```

---

## 🖥️ Accessing the App

Once the container is running, open your browser and visit:

```
http://localhost:4200
```

---

## ⚡ Development Notes

* This project **relies only on Node.js v14.20.0**.
* Ensure that if you are running locally (outside Docker), you use the correct Node.js version (e.g., via [nvm](https://github.com/nvm-sh/nvm)):

  ```bash
  nvm install 14.20.0
  nvm use 14.20.0
  ```
