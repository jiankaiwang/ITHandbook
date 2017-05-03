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

* Install Python2.7

```bash
# install required packages
$ sudo apt-get install -y build-essential checkinstall libreadline-gplv2-dev libncursesw5-dev libssl-dev libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev

# download and extract Python 2.7.x
$ cd /usr/src
$ sudo wget https://www.python.org/ftp/python/2.7.13/Python-2.7.13.tgz
$ sudo tar xzf Python-2.7.13.tgz

# Compile Python source
$ cd Python-2.7.13
$ sudo ./configure
$ sudo make altinstall
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

### Cassandra service default settings
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

### Cassandra configuration
---

* Most of Configuration is defined via yaml properties on `/etc/cassandra/cassandra.yaml` (refer to [official document](http://cassandra.apache.org/doc/latest/getting_started/configuring.html))

    * `cluster_name`: the name of your cluster.
    * `seeds`: a comma separated list of the IP addresses of your cluster seeds.
    * `storage_port`: you don’t necessarily need to change this but make sure that there are no firewalls blocking this port.
    * `listen_address`: the `IP address` of your node, this is `what allows other nodes to communicate with this node` so it is important that you change it. Alternatively, you can set `listen_interface` to tell Cassandra which interface to use, and consecutively which address to use. Set only one, not both.
    * `native_transport_port`: as for `storage_port`, make sure this port is not blocked by firewalls as clients will communicate with Cassandra on this port.

* Location of directories (refer to [official document](http://cassandra.apache.org/doc/latest/getting_started/configuring.html))

    * `data_file_directories`: one or more directories where data files are located.
    * `commitlog_directory`: the directory where commitlog files are located.
    * `saved_caches_directory`: the directory where saved caches are located.
    * `hints_directory`: the directory where hints are located.

* Environment variables (refer to [official document](http://cassandra.apache.org/doc/latest/getting_started/configuring.html))

    * `cassandra-env.sh` : Edit JVM-level settings such as heap size, any additional JVM command line argument to the JVM_OPTS environment variable.
    
* Logging (refer to [official document](http://cassandra.apache.org/doc/latest/getting_started/configuring.html))

    * Cassandra uses `logback` as the logger.
    * The logging properties is located on `logback.xml`.
    * It will log at `INFO` level into a file called `system.log`, and at `DEBUG` level into a file called `debug.log`.








