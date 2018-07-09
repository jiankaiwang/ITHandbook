# Quick Start



## Reference



* https://kafka.apache.org/quickstart



## Preparation



* Download the code which contains the execution file

```shell
cd ~

# refer to https://www.apache.org/dyn/closer.cgi
wget http://ftp.tc.edu.tw/pub/Apache/kafka/1.1.0/kafka_2.11-1.1.0.tgz
tar -xzf kafka_2.11-1.1.0.tgz
rm -rf kafka_2.11-1.1.0.tgz
cd kafka_2.11-1.1.0
```



## Start the standalone server

* Start the server

Edit the kafka configurate (config/server.properties) first to allow users to delete topics.

```ini
delete.topic.enable=true
```

Start the ZooKeeper (maintaining configuration information) server first.

```shell
bin/zookeeper-server-start.sh config/zookeeper.properties
```

Start the Kafka server.

```shell
bin/kafka-server-start.sh config/server.properties
```



* Create a topic named "test" with 1 partition and only 1 replica

```shell
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic test
```

List all topics.

```shell
bin/kafka-topics.sh --list --zookeeper localhost:2181
```



* Delete the topic

```shell
bin/kafka-topics.sh --delete --zookeeper localhost:2181 --topic your_topic_name
```



* Send some messages

```shell
bin/kafka-console-producer.sh --broker-list localhost:9092 --topic test
```



* Start a consumer

```shell
bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic test --from-beginning
```



## Setting up a multi-broker cluster

* establish multi-broker cluster

The following is to set up a three-broker cluster. We have to set up another two server properties except for the default one `server-properties`.

```shell
cp config/server.properties config/server-1.properties
cp config/server.properties config/server-2.properties
```

And edit these properties as the following.

```ini
config/server-1.properties:
    broker.id=1
    listeners=PLAINTEXT://:9093
    log.dir=/tmp/kafka-logs-1
 
config/server-2.properties:
    broker.id=2
    listeners=PLAINTEXT://:9094
    log.dir=/tmp/kafka-logs-2
```

The `broker.id` is the unique and permanent name in the cluster. We have to override the port and the log directory because we are running these all on the same machines and we want to keey them from all trying to register on the same port or to override each other's data.

Start each servers.

```shell
# make sure you have started zookeeper already
# bin/zookeeper-server-start.sh config/zookeeper.properties
bin/kafka-server-start.sh config/server.properties &
bin/kafka-server-start.sh config/server-1.properties &
bin/kafka-server-start.sh config/server-2.properties &
```



* create a new topic with a replication factor of three

```shell
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 3 --partitions 1 --topic my-replicated-topic

# describe the topic
bin/kafka-topics.sh --describe --zookeeper localhost:2181 --topic my-replicated-topic
#Topic:my-replicated-topic       PartitionCount:1        ReplicationFactor:3     Configs:
    #Topic: my-replicated-topic      Partition: 0    Leader: 2       Replicas: 2,0,1 Isr: 2,0,1
```



* publish a new message to new topic

```shell
bin/kafka-console-producer.sh --broker-list localhost:9092 --topic my-replicated-topic
```



* consume the new topic

```shell
# three servers can be the bootstrap server
bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --from-beginning --topic my-replicated-topic
bin/kafka-console-consumer.sh --bootstrap-server localhost:9093 --from-beginning --topic my-replicated-topic
bin/kafka-console-consumer.sh --bootstrap-server localhost:9094 --from-beginning --topic my-replicated-topic
```



* Fault-tolerance

```shell
ps aux | grep server-1.properties
# 3252  2.1 15.8 3477176 324132 pts/2  Sl+ ...
kill -9 3252

# check the topic status
# Isr: 0,1 is in sync with 0 and 1
bin/kafka-topics.sh --describe --zookeeper localhost:2181 --topic my-replicated-topic
#Topic:my-replicated-topic       PartitionCount:1        ReplicationFactor:3     Configs:
    #Topic: my-replicated-topic      Partition: 0    Leader: 0       Replicas: 2,0,1 Isr: 0,1
```



## Kafka Connect to import/export data



Use Kafka Connect API to import from or export to data. Generate the `test.txt` file as the example first.

```shell
echo -e "hello\nworld\nkafka\nfoo\nbar" > test.txt
```

Start to import from a local file into kafka and write the contents from kafka.

```shell
# connect-standalone.sh connect.properties source.properties target.properties
bin/connect-standalone.sh config/connect-standalone.properties config/connect-file-source.properties config/connect-file-sink.properties
```

You can also read the data stored in Kafka topic.

```shell
bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic connect-test --from-beginning
```

You can pass new data into the source to check the streaming.

```shell
echo "Another line" >> test.txt
```

Notice that you can not use the kafka producer to add new data. You can only add new content to the source file. Once you use different and wrong method to producer, it goes wrong, the target would not be updated.



















