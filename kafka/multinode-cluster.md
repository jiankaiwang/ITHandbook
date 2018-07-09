# Multi-Nodes in Cluster



The infrastructure of multi-nodes in kafka cluster is like the below.

![](../images/kafka_cluster.jpg)

(reference: https://kairen.github.io/2015/10/13/data-engineer/kafka-install/)



## Prepare



* cluster intrastructure

| hostname | IP | broker.id | myid |
| -- | -- | --| -- |
| master   | 192.168.56.101 | 0 | 1 |
| slave01  | 192.168.56.102 | 1 | 2 |
| slave02  | 192.168.56.103 | 2 | 3 |

Do the following things for all machines.



* Setup zookeeper properties (`kafka/config/zookeeper.properties`)

```ini
dataDir=/tmp/zookeeper
clientPort=2181
maxClientCnxns=0

tickTime=2000
initLimit=5
syncLimit=2
server.1=192.168.56.101:2888:3888
server.2=192.168.56.102:2888:3888
server.3=192.168.56.103:2888:3888
```

`tickTime`: time peroid for zookeeper, 

`initLimit`: The number of ticks that the initial synchronization phase can take 

`syncLimit`: The number of ticks that can pass between sending a request and getting an acknowledgement

`2888`: the port cross server to leader, `3888`: the port to select new leader



* Setup kafka server (`kafka/config/server.properties`)

```ini
# change to different id while deployment
broker.id=0
port=9092
# using IP is better
host.name=192.168.56.101
zookeeper.connect=192.168.56.101:2181,192.168.56.102:2181,192.168.56.103:2181
log.dirs=/home/fams/kafka-logs
```



* Create `myid` file.

```shell
mkdir -p /tmp/zookeeper
touch /tmp/zookeeper/myid
# change to different id while deployment
# using 1, 2, 3, ... for server.1, server.2, server.3, ...
# it is different from broker.id (but you can setup both with the same number)
echo '1' > /tmp/zookeeper/myid
cat /tmp/zookeeper/myid
```



* Start both zookeeper and kafka server on all instances.

```shell
bin/zookeeper-server-start.sh config/zookeeper.properties
bin/kafka-server-start.sh config/server.properties
```



* Start a producer.

```shell
bin/kafka-topics.sh --list --zookeeper 192.168.56.103:2181
bin/kafka-console-producer.sh --broker-list 192.168.56.103:9092 --topic cluster-topic-test
```



- Send some messages

```shell
bin/kafka-console-producer.sh --broker-list 192.168.56.103:9092 --topic cluster-topic-test
```



- Start a consumer (you can change to listen another ip, and it still getting message)

```shell
# change listening to 192.168.56.102
bin/kafka-console-consumer.sh --bootstrap-server 192.168.56.102:9092 --topic cluster-topic-test --from-beginning
```







