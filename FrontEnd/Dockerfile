# Use an official Node.js runtime as a parent image
FROM node:22

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) files to install dependencies
COPY package.json  ./

# Install dependencies (both production and development dependencies)
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose port 3000 (or the port your app is running on)
EXPOSE 5173

# Command to run the app (start the development server)
CMD ["npm", "run", "dev"]
