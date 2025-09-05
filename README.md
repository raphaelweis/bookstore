# Bookstore

This node and express app represents transactions in a bookstore.

Technologies used include:

- [node docs](https://nodejs.org/en)
- [express docs](https://expressjs.com/)
- [postgres docs](https://www.postgresql.org/docs/)
- [prisma](https://www.prisma.io/)

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

