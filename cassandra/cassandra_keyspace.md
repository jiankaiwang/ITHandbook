# Keyspace

## Create a keyspace

* Strategy.1 : create a keyspace named `examplekp` on `SimpleStrategy ` with `1` RF.

```sql
# create a SimpleStrategy with replication_factor
cqlsh > CREATE KEYSPACE examplekp WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : '1'};
```

* Strategy.2 (**Suggested**) : Create a keyspace named `examplekp` on `NetworkTopologyStrategy` with `1` RF in `datacenter1`.

```sql
# create a NetworkTopologyStrategy with 1 RF in datacenter1
# DURABLE_WRITES : data written to the keyspace goes through the commit log (default is true)
cqlsh > CREATE KEYSPACE examplekp WITH replication = {'class': 'NetworkTopologyStrategy', 'datacenter1' : '1'} AND DURABLE_WRITES = true;
```

* Verify the keyspace

```sql
cqlsh > describe examplekp;
```








