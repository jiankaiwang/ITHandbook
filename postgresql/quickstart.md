# PostgreSQL Quickstart



## Installation



The following is the step to install the postgresql.



### On Linux (Ubuntu 16.04)

The following content is based on postgresql v9.5.

```shell
$ sudo apt-get update
$ sudo apt-get install postgresql 

# verify the installation
$ psql --version
```



## Preparation



The following is the step to establish the database and its tables.



### Configurate the server

*   main configuration

```shell
# the main configurated file
$ sudo vim /etc/postgresql/(version)/main/postgresql.conf
```

*   allow all IP connection configuration

```shell
# the main configurated file
$ sudo vim /etc/postgresql/9.5/main/postgresql.conf

# allow all IP
listen_addresses = '*' 
```

```ini
# edit the server configurated file
$ sudo vim /etc/postgresql/9.5/main/pg_hba.conf

# add the following conf to allow all IP
host    all             all             0.0.0.0/0            md5
```

```shell
# reload the configuration by restarting the service
$ sudo systemctl restart postgresql.service
```



### Superuser

*   The first step is to set superuser's password.

```shell
# default superuser is postgres
$ sudo -u postgres psql
```

```sql
/* set superuser's password, for example is POSTGRESQL */
postgres=# ALTER USER postgres PASSWORD 'POSTGRESQL';
ALTER ROLE
```

*   If there is authentication failed for user "postgres", you would edit the configuration in **pg_hba.conf**.

```shell
$ sudo vim /etc/postgresql/9.5/main/pg_hba.conf
```

```ini
# Database administrative login by Unix domain socket
local   all             postgres                                md5
```

```shell
# reload the configuration by restarting the service
$ sudo systemctl restart postgresql.service
```



### Create a User



*   Create a user.

```shell
# create a user named postgreuser
# -S : User will not be a superuser
# -D : User cannot create databases
# -R : User cannot create other roles (users)
# -P : Prompt to create a password for the user
$ sudo -u postgres createuser -S -D -R -P example

# create a database (named example, exampledb2) and assign it to the specific user
# -O : Owner - the user that owns the database
# -E : Encoding - almost always UTF8
$ sudo -u postgres createdb -O example example -E utf-8
$ sudo -u postgres createdb -O example exampledb2 -E utf-8
```



*   If there is authentication failed for user "example", you would edit the configuration in **pg_hba.conf**.

```shell
$ sudo vim /etc/postgresql/9.5/main/pg_hba.conf
```

```ini
# TYPE  DATABASE        USER            ADDRESS                 METHOD
# "local" is for Unix domain socket connections only
local   all             all                                     md5
# IPv4 local connections:
host    all             all             127.0.0.1/32            md5
host    all             all             0.0.0.0/0               md5
# IPv6 local connections:
host    all             all             ::1/128                 md5
```

```shell
# reload the configuration by restarting the service
$ sudo systemctl restart postgresql.service
```



## Operations



### Login the server

```shell
# psql –h <host|IP> -p <5432> –U <acc> 
$ psql -h localhost -p 5432 -U example
```



### Database Operations

```sql
/* List Databases */
> \list

/* Connect to the specific database */
> \connect <dbname>
```



###Relation(Table) Operations

```sql
/* list table */
> \dt

/* table info */
> \d+ <table>
```

