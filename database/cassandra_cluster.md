# Cluster

<script type="text/javascript" src="../js/general.js"></script>

### Main Architecture
---

![](/images/cassandra_arch.jpg)

### Create a cluster
---

* Deleting default data

```bash
# stop the server
$ sudo service cassandra stop

# delete default dataset
$ sudo rm -rf /var/lib/cassandra/data/system/*
```

* Configure the cluster

```bash
# edit the configuration
$ sudo vim /etc/cassandra/cassandra.yaml
```

and configure parameters as the following,

1. `cluster_name` : the name of the cluster
2. `-seeds` : comma-delimited list of IP of each node in the cluster
3. `listen_address` : the ip address that other nodes in the cluster will use to connect to this one
4. `rpc_address` : The ip address for rpc(remote procedure calls). Default is `localhost` and leave this as is. Otherwise, change to server's IP address or the loopback address (`127.0.0.1`).
5. `endpoint_snitch` : Name of snitch, which tells cassandra about what its network looks like. Default is `SimpleSnitch`, which is used for networks in one datacenter. Change it to `GossipingPropertyFileSnitch` for multiple datacenters and it is preferred for production setups.
6. `auto_bootstrap` : The directive is not in the configuration file, so it has to be added and set to false.

```conf
. . .

cluster_name: 'CassandraDOCluster'

. . .

seed_provider:
  - class_name: org.apache.cassandra.locator.SimpleSeedProvider
    parameters:
         - seeds: "your_server_ip,your_server_ip_2,...your_server_ip_n"

. . .

listen_address: your_server_ip

. . .

rpc_address: your_server_ip

. . .

endpoint_snitch: GossipingPropertyFileSnitch

. . .
```

and add the `auto_bootstrap: false` on the bottom of the configuration file

* Configure the firewall

```bash
# start the service
$ sudo service cassandra start

# check the state of the cluster
# maybe only local node listed due to not yet communicating with other nodes
$ sudo nodetool status
```

the possible information may be the below,

```bash
jkw@UbuntuServer1604:~$ nodetool status
Datacenter: dc1
===============
Status=Up/Down
|/ State=Normal/Leaving/Joining/Moving
--  Address       Load       Tokens       Owns (effective)  Host ID                               Rack
UN  192.168.3.16  154 KiB    256          0.0%              49444441-10d0-4817-bb15-734f291c0702  rack1
```

in order to communicate with other nodes, we will need to open network ports for each node:

1. `7000` : TCP port for commands and data
2. `9042` : TCP port for the native transport server and `cqlsh`, the cassandra command line untity, will connect to the cluster through it.

edit the firewall rules,

```bash
# edit the iptables
$ sudo vim /etc/iptables/rules.v4
```

and add the following rule within the INPUT chain,

```conf
# add the rule
-A INPUT -p tcp -s your_other_server_ip -m multiport --dports 7000,9042 -m state --state NEW,ESTABLISHED -j ACCEPT
```

after configurate the rule, restart the firewall service

```bash
$ sudo service iptables-persistent restart
```

* Check the Cluster Status

```bash
# After we configure all nodes, type the command to check the status.
$ sudo nodetool status

# connect to the cassandra server
$ cqlsh your_server_ip 9042
```

















