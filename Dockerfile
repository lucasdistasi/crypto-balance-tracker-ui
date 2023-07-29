FROM node:20-alpine
ENV NODE_ENV=production
WORKDIR /crypto-balance-tracker-ui
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "serve"]