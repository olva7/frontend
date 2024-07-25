# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:18-alpine as build

# Set the working directory
WORKDIR /app

COPY package.json package-lock.json ./

# Add the source code to app
COPY . .

# Install all the dependencies
RUN npm install -f

RUN npm run build


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:1.21.0-alpine
RUN apk add vim
# Copy the build output to replace the default nginx contents.
COPY --from=build /app/dist/sakai-ng /usr/share/nginx/html
