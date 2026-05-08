# E-Commerce Microservices

A full-stack e-commerce application built with a microservices architecture. Each service is independently deployable, containerized with Docker, and orchestrated with Kubernetes.

![Architecture](https://img.shields.io/badge/Architecture-Microservices-blue) ![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker&logoColor=white) ![Kubernetes](https://img.shields.io/badge/Kubernetes-Orchestrated-326CE5?logo=kubernetes&logoColor=white) ![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=black) ![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white)

---

## What This Project Is

Most tutorials show you how to build a monolith — one big app that does everything. This project takes a different approach. Instead of one app, there are four independent services that each own their own data and logic, and communicate with each other over HTTP.

The goal was to understand how real production systems are built — where teams can deploy, scale, and update individual services without touching the rest of the system.

---

## Services

| Service | Description | Port |
|---|---|---|
| **user-service** | Create and look up users | 3001 |
| **product-service** | List and add products | 3002 |
| **order-service** | Place orders, validates user + product | 3003 |
| **frontend** | React UI served by Nginx | 5173 / 8080 |

The order service demonstrates real inter-service communication — when you place an order, it calls the user service and product service internally to validate both exist before creating the order.

---

## Tech Stack

**Backend**
- Node.js + Express
- CORS for cross-origin requests
- In-memory data store (arrays)

**Frontend**
- React (Vite)
- React Router for navigation
- Axios for API calls

**Infrastructure**
- Docker + Docker Compose for local containerization
- Kubernetes (KIND) for container orchestration
- Nginx for serving the production React build
- Multi-stage Docker builds for optimized images

---

## Architecture

```
Browser
  └── React Frontend (Nginx)
        ├── GET/POST /users      → User Service (Node.js)
        ├── GET/POST /products   → Product Service (Node.js)
        └── GET/POST /orders     → Order Service (Node.js)
                                      ├── calls User Service
                                      └── calls Product Service
```

Each service runs in its own container with its own process. They communicate over a shared Docker/Kubernetes network using service names instead of hardcoded IPs.

---

## Getting Started

### Prerequisites

- Node.js 20+
- Docker Desktop
- kubectl
- KIND (Kubernetes in Docker)

---

### Option 1 — Run Locally (No Docker)

Start each service in a separate terminal:

```bash
# Terminal 1
cd user-service && npm install && node index.js

# Terminal 2
cd product-service && npm install && node index.js

# Terminal 3
cd order-service && npm install && node index.js

# Terminal 4
cd frontend && npm install && npm run dev
```

Open `http://localhost:5173`

---

### Option 2 — Run with Docker Compose (Recommended)

```bash
docker-compose up --build
```

Open `http://localhost:5173`

All 4 services start automatically. No need to manage multiple terminals.

---

### Option 3 — Run on Kubernetes (KIND)

**1. Create a local cluster**

```bash
kind create cluster --name ecommerce
```

**2. Load images into KIND**

```bash
docker-compose build

kind load docker-image ecommerce-microservices-user-service:latest --name ecommerce
kind load docker-image ecommerce-microservices-product-service:latest --name ecommerce
kind load docker-image ecommerce-microservices-order-service:latest --name ecommerce
kind load docker-image ecommerce-microservices-frontend:latest --name ecommerce
```

**3. Deploy to Kubernetes**

```bash
kubectl apply -f k8s/
```

**4. Verify pods are running**

```bash
kubectl get pods
```

You should see all 4 pods with `Running` status.

**5. Port forward to access the app**

```bash
kubectl port-forward service/frontend 8080:80 &
kubectl port-forward service/user-service 3001:3001 &
kubectl port-forward service/product-service 3002:3002 &
kubectl port-forward service/order-service 3003:3003 &
```

Open `http://localhost:8080`

---

## Project Structure

```
ecommerce-microservices/
├── user-service/
│   ├── index.js
│   ├── Dockerfile
│   └── package.json
├── product-service/
│   ├── index.js
│   ├── Dockerfile
│   └── package.json
├── order-service/
│   ├── index.js
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/index.js
│   │   ├── pages/
│   │   │   ├── Users.jsx
│   │   │   ├── Products.jsx
│   │   │   └── Orders.jsx
│   │   └── App.jsx
│   ├── Dockerfile
│   └── package.json
├── k8s/
│   ├── user-service.yml
│   ├── product-service.yml
│   ├── order-service.yml
│   └── frontend.yml
└── docker-compose.yml
```

---

## Key Concepts Demonstrated

**Microservices Communication**
Services don't share a database or codebase. The order service calls user and product services over HTTP to validate data before creating an order — exactly how real microservices talk to each other.

**CORS**
Each backend service enables CORS so the React frontend running on a different port can make API requests to them without being blocked by the browser.

**Docker Layer Caching**
Dockerfiles copy `package.json` before the source code so npm install is only re-run when dependencies change, not on every code change.

**Multi-Stage Docker Builds**
The frontend Dockerfile uses a Node.js stage to build the React app, then copies only the compiled output into a lightweight Nginx image. The final image has no Node.js or node_modules — just static files and a web server.

**Kubernetes Networking**
Backend services use `ClusterIP` — only reachable inside the cluster. The frontend uses `NodePort` to expose it externally. Services find each other by name using Kubernetes internal DNS.

**Environment Variables**
The order service uses environment variables (`USER_SERVICE_URL`, `PRODUCT_SERVICE_URL`) to configure which URLs to call. This means the same code works locally with `localhost` and in Kubernetes with service names — no code changes needed.

---

## What I'd Add Next

- PostgreSQL database with persistent volumes instead of in-memory storage
- Kubernetes Ingress controller to replace port-forwarding
- GitHub Actions CI/CD pipeline to build and push images automatically
- Prometheus + Grafana monitoring for each service
- Helm charts for cleaner Kubernetes deployments

---

## Author

**Abhi** — DevOps Engineering Student  
[GitHub](https://github.com/abhinabh7)
