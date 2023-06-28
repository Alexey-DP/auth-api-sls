# Auth API

## REST API for registering and authorizing users using JWT tokens.

Initiate clone project

Init dependencies:

`npm i`

Create `.env` file and add:

`PORT=<server port>`

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

## API routes:

### AUTH API:

`POST $/auth/sign-up` - users registration

Body:

{"email": "example@mail.com", "password": "Mypassword1"}

`POST $/auth/sign-in` - login

Body:

{"email": "example@mail.com", "password": "Mypassword1"}

`GET $/me` - users info (must be authorization header)

### FIND USER COUNTRY BY IP:

`GET $/country` - users ip/country

### JSON STORAGE

`PUT $/store_bucket/:link` - put JSON data to store

Body: any JSON

`GET $/store_bucket/:link` - get JSon data from store

### SHORTLINKER API

`POST $/short` - get short link

Body:

{ "originalLink": "https://long-link.com"}

`GET $/short/:link` - go to original link
