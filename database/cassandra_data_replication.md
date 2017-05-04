# Data Replication

<script type="text/javascript" src="../js/general.js"></script>

Cassandra stores replicas on multiple nodes to ensure reliability and fault tolerance. A replication strategy determines the nodes where replicas are placed. 

### Replication factor
---

The total number of replicas across the cluster is referred to as the replication factor. All replicas are equally important; there is no primary or master replica. **Generally the replication factor should not exceed the number of nodes in the cluster.**

* Replication Factor of 1 : means that there is only one copy of each row in the cluster.
    * If the node containing the row goes down, the row cannot be retrieved.

* Replication factor of 2 : means two copies of each row, where each copy is on a different node.

### Replication strategies
---

* SimpleStrategy : Use only for a single datacenter and one rack. **If you ever intend more than one datacenter, use the `NetworkTopologyStrategy`.**
    * SimpleStrategy places the first replica on a node determined by the partitioner. Additional replicas are placed on the next nodes clockwise in the ring without considering topology.

* NetworkTopologyStrategy (Suggested) : Highly recommended for most deployments because it is much easier to expand to multiple datacenters when required by **future expansion**.
    * NetworkTopologyStrategy places replicas in the same datacenter by walking the ring clockwise until reaching the first node in another rack. 
    * NetworkTopologyStrategy attempts to place replicas on distinct racks because nodes in the same rack (or similar physical grouping) often fail at the same time due to power, cooling, or network issues.

### Visualization
---

* Data center, Rock and Node

![](/images/cassandra_strategies.jpg)


* SimpleStrategy

![](/images/cassandra_simplestrategy.jpg)

* NetworkTopologyStrategy

![](/images/cassandra_networktopologystrategy.jpg)






















