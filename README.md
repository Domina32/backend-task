# backend-task

## Dependencies

-   `postgresql`
-   `nodejs`

## Scripts

-   To run the dev server: `npm run dev`
-   To generate migrations: `npm run migrations:generate`
-   To run existing migrations: `npm run migrations:run`
-   To test the whole application: `npm run test`
-   To run unit tests only: `npm run test-unit`
-   To run integration tests: `npm run test-integration`
    It is recommended to run integration and unit tests separately because integration tests run in sequence and thus are slower.

## Environment variables

The application requires these environment variables to work. Some variables have a fallback. If the variable has a fallback, the default value is provided below.
To define new environment variables, specify them in your environment or use a .env file in the root directory of the project.

> PORT=3001

The server port.

> DB_HOST=localhost

Database host.

> DB_PORT=5432

Database port.

> DB_USER=admin, DB_PASSWORD=admin

Database user and password.

> DB_NAME=default, DB_NAME_TEST=test

The name of the database. DB_NAME_TEST is used by integration tests.

> TOKEN_SECRET

Jwt token secret.

> EMAIL_SENDER

Chosen email address from which to send emails.

> APP_PASSWORD

Nodemailer api key.
