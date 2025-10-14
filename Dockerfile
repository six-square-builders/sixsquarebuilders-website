# Use an official Node.js image to build the app
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the app
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Create a lightweight container to serve static files
FROM node:20-alpine AS runner

# Install a static server
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy the built static export from the builder stage
COPY --from=builder /app/out ./

# Expose port
EXPOSE 3000

# Command to serve the app
CMD ["serve", "-s", ".", "-l", "3000"]
