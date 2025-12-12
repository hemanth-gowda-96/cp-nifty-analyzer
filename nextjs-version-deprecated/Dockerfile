# Dockerfile for cp-nifty-analyzer (Next.js + Node.js)
FROM node:20-slim AS base
WORKDIR /app

# Install build tools required for native modules (better-sqlite3)
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies and force rebuilding native modules inside the container
RUN npm ci
RUN npm rebuild better-sqlite3 --build-from-source

# Copy app source
COPY . .

# Build Next.js app
RUN npm run build

# Expose port
EXPOSE 3000

# Start the production server
CMD ["npm", "start"]
