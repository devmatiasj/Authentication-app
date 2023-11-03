FROM node:20-slim

WORKDIR /kenility-challenge

COPY package.json package-lock.json /kenility-challenge/
RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
RUN npm install bcrypt --build-from-source
RUN npm install

COPY . /kenility-challenge/

EXPOSE 3000

CMD ["npm", "start"]