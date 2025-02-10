FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the port the app listens on
EXPOSE 4000

# Define environment variables
ENV NODE_ENV production

# Start the app
CMD [ "npm", "run", "start:prod" ]