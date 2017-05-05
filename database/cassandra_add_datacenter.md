# Add a datacenter to a cluster

<script type="text/javascript" src="../js/general.js"></script>

### Procedure
---

* Make sure all datacenter use the same cassandra version

```bash
# find release_version from the system.local table
cqlsh > select release_version from system.local;
```

* Ensure keyspaces are using `NetworkTopologyStrategy`

```bash

```












