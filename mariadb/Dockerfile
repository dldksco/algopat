FROM mariadb:10

COPY ./config /etc/mysql/conf.d

ENV MARIADB_DATABASE=<your-database>

ENV MARIADB_ROOT_PASSWORD=<your-password>

VOLUME /var/lib/mysql

EXPOSE 3306

