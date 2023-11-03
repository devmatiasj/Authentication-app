

## Requirements
Node.js and npm installed
MongoDB installed and runing locally

## Installation

```bash
$ npm install
```
```bash
$ mongorestore --db nombre-de-la-base-de-datos dump/nombre-de-la-base-de-datos
```

## Running the app

```bash
# development
$ npm run start
```

## Use

Using the shared postman collections, the login endpoint should be executed with the parameters already configured (user root) and use the token returned in the other requests (the token should be added in the 'authorization' header with the format: Bearer *token* )

