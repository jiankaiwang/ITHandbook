# Configure Cassandra Authentication

<script type="text/javascript" src="../js/general.js"></script>

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

and use the following procedures to increase the replication factors

```sql
/* 
 * desc : Update a keyspace in the cluster and change its replication strategy options. 
 * dc : data center
 */
cqlsh > ALTER KEYSPACE system_auth WITH REPLICATION =
  {'class' : 'NetworkTopologyStrategy', 'datacenter1' : 3 };
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
# CREATE KEYSPACE system_auth WITH replication = {'class': 'NetworkTopologyStrategy', 'datacenter1': '3'}  AND durable_writes = true;
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

```







