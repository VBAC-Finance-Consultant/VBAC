# Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
# We use npm install --legacy-peer-deps to avoid any potential vite compatibility issues
COPY package.json ./
RUN npm install

# Copy source and build
COPY . .

# Frontend sẽ gọi /api/... (relative) thay vì http://localhost:8000
ENV VITE_API_BASE_URL=/api
RUN npm run build

# Production Stage
FROM nginx:alpine

# Nginx config với reverse proxy /api/ -> api_gateway
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output from builder
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
