# Multi-stage build for static Next.js export served by NGINX

# 1) Builder: install deps, build, and export static site to /app/out
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies first (better caching)
COPY package.json ./
COPY package-lock.json* bun.lock* ./
# 👇 Add the flag here to bypass the React 18/19 peer-dep conflict
RUN npm ci --legacy-peer-deps

# Copy the rest of the source
COPY . /app

# Build and export static site
RUN npm run build && npm run export

# 2) Runner: lightweight NGINX
FROM nginx:1.27-alpine AS runner

# Copy custom nginx config to enable SPA fallback for client-side routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy exported site
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
