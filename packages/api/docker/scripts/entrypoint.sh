#!/bin/sh

MIGRATION_DONE_FLAG=migration.done
export NODE_ENV=production

if [ ! -f "${MIGRATION_DONE_FLAG}" ]; then
  echo "ENTRYPOINT: Running migration"
  npm run prod:migration && touch "${MIGRATION_DONE_FLAG}"
else
  echo "ENTRYPOINT: Skipping migration"
fi

npm run prod:start
