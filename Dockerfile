# Dockerfile for cp-nifty-analyzer (Next.js + Node.js)
FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies only when needed
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy the rest of the app
COPY . .

# Build Next.js app
RUN npm run build

# Expose port (default Next.js port)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
