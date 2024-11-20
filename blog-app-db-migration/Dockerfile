FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy dependency files first for caching
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Start the service using the production build
CMD ["npm", "run", "db:migrate-up"]
