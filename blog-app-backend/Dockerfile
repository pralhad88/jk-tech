FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install all dependencies
# A wildcard is used to ensure both package.json and package-lock.json are copied
# Where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Expose port 8080 for the application
EXPOSE 5000

# Create a "dist" folder with the production build
RUN npm run build

# Start the service using the production build
CMD ["node", "dist/main.js"]