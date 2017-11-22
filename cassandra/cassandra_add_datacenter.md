# Add a datacenter to a cluster

* Refer to 
    * [http://docs.datastax.com/en/archived/cassandra/2.0/cassandra/operations/ops_add_dc_to_cluster_t.html](http://docs.datastax.com/en/archived/cassandra/2.0/cassandra/operations/ops_add_dc_to_cluster_t.html)
    * [https://www.digitalocean.com/community/tutorials/how-to-run-a-multi-node-cluster-database-with-cassandra-on-ubuntu-14-04](https://www.digitalocean.com/community/tutorials/how-to-run-a-multi-node-cluster-database-with-cassandra-on-ubuntu-14-04)

## Procedure

* Make sure all datacenter use the same cassandra version

```bash
# find release_version from the system.local table
cqlsh > select release_version from system.local;
```

* Ensure keyspaces are using `NetworkTopologyStrategy`. 
Creating a new keyspace refer to [page](https://jiankaiwang.gitbooks.io/itsys/content/database/cassandra_keyspace.html). 
Altering the keyspace refer to the [page](https://jiankaiwang.gitbooks.io/itsys/content/database/cassendra_authentication.html#h3_1).

```bash
cqlsh > describe <keyspace_name>;
```

* Configure cassandra service

```bash
# edit the service property
$ sudo vim /etc/cassandra/cassandra.yml
```

and edit the configuration as following;

1. add `auto_bootstrap: false` to the bottom of the configuration :
By default, this setting is true and **not listed** in the `cassandra.yaml file`. Setting this parameter to false prevents the new nodes from attempting to get all the data from the other nodes in the data center. When you run `nodetool rebuild` in the last step, each node is properly mapped.














