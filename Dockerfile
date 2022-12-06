FROM node:16.10-alpine as npm-modules

ENV NODE_ENV=production

WORKDIR /usr

COPY package*.json ./
#install modules
RUN npm ci --omit=dev

# install tini
RUN apk add --no-cache tini

EXPOSE 3000

COPY . ./

#start app as user "node"
USER node
CMD /sbin/tini -- node \
  dist/server.js
