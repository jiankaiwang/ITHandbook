# Quick Start



## Architecture

```sql
/* command infomation */
help
help CREATE

/* show cluster, keyspace or table information */
describe cluster
describe keyspaces
describe tables

/* current version */
show version

/* connect to the cassandra database */
cqlsh localhost

/* database architecture - example.1 */
select cluster_name, listen_address from system.local;
create KEYSPACE test_keyspace with replication = {'class': 'SimpleStrategy', 'replication_factor': 1 };
create KEYSPACE join_keyspace with replication = {'class': 'NetworkTopologyStrategy', 'dc1': 3 };
use test_keyspace;

/* database architecture - example.2 */
create KEYSPACE partial_keyspace with replication = {'class': 'NetworkTopologyStrategy', 'dc1': 2 };
use partial_keyspace;

/* data_center name */
use system;
select data_center from local;
```



## Table Operation

```sql
CREATE TABLE user (first_name text, last_name text, primary key(first_name));
describe table user;
INSERT INTO user (first_name, last_name) VALUES ( 'Joe','Hsu');
select * from user where first_name='Joe';
select count(*) from user;
DELETE last_name from user WHERE first_name='Joe';
TRUNCATE user;
drop table user;
desc tables;
ALTER TABLE user ADD title text;
INSERT INTO user(first_name , last_name , title ) VALUES ( 'Chang', 'Wen-Ting', 'Mrs.');
INSERT INTO user(first_name , last_name) VALUES ( 'Mary','Walejake');
SELECT first_name, last_name, writetime(last_name) from user;
SELECT first_name, last_name, TTL(last_name) from user where first_name = 'Mary' ;
CREATE TABLE user (first_name text, last_name text, middle_name text, primary key(first_name));
INSERT INTO user (first_name, last_name, middle_name) VALUES ( 'Joe','Hsu','null' );
UPDATE user SET middle_name='Peter' WHERE first_name ='Joe';
```



## Data Type

```sql
/* string */
UPDATE user USING TTL 3600 SET last_name='Hue' WHERE first_name = 'Mary' ;
ALTER TABLE user ADD id uuid;
UPDATE user SET id = uuid() WHERE first_name='Mary';

/* set */
ALTER TABLE user ADD emails set<text>;
UPDATE user SET emails ={'joe@example.com','joe2@mail.com'} WHERE first_name ='Mary';
SELECT emails FROM user WHERE first_name='Mary' ;

/* lists */
ALTER TABLE user ADD phone_numbers list<text>;
UPDATE user SET phone_numbers=['02-2782-1234'] where first_name ='Mary' ;
UPDATE user SET phone_numbers = phone_numbers + ['07-371-8888'] WHERE first_name ='Mary';

/* user defined */
CREATE TYPE address(street text, city text, state text, zip_code int);
ALTER TABLE user ADD addresses map<text,frozen<address>>;
UPDATE user SET addresses= addresses + {'home':{street:'7712 E. haha Road', city:'Taaa',state:'AW',zip_code:55678}} WHERE first_name='Mary';
```



## Access Cassandra Service



```shell
# find nodes with replicated data
$ nodetool getendpoints <keyspace> <table> <key>;
$ nodetool getendpoints partial_keyspace user middle_name;

# find nodes
$ nodetool status | awk '/^(U|D)(N|L|J|M)/{print $2}'
$ nodetool status | awk '/^(U)(N|L|J|M)/{print $2}'
$ nodetool status | awk '/^(D)(N|L|J|M)/{print $2}'
```

