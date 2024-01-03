# Use an official Node.js runtime as the base image
FROM node:14

# Install NGINX
RUN apt-get update && apt-get install -y nginx nano

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend application code to the container
COPY . .

# Build the frontend
RUN npm run build

# Remove the default NGINX configuration
RUN rm /etc/nginx/sites-enabled/default

# Copy custom NGINX configuration
COPY nginx/default.conf /etc/nginx/sites-available/
RUN ln -s /etc/nginx/sites-available/default.conf /etc/nginx/sites-enabled/

# Expose port 80 for the NGINX server
EXPOSE 80

# Start NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]
