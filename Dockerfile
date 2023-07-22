FROM node:20-alpine
WORKDIR /crypto-balance-tracker-ui
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]