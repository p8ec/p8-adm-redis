#!/bin/sh

### This script is used to setup a name for a new migration, used for typeorm migration:create

### Get last commit message and replace all non-alphanumeric characters with underscores

LAST_COMMIT_MESSAGE=$(git log -1 --pretty=%B | sed -e 's/[^[:alnum:]]/_/g')

### Show user input prompt with last commit message as default value:

read -p "Enter migration name (default: $LAST_COMMIT_MESSAGE): " MIGRATION_NAME

### If user input is empty, use last commit message as migration name:

if [ -z "$MIGRATION_NAME" ]; then
  MIGRATION_NAME=$LAST_COMMIT_MESSAGE
fi

echo "$MIGRATION_NAME"
export MIGRATION_NAME=$MIGRATION_NAME

### Run typeorm migration:create with the migration name:

set -x
ts-node node_modules/.bin/typeorm -d src/database/config/datasource.ts migration:generate src/database/migrations/$MIGRATION_NAME
