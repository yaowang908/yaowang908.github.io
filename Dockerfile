FROM oven/bun:1.3.3 AS build
WORKDIR /app
COPY package.json bun.lock ./
ENV HUSKY=0
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

FROM caddy:2-alpine
COPY deploy/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv
EXPOSE 8080
