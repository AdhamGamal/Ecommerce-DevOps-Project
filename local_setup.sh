#!/bin/bash

set -e

# Variables
HASHING_COST="10"
backend_port="8000"
frontend_port="80"

# Step 1: Clean up old containers
echo "🚀 Cleaning up old containers..."
docker rm -f backend backend1 backend2 frontend || true

# Step 2: Create Docker network
echo "🔧 Creating Docker network..."
docker network create elegance-net || true

# === BACKEND ===
echo "📦 Installing backend dependencies..."
cd BackEnd
npm install --only=production
cd ..

echo "🐳 Building backend Docker image..."
docker build -t elegance-backend:local -f Devops/dockerfile.backend .

# === FRONTEND ===
echo "📦 Installing frontend dependencies & building project..."
cd FrontEnd
npm install
npm run build
cd ..

echo "⚙️ Generating default.conf..."
sed 's|${BACKEND_SERVERS}|server backend1:8000 max_fails=3 fail_timeout=30s;\
server backend2:8000 max_fails=3 fail_timeout=30s;|' \
FrontEnd/default.conf.template > FrontEnd/default.conf

echo "🐳 Building frontend Docker image..."
docker build -t elegance-frontend:local -f Devops/dockerfile.frontend .

# Step 3: Stop any process using the frontend port
echo "🔴 Stopping any process using port $frontend_port..."
lsof -i :$frontend_port -t | xargs -r sudo kill -9 || true

# Step 3: Stop any process using the frontend port
echo "🔴 Stopping any process using port $backend_port..."
lsof -i :8001 -t | xargs -r sudo kill -9 || true
echo "🔴 Stopping any process using port $backend_port..."
lsof -i :8002 -t | xargs -r sudo kill -9 || true


# Step 4: Run backend container with environment variables
echo "🚀 Running backend container..."
docker run -d \
  --name backend1 \
  -p "8001:$backend_port" \
  --restart always \
  --network elegance-net \
  -e PORT="$backend_port" \
  -e DB_USER_NAME="$DB_USER_NAME" \
  -e DB_PASSWORD="$DB_PASSWORD" \
  -e DB_NAME="$DB_NAME" \
  -e DB_URI="$DB_URI" \
  -e HASHING_COST="$HASHING_COST" \
  -e ENCRYPTION_KEY="$ENCRYPTION_KEY" \
  elegance-backend:local

docker run -d \
  --name backend2 \
  -p "8002:$backend_port" \
  --restart always \
  --network elegance-net \
  -e PORT="$backend_port" \
  -e DB_USER_NAME="$DB_USER_NAME" \
  -e DB_PASSWORD="$DB_PASSWORD" \
  -e DB_NAME="$DB_NAME" \
  -e DB_URI="$DB_URI" \
  -e HASHING_COST="$HASHING_COST" \
  -e ENCRYPTION_KEY="$ENCRYPTION_KEY" \
  elegance-backend:local

# Step 5: Run frontend container
echo "🚀 Running frontend container..."
docker run -d \
  --name frontend \
  --restart always \
  --network elegance-net \
  -p "$frontend_port:$frontend_port" \
  elegance-frontend:local

echo "✅ Application running at: http://localhost:$frontend_port"