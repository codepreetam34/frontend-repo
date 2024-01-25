# Use an official Node.js runtime as the base image
FROM node:14

# Install NGINX
RUN apt-get update && \
    apt-get install -y nginx nano

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend application code to the container
COPY . .

# Build the frontend application
RUN npm run build

# Copy NGINX configuration file
 COPY app/nginx /etc/nginx

# Expose port 80 for NGINX
EXPOSE 80

# Command to start NGINX
CMD ["nginx", "-g", "daemon off;"]


# RUN cp /app/nginx/vibezter.com.conf /etc/nginx/sites-available/
# RUN mv /app/nginx/nginx.conf /etc/nginx/
# RUN mv /app/nginx/cert.conf /etc/nginx/snippets/
# RUN mv /app/nginx/ssl-params.conf /etc/nginx/snippets
# RUN ln -s /etc/nginx/sites-available/vibezter.com.conf /etc/nginx/sites-enabled/vibezter.com.conf
# RUN service nginx stop
# RUN service nginx start
