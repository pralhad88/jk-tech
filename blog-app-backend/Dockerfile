FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy dependency files first for caching
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Start the service using the production build
CMD ["node", "dist/main.js"]
