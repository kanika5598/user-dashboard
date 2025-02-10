FROM node:18-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code into the container
COPY . .

# Build the Next.js application
RUN npm run build

# Production image, copy all the files needed for production in order to reduce the image size
FROM node:18-alpine AS runner

# Set the working directory
WORKDIR /app

# Copy only the necessary files, nextjs by default creates a standalone folder with all the production ready files.
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Expose the port the app listens on
EXPOSE 3000

# Define environment variables
ENV NODE_ENV production

# Start the app
CMD [ "npm", "run", "start" ]