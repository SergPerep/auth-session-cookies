# Authorization with sessions and cookies

## Install dependencies
cd client
npm i

cd server
npm i

## Set up database
Run in CL postgres content of the server/db-setup.sql

## Set up .env
Create inside server folder .env and add define inside:
* PORT=5000
* JWT_SECRET=[Secret for JWT generation]
* PG_USER=postgres
* PG_HOST=localhost
* PG_PORT=[probably "5432"]
* PG_DATABASE=auth_session_cookies


# Database setup
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