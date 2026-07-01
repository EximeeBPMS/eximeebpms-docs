ARG HUGO_VERSION=0.162.0
FROM ghcr.io/gohugoio/hugo:v${HUGO_VERSION} AS builder

USER root
RUN apk add --no-cache git bash

WORKDIR /project
COPY . .

RUN git config --global --add safe.directory /project \
    && chmod +x generate-versions.sh build-docker.sh \
    && ./generate-versions.sh \
    && ./build-docker.sh

FROM nginx:1.27-alpine
COPY --from=builder /project/public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
