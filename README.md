

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


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
