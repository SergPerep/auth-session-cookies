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
* PG_DATABASE=auth_sessions_cookies