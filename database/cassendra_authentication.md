# Configure Cassandra Authentication

<script type="text/javascript" src="../js/general.js"></script>

* refer to [official page](http://docs.datastax.com/en/cassandra/2.1/cassandra/security/security_config_native_authenticate_t.html)

### Configurate the authenticator option
---

* edit `/etc/cassandra/cassandra.yaml`

```conf
# search and the following setting
# default is AllowAllAuthenticator
authenticator: PasswordAuthenticator
```

### Increase replication factor
---

* increase the `replication factor` to prevent the only one node (default node count is 1) going down, refer to [more info](https://jiankaiwang.gitbooks.io/itsys/content/database/cassandra_data_replication.html)

```bash
# login the cassendra service
$ cqlsh localhost
```

* one datacenter increases the replication factors

```sql
# NetworkTopologyStrategy is better for the future extension
cqlsh > ALTER KEYSPACE system_auth WITH REPLICATION =
  {'class' : 'NetworkTopologyStrategy', 'datacenter1' : 1 };
```

* multiple centers increase the replication factors

```sql
cqlsh > ALTER KEYSPACE system_auth WITH REPLICATION =
  {'class' : 'NetworkTopologyStrategy', 'datacenter1' : 2, 'datacenter2' : 3 };
```


after increase the replication factors, on each affected node, run `nodetool repair`

```bash
$ nodetool repair
```

start `cqlsh` and check replication factor of the `system_auth`

```bash
# login the cassandra service
$ cqlsh localhost

# check replication factor
cqlsh > describe system_auth;

# ...
# CREATE KEYSPACE system_auth WITH replication = { (replication info) }  AND durable_writes = true;
# ...
```

* restart the cassandra service

```bash
$ service cassandra restart
```

### Create a new cqlsh user
---

```bash
# start and login cqlsh
$ cqlsh -u cassandra -p cassandra

# Create another superuser, not named cassandra.
# Three types of user creating as the following command
# CREATE USER spillman WITH PASSWORD 'Niner27';
# CREATE USER akers WITH PASSWORD 'Niner2' SUPERUSER;
# CREATE USER boone WITH PASSWORD 'Niner75' NOSUPERUSER;
cqlsh > CREATE USER spark WITH PASSWORD 'spark' SUPERUSER;

# modify the account cassandra password
cqlsh > alter user cassandra with password 'csdPWD';

# modify default cassandra superuser to nosuperuser
# by others superuser account
cqlsh > alter user cassandra nosuperuser;
```







