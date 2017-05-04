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

* increase the `replication factor` to prevent the only one node (default node count is 1) going down, and no longer login the service again. A replication factor of 1 means that there is only one copy of each row in the cluster. A replication factor of 2 means two copies of each row, where each copy is on a different node.

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
  {'class' : 'NetworkTopologyStrategy', 'dc1' : 3, 'dc2' : 2};
```

after increase the replication factors, on each affected node, run `nodetool repair`

```bash
$ nodetool repair
```











