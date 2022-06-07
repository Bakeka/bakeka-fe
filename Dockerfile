FROM node:18-alpine as builder
WORKDIR /bakeka
COPY . .
RUN yarn && yarn build

FROM caddy:2-alpine
WORKDIR /bakeka
COPY --from=builder /bakeka/dist ./dist
EXPOSE 8080
ENTRYPOINT ["caddy", "file-server", "--listen", ":8080", "--root", "/bakeka/dist"]
