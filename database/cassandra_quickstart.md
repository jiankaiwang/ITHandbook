# Quickstart

<script type="text/javascript" src="js/general.js"></script>

### Prerequisties
---

* Oracle Java 8 or OpenJDK 8

```bash
# add oracle java 8 repository
$ sudo add-apt-repository ppa:webupd8team/java

# update the repository
$ sudo apt-get update

# install oracle java 8
$ sudo apt-get install oracle-java8-installer

# verify the java version
$ java -version

# configurate java environment
$ sudo apt-get install oracle-java8-set-default

# edit the environment and set the next two line
$ sudo vim /etc/environment 

# add the following to the environment
JAVA_HOME=/usr/lib/jvm/java-8-oracle
JRE_HOME=/usr/lib/jvm/java-8-oracle/jre
```

### Install on Ubuntu 16.04
---

```bash
# add Apache Repository of Cassandra 3.6
$ echo "deb http://www.apache.org/dist/cassandra/debian 36x main" | sudo tee -a /etc/apt/sources.list.d/cassandra.sources.list

# add Apache Cassandra Repository Key
$ curl https://www.apache.org/dist/cassandra/KEYS | sudo apt-key add -

# Update the Repository
$ sudo apt-get update

# Install Cassandra
$ sudo apt-get install -y cassandra
```

### Service default configuration
---

```bash
# start|stop|restart the service
$ sudo service cassandra start/stop/restart

# verify whether cassandra service is running
$ nodetool status

# default location of the configuration
cd /etc/cassandra

# default location of log directories
cd /var/log/cassandra/

# default location of data directories
cd /var/lib/cassandra
```













