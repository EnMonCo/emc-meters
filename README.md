# EnMonCo Meters API

## Description

NestJS REST API server for EnMonCo meters

## Table of Contents

- [Quick run](#quick-run)
- [Comfortable development](#comfortable-development)
- [Links](#links)
- [Automatic update of dependencies](#automatic-update-of-dependencies)
- [Database utils](#database-utils)
- [Tests](#tests)

## Quick run

```bash
git clone https://github.com/EnMonCo/emc-meters.git
cd emc-meters/
cp env-example .env
docker-compose up -d
```

For check status run

```bash
docker-compose logs
```

## Comfortable development

```bash
git clone https://github.com/EnMonCo/emc-meters.git
cd emc-meters/
cp env-example .env
```

Change `DATABASE_HOST=postgres` to `DATABASE_HOST=localhost`

Change `MAIL_HOST=maildev` to `MAIL_HOST=localhost`

Run additional container:

```bash
docker-compose up -d postgres maildev redis
```

```bash
npm install

npm run migration:run

npm run seed:run

npm run start:dev
```

## Links

- Swagger: http://localhost:8001/docs
- Maildev: http://localhost:1080

## Automatic update of dependencies

Сonnect [Renovate](https://github.com/marketplace/renovate) for your project.

## Database utils

Generate migration

```bash
npm run migration:generate -- CreateNameTable
```

Run migration

```bash
npm run migration:run
```

Revert migration

```bash
npm run migration:revert
```

Drop all tables in database

```bash
npm run schema:drop
```

Run seed

```bash
npm run seed:run
```

## Tests

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e
```

## Tests in Docker

```bash
docker-compose -f docker-compose.ci.yaml --env-file env-example -p ci up --build --exit-code-from api && docker-compose -p ci rm -svf
```
