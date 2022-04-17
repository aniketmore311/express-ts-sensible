# Express-ts-sensible

## Simple, minimal and unopinionated express-ts starter template for you next express REST API

### To use this starter run :

1. `$ npx degit aniketmore311/express-ts-sensible <your project name>`
2. `$ cd <your project name>`
3. `$ cp .env.example .env`
4. `$ npm install`
5. `$ npm start`

### This starter includes

- sensible error handler and 404 handler for express REST API
- `dotenv` for environment variables
- `morgan` for logging
- `cors`, `helmet`, `make-promises-safe` for security
- `pm2` as production runtime
- `express-validator` and validation middleware for validation
- `http-errors` for good error handling
- `nodemon`, `ts-node`, `eslint` and `prettier` for ease of development
- Dockerfile for docker support

### This starter does not include

I have purposefully skipped some things to keep the starter as unopinionated as possible because my own preference might not be what you need.

1. logging - there are muliple loggers for the ts ecosystem [pino](https://github.com/pinojs/pino) and [winston](https://github.com/winstonjs/winston) are the most popular
2. testing - there are multiple testing frameworks for ts ecosystem [mocha](https://github.com/mochajs/mocha) and [jest](https://github.com/facebook/jest) are the most popular
