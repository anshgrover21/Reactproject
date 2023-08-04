# Use a lightweight Node.js image as the base
FROM node:lts-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Vite application
RUN npm run build

# Expose the port that the application will run on
EXPOSE 8080

# Command to run the application
CMD ["npm", "run" , "dev"]
