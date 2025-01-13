# Use official Node.js 20 Alpine base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install


# Copy the rest of the application files
COPY . .

# Expose the development server port (default CRA uses 3000)
EXPOSE 3000

# Start the development server
CMD ["npm", "start"]
