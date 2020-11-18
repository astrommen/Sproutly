#PART ONE
# compiling step
FROM node:buster AS frontend

# make WORKDIR 
WORKDIR /app

# copy current files to container
COPY . .

# run any commands (install package.json & angular cli)
RUN npm install && npm install -g @angular/cli

# build app on container
RUN ng build --prod


#PART 2
# compile webserver (webhost)
FROM nginx:latest

# copy from prev step
COPY --from=frontend /app/dist/Sproutly /usr/share/nginx/html

# use port:80
EXPOSE 80