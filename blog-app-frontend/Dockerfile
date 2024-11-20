# Use Node.js base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the entire application code
COPY . .

# Build the frontend application
RUN npm run build

# Expose port 3000 for the application
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
