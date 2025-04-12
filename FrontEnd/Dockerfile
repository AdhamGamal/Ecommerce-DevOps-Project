# Use Nginx to serve the built React app
FROM nginx:alpine-slim

# Remove default configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy built frontend
COPY dist /usr/share/nginx/html

# Copy main Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy server configuration (http/server blocks)
COPY default.conf /etc/nginx/conf.d/

# Copy custom error pages
COPY error-pages /usr/share/nginx/html/error-pages

CMD ["nginx", "-g", "daemon off;"]