# Auth API

## REST API for registering and authorizing users using JWT tokens.

Initiate clone project

Init dependencies:

`npm i`

Create `.env` file and add:

`SERVER_PORT=<server port>`

`PG_HOST=<postgres host>`

`PG_PORT=<postgres port>`

`PG_USER=<postgres users name>`

`PG_PASSWORD=<postgres users password>`

`PG_DATABASE=<postgres database name>`

`JWT_ACCESS_SECRET=<jwt secret>`

`JWT_REFRESH_SECRET=<jwt secret>`

`JWT_ACCESS_TTL=60` - minutes

### Start server

`npm start`
