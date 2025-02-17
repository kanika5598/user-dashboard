FROM node:18-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY frontend-ui/package*.json ./

# Install dependencies
RUN npm install

# Copy the application code into the container
COPY frontend-ui/ ./

# Build the Next.js application
RUN npm run build

# Production image, copy all the files needed for production in order to reduce the image size
FROM node:18-alpine AS runner

# Set the working directory
WORKDIR /app

# Copy only the necessary files, nextjs by default creates a standalone folder with all the production ready files.
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./

# Install only production dependencies
RUN npm install

# Expose the port the app listens on
EXPOSE 3000

# Start the app
CMD [ "npm", "run", "start" ]