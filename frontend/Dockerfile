# Stage 1: Build the React app
# We use a separate stage just for building
# This is called a 'multi-stage build'
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# This compiles React JSX into plain HTML/CSS/JS files
# Output goes into the 'dist' folder
RUN npm run build

# Stage 2: Serve the built files with Nginx
# Nginx is a lightweight web server - perfect for serving static files
# We throw away the Node.js stage and only keep the built files
# Final image is tiny - no Node.js, no node_modules, just Nginx + dist/
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
