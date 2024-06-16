# Database Module

## Requirements

```shell
npm i @nestjs/typeorm typeorm pg
```

## Configuration

```dotenv
### Database Configuration
DB_HOST=<dbhost=localhost>
DB_PORT=<dbport=5432>
DB_SCHEMA=<dbschema=public>
DB_NAME=<dbname>
DB_USERNAME=<dbuser>
DB_PASSWORD=<dbpassword>
DB_LOGGING=<dblogging=false>
DB_MODE=<drop|ssl|sync>
DB_TIMEOUT=<dbtimeout=2000>
```

### DB Mode

- `drop`: drops all tables and recreates them
- `ssl`: enables ssl connection
- `sync`: syncs all tables - **DANGER: can cause data loss**

### Example

```dotenv
### Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=postgres
DB_MODE=sync
DB_LOGGING=true
DB_TIMEOUT=2000
```