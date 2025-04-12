# Use a minimal Node.js LTS image
FROM node:lts-alpine

# Set working directory
WORKDIR /app

# Copy all files except .dockerignore files
COPY . .

# Start the server
CMD ["node", "index.js"]