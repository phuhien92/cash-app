FROM node:16-alpine
WORKDIR /cash-app-clone
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN npm run build
CMD npm run start 