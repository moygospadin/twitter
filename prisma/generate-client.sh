#!/bin/bash

PRISMA_CLIENT_DIR=./prisma/$1
PRISMA_CLIENT_DB_URL=$2

if [[ -z "$PRISMA_CLIENT_DIR" ]]; then
    echo "PRISMA_CLIENT_DIR not passed"
    exit 1
fi

if [[ -z "$PRISMA_CLIENT_DB_URL" ]]; then
    echo "PRISMA_CLIENT_DB_URL not passed"
    exit 1
fi

if [ -d "$PRISMA_CLIENT_DIR" ]; then
  cd $PRISMA_CLIENT_DIR
  npx prisma db pull
  npx prisma generate
else
  mkdir -p $PRISMA_CLIENT_DIR
  cd $PRISMA_CLIENT_DIR
  echo -e "generator client {\n  provider = \"prisma-client-js\"\n  output = \"../../node_modules/@prisma/$1\" \n} \n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"${PRISMA_CLIENT_DB_URL^^}\")\n}" > schema.prisma
  npx prisma db pull
  npx prisma generate
fi
