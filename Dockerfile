ARG node_version=14
FROM node:${node_version}-alpine

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV:-production}
RUN echo "Running in ${NODE_ENV} node environment"

# defines user and application folder
USER node
WORKDIR /home/node/webpack-config-organizer

# install dependencies
COPY ["package.json", "package-lock.json", "./"]

# bundle app's source inside docker image
COPY . .

# install the application
RUN npm ci --production=false
