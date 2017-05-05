# Keyspace

<script type="text/javascript" src="../js/general.js"></script>

### Create a keyspace
---

* create a keyspace named `examplekp` on `NetworkTopologyStrategy` with `1` RF.

```sql
cqlsh > CREATE KEYSPACE examplekp WITH replication = {'class': 'NetworkTopologyStrategy', 'replication_factor' : '1'};
```









