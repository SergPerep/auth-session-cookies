# Authentication with express session
Simple example of express session authentication with cookies. 

## Overview

Client side is a simple react-app that have 3 «pages»: Login page, Signup page and Dashboard page.

User has to autheticate thought Login or Signup pages to reach Dashboard page otherwise he can't access it.

When user interacts with server, it creates a session. Session has an id (session id), which then put in a cookie and sent back to client. Server and client then constantly throw back and forward requests and responses with cookie attacht to them. That way server always knows which user corresponds with which session.

When user is being authenticated, server finds his id (user id) inside database, and adds it to session. Now middleware can check whether corresponding session has user id and let user to Dashboard page.

Basic server API routes are:
- Register `POST` `/auth/register`
- Login `POST` `/auth/login`
- Logout `GET` `/auth/logout`
- Check auth `GET` `/auth/check-auth`

Full list of routes you can check inside [requests.rest](/server/requests.rest). You can use VS Code extension [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) to send requests through that file on a local machine.

## Dependencies
List of modules and packages that are used in this project.
### Server
* [Express](https://github.com/expressjs/express) to manage routes
* [Cors](https://github.com/expressjs/cors) to configure CORS options
* [Express-session](https://github.com/expressjs/session) to manage session and cookies
* [Connect-pg-simple](https://github.com/voxpelli/node-connect-pg-simple) to connect sessions to sessions in postgreSQL database
* [Bcryptjs](https://github.com/dcodeIO/bcrypt.js) to hash paswords
* [Dotenv](https://www.npmjs.com/package/dotenv) to load environmental variables from a `.env` to `process.env`
* [Password-validator](https://github.com/tarunbatra/password-validator) to forse user to use certain format for passwords
* [Email-validator](https://github.com/manishsaraan/email-validator) to check wheather email provided by user is valid one
* [PG](https://github.com/brianc/node-postgres) to connect server to postgreSQL database
* [Nodemon](https://github.com/remy/nodemon) to automaticaly restart server while developing
* [Cookie-parser](https://github.com/expressjs/cookie-parser) to read cookies inside request for debugging
### Client
* [Create react app](https://github.com/facebook/create-react-app) to frontend
* [React-router-dom](https://github.com/remix-run/react-router/tree/main/packages/react-router-dom) to rout and redirect

## Installation
After you cloned repository do these things.

### Install dependencies
For server:
```
npm install --prefix ./server
```
For client:
```
npm install --prefix ./client
```

### Set up .env
Create inside server-folder .env-file and add define inside:
* PG_USER=postgres
* PG_HOST=localhost
* PG_PORT=[probably "5432"]
* PG_DATABASE=auth_session_cookies
* SESS_SECRET=[secret key]

Command that you might want to use to generate SESS_SECRET:
```
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```
### Configure database
I use postgreSQL database for storing both user's info and sessions.

Run this to create database and user table:

```
psql postgres < server/db-startup-setup.sql;
```
Run this to create session tables:

```
psql auth_session_cookies < server/node_modules/connect-pg-simple/table.sql;
```
## License
[MIT](https://choosealicense.com/licenses/mit/)