# Bookstore

This node and express app represents transactions in a bookstore.

Technologies used include:

- [node](https://nodejs.org/en)
- [express](https://expressjs.com/)
- [postgres](https://www.postgresql.org/)
- [prisma](https://www.prisma.io/)
- [zod](https://zod.dev)

## Run the project

1. Create a `.env` file in the project root. Use this template:

```bash
POSTGRES_HOST=localhost
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_PORT=5432
POSTGRES_DB=bookstore

# Variable expansion works for prisma with dotenv-expand
# https://www.prisma.io/docs/orm/more/development-environment/environment-variables#expanding-variables
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}
```

2. Install dependencies with `pnpm`

```
pnpm install
```

3. Apply the database migrations

```
pnpm exec prisma migrate dev
```

4. Launch the database

```
docker compose up -d
```

5. Launch the server

```
pnpm run dev
```

The server will be accessible at http://localhost:3000 and will watch for changes in your files as you develop.

### Running in production mode

Production mode will disable detailed logging for 500 errors.

```
pnpm start
```
