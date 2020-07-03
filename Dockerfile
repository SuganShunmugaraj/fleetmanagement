FROM ruby:2.5 AS translator
ENV HTTP_PROXY http://proxy.devops.kion.cloud:8080
ENV HTTPS_PROXY http://proxy.devops.kion.cloud:8080
RUN gem install web_translate_it
WORKDIR /workshop-translator
COPY /src/assets/locales/.wti .
ARG CACHEBUST=1
RUN wti pull UI/work*

FROM node:11-alpine AS builder
COPY . ./workshop-app
WORKDIR /workshop-app
RUN npm install
RUN npm rebuild node-sass
RUN npm run build --prod

FROM nginx:1-alpine
COPY --from=builder /workshop-app/dist/angular-latest /usr/share/nginx/html
COPY --from=translator /workshop-translator/UI /usr/share/nginx/html/assets/locales/UI
EXPOSE 80