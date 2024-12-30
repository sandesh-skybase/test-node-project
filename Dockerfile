# Use an official Node.js runtime version 20 as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Define the command to run prisma generate, prisma migrate, and then start the app
CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && npm start"]
