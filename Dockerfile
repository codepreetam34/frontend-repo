# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy only the package.json and package-lock.json first
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend application code to the container
COPY . .

# Expose port 80 for the NGINX server (Note: This is more of a documentation than a functional change)
EXPOSE 80

# Start the application
#CMD ["npm", "start"]


# Start NGINX in the foreground
 CMD ["npm", "-g", "daemon off;"]