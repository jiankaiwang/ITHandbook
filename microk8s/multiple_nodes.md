# Multiple Nodes

## Adding a Node

Use `microk8s.add-node` to be a master of the cluster and generate the token for other nodes to join the cluster.

```sh
#
# output
# If the node you are adding is not reachable through the default interface you can use one of the following:
# microk8s.join 172.17.34.93:25000/KAoGjjmgqtNajXZLSeOfyjSNXReioooZ
# microk8s.join 172.18.0.1:25000/KAoGjjmgqtNajXZLSeOfyjSNXReioooZ
# microk8s.join 10.1.46.0:25000/KAoGjjmgqtNajXZLSeOfyjSNXReioooZ
$ microk8s.add-node
```

Register a node to an existing master. **If you want to add more than one node, you have to execute `microk8s.add-node` many times.** 

```sh
# Join a cluster: microk8s.join <master>:<port>/<token>
$ microk8s.join 172.17.34.93:25000/KAoGjjmgqtNajXZLSeOfyjSNXReioooZ
```

After joining other nodes, you can inspect all nodes using `microk8s.kubectl get node` only on the master node.

```sh
# NAME             STATUS     ROLES    AGE   VERSION
# 172.17.34.125    Ready      <none>   79s   v1.17.3
# 172.17.34.126    NotReady   <none>   8s    v1.17.3
# h81m-s2ph        Ready      <none>   26h   v1.17.3
$ microk8s.kubectl get node
```

## Removing a Node

You can remove the node using the `microk8s.remove-node` command.

```sh
$ microk8s.remove-node 172.17.34.126
```

On the leaving node, you can run the following command to restart its own control.

```sh
$ microk8s.leave
```