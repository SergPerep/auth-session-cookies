# Authentication with express session
Mini project that uses session-cookie-based authentification. 

Basic functions:
- Register new user
- Login user
- Authenticate user
- Verify user

Full list of routes you can check inside [requests.rest](/server/requests.rest) file.

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
After you clone repo on local mashine you would want to configure several things:
- Install dependencies
- Set up .env
- Configure database
    - To store user info
    - To store sessions


## Install dependencies
For server:
```
npm install --prefix ./server
```
For client:
```
npm install --prefix ./client
```

## Set up .env
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
## Configure database
For main database I use postgreSQL.

```
psql postgres < server/db-startup-setup.sql;
```

### Session tables

To store sessions I use once again postrgeSQL with npm-module connect-pg-simple.

To configure session tables inside auth_session_cookies database use sql-file provided by connect-pg-simple:

```
psql auth_session_cookies < server/node_modules/connect-pg-simple/table.sql;
```

## License
[MIT](https://choosealicense.com/licenses/mit/)