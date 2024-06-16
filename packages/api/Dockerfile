FROM node:lts-alpine as builder

WORKDIR /opt/app

COPY . .

### required to build such modules as bcrypt on exotic platforms such as arm64
RUN apk add python3-dev make gcc g++

RUN npm install && npm run build

FROM node:lts-alpine

WORKDIR /opt/app

### copy app files
COPY --from=builder /opt/app/dist ./dist
COPY --from=builder /opt/app/node_modules ./node_modules
### copy db files
COPY --from=builder /opt/app/src/database/procedures ./dist/src/database/procedures
COPY --from=builder /opt/app/src/database/triggers ./dist/src/database/triggers

COPY package.json .
COPY docker/scripts/entrypoint.sh .

### provide entrypoint script
ENTRYPOINT "./entrypoint.sh"
