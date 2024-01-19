# # Use an official Node.js runtime as the base image
# FROM node:14

# RUN apt-get update
# RUN apt-get install nginx -y
# #RUN service nginx start 
# RUN apt-get install nano -y
# # Set the working directory in the container
# WORKDIR /app

# # Copy package.json and package-lock.json to the container
# COPY package*.json ./

# # Install frontend dependencies
# RUN npm install

# #Create a build
# #RUN npm build

# #RUN cp -r ./build /var/www/html/
# # Copy the rest of the frontend application code to the container
# COPY . .

# # Add a command to run the clean script before starting the server
# #RUN npm run clean


# # Expose port 3000 for the frontend servic
# EXPOSE 3000
# # Command to start the frontend service

# # Command to start the frontend service
# CMD ["npm", "start"]
# # RUN cp /app/nginx/colstonconcepts.com.conf /etc/nginx/sites-available/
# # RUN mv /app/nginx/nginx.conf /etc/nginx/
# # RUN mv /app/nginx/cert.conf /etc/nginx/snippets/
# # RUN mv /app/nginx/ssl-params.conf /etc/nginx/snippets
# # RUN ln -s /etc/nginx/sites-available/colstonconcepts.com.conf /etc/nginx/sites-enabled/colstonconcepts.com.conf
# # RUN service nginx stop
# #RUN service nginx start












#Build stage
FROM node:14 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
