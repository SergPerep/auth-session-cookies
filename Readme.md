
# Set up
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