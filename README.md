# Apiary register

There is a simple react + node app, which allows us to add apiary and show all apieries with filters and sort ability.

## Configuration

Basic thing to do is to create `.env` files in `packages/frontend` and `packages/backend`, examples are available in these directories.

### Backend .env

**PORT** - port of backend

**ADDRESS** - host address of backend

### Frontend .env

**REACT_APP_BACKEND_URL** - url of running backend

## Run with Docker

To run quickly just run:

```
docker compose up
```

Keep ports 3000 and 8000 free for app.

To run docker in a background run:

```
docker compose up -d
```

## Run without Docker

You need to have pnpm installed. If you do not have it just run:

```
npm i -g pnpm@7.1.9
```

Next in the root folder of project run:

```
pnpm install 
pnpm build
```

It installs depedencies and builds backend and frontend.

The last thing is starting app, to do it run:

```
pnpm start
```

In the backend folder `packages/backend` and after that in the `packages/frontend`

## Testing

To run tests just run:

```
pnpm test
```

In the root folder of project.

## Linter

To run linter just run:

```
pnpm lint
```

In the root folder of project.
