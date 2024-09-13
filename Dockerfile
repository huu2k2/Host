
# # Use an official Node.js runtime as a parent image
# FROM node:20.12.2 as build

# # Set the working directory in the container
# WORKDIR /app

# # Copy the package.json and package-lock.json files to the working directory
# COPY package*.json ./

# # Install the project dependencies
# RUN npm install -g npm@latest
# RUN npm install 
# # Copy the rest of the application code to the working directory
# COPY . .

# # Build the React application
# RUN npm run build

# # Use an official Nginx runtime as a parent image
# FROM nginx:alpine

# # Copy the built React application from the build stage
# COPY --from=build /app/build /usr/share/nginx/html

# # Copy the custom Nginx configuration file to the container
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Expose port 80 to the outside world
# EXPOSE 80

# # Command to run the Nginx server
# CMD ["nginx", "-g", "daemon off;"]


FROM node:20.12.2 as build
 
WORKDIR /usr/src/app
 
COPY package*.json ./
 
RUN npm install
 
COPY . .
 
EXPOSE 3000
 
CMD [ "npm", "start" ]

