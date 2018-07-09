# Quickstart



## Preparation



### Create a Hadoop User

```shell
sudo addgroup hadoop

# example password is hadoop
sudo adduser -ingroup hadoop hadoopuser

su - hadoopuser
```



### Java Environment

**Install java on each resources.**

```shell
sudo add-apt-repository ppa:openjdk-r/ppa
sudo apt-get update
sudo apt-get install openjdk-8-jdk
sudo apt-get install openjdk-8-jre
sudo apt-get install openjdk-8-source #this is optional, the jdk source code
java -version
```



Notice Java 9 or newer would cause unexcepted error while using hadoop. If you want to downgrade to older java version, use the following command and select the desired one.

```shell
sudo update-alternatives --config java
sudo update-alternatives --config javac

# change all
sudo update-alternatives --all
```



If the error message shown as below:

```shell
dpkg: error processing archive /var/cache/apt/archives/openjdk-8-jdk_9~b115-1ubuntu1_amd64.deb (--install):
 trying to overwrite '/usr/lib/jvm/java-8-openjdk-amd64/include/linux/jawt_md.h', which is also in package openjdk-8-jdk-headless:amd64 9~b115-1ubuntu1
```

then using the following command.

```shell
sudo apt-get -o Dpkg::Options::="--force-overwrite" install openjdk-8-jdk
```



Switch to the hadoop user, `su - hadoopuser`. Set the environment variables to the end of the file `~/.bashrc`.

```shell
# add JAVA_HOME
# assume jdk is installed at /usr/lib/jvm/java-1.9.0-openjdk-amd64
export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-amd64
export PATH=$PATH:$JAVA_HOME/bin 
```

Run `source ~/.bashrc`, then `echo $JAVA_HOME` to check the environment variable is set.



### Install Hadoop

**Install hadoop on each resources.**

```shell
wget http://www-eu.apache.org/dist/hadoop/common/hadoop-3.1.0/hadoop-3.1.0.tar.gz
tar -zxvf hadoop-3.1.0.tar.gz
sudo mv hadoop-3.1.0 /opt/hadoop
sudo chown -R hadoopuser:hadoop /opt/hadoop

# make sure you have already add a new user
# run `su - hadoopuser` first
su - hadoopuser
cd ~
mkdir hdfs
mkdir /home/hadoopuser/hdfs/name
mkdir /home/hadoopuser/hdfs/data
mkdir /home/hadoopuser/tmp
```



The following is the configuration for 3 VMs setting, 1 master and 2 slaves. Confirm the configuration of hadoop on `/etc/hostname`, for example, master, slave01, slave02, etc, and on `/etc/hosts` as the following.

Make sure each VM corresponds to one hostname.

```shell
192.168.56.101  master
192.168.56.103  slave01
192.168.56.102  slave02
```



Set the envrionment variables on the end of `~/.bashrc`.

```shell
# set HADOOP
export HADOOP_HOME=/opt/hadoop
export PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin
export HADOOP_MAPRED_HOME=$HADOOP_HOME 
export HADOOP_COMMON_HOME=$HADOOP_HOME 
export HADOOP_HDFS_HOME=$HADOOP_HOME 
export YARN_HOME=$HADOOP_HOME 
export HADOOP_COMMON_LIB_NATIVE_DIR=$HADOOP_HOME/lib/native 
export HADOOP_INSTALL=$HADOOP_HOME
```

Run `source ~/.bashrc`, then `echo $HADOOP_HOME` to check the environment variable is set.



### Auto Login SSH

Hadoop uses ssh to distribute the jobs so that auto login to slave resources is necessary.

```shell
ssh-keygen -t rsa -P ""
cp ~/.ssh/id_rsa.pub ~/.ssh/authorized_keys
scp -r ~/.ssh slave01:~/
scp -r ~/.ssh slave02:~/

# test login
ssh slave01
```



### Additional Configuration



There are 2 bash scripts necessary to add the environment setting. **Notice you have to set the following configuration in all resources**.

```shell
vim /opt/hadoop/etc/hadoop/hadoop-env.sh
vim /opt/hadoop/etc/hadoop/yarn-env.sh
```

Add the JAVA_HOME to the bash script.

```shell
export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-amd64
```



### Configure Hadoop



The following 4 documents are key to configure hadoop, core-site.xml, hdfs-site.xml, mapred-site.xml, and yarn-site.xml. **Notice you have to set the following configuration in all resources**.



* Edit `/opt/hadoop/etc/hadoop/core-site.xml`.

```xml
<configuration>
<property>
   <name>fs.defaultFS</name>
   <value>hdfs://master:9000</value>
</property>
<property>
   <name>io.file.buffer.size</name>
   <value>131072</value>
</property>
<property>
   <name>hadoop.tmp.dir</name>
   <value>/home/hadoopuser/tmp</value>
</property>
<property>
   <name>hadoop.proxyuser.root.hosts</name>
   <value>master</value>
</property>
<property>
   <name>hadoop.proxyuser.root.group</name>
   <value>*</value>
</property>
</configuration>
```



* Edit `/opt/hadoop/etc/hadoop/hdfs-site.xml`.

```xml
<configuration>  
<property>
   <name>dfs.namenode.secondary.http-address</name>
   <value>master:9001</value>
</property>
<property>
   <name>dfs.namenode.name.dir</name>
   <value>/home/hadoopuser/hdfs/name</value>
</property>
<property>
   <name>dfs.datanode.data.dir</name>
   <value>/home/hadoopuser/hdfs/data</value>
</property>
<property>
   <name>dfs.replication</name>
   <value>1</value>
</property>
<property>
   <name>dfs.webhdfs.enable</name>
   <value>true</value>
</property>
<property>
   <name>dfs.permissions</name>
   <value>false</value>
</property>    
</configuration>
```



- Edit `/opt/hadoop/etc/hadoop/mapred-site.xml`.

```xml
<configuration>
<property>
   <name>mapreduce.framework.name</name>
   <value>yarn</value>
</property>
<property>
   <name>mapreduce.jobhistory.address</name>
   <value>master:10020</value>
</property>
<property>
   <name>mapreduce.jobhistory.webapp.address</name>
   <value>master:19888</value>
</property>
    
<!-- fix configure error -->
<property>
   <name>mapreduce.application.classpath</name>
   <value>
    /opt/hadoop/etc/hadoop,
    /opt/hadoop/share/hadoop/common/*,
    /opt/hadoop/share/hadoop/common/lib/*,
    /opt/hadoop/share/hadoop/hdfs/*,
    /opt/hadoop/share/hadoop/hdfs/lib/*,
    /opt/hadoop/share/hadoop/mapreduce/*,
    /opt/hadoop/share/hadoop/mapreduce/lib/*,
    /opt/hadoop/share/hadoop/yarn/*,
    /opt/hadoop/share/hadoop/yarn/lib/*
   </value>
</property>
</configuration>
```



- Edit `/opt/hadoop/etc/hadoop/yarn-site.xml`.

```xml
<configuration>

<!-- Site specific YARN configuration properties -->
<property>
   <name>yarn.resourcemanager.hostname</name>
   <value>master</value>
</property>
<property>
   <name>yarn.nodemanager.aux-services</name>
   <value>mapreduce_shuffle</value>
</property>
<property>
   <name>yarn.nodemanager.aux-services.mapreduce.shuffle.class</name>
   <value>org.apache.hadoop.mapred.ShuffleHandle</value>
</property>
<property>
   <name>yarn.resourcemanager.address</name>
   <value>master:8032</value>
</property>
<property>
   <name>yarn.resourcemanager.scheduler.address</name>
   <value>master:8030</value>
</property>
<property>
   <name>yarn.resourcemanager.resource-tracker.address</name>
   <value>master:8031</value>
</property>
<property>
   <name>yarn.resourcemanager.admin.address</name>
   <value>master:8033</value>
</property>
<property>
   <name>yarn.resourcemanager.webapp.address</name>
   <value>master:8088</value>
</property>
    
<!-- fix configure error -->    
<property>
  <name>yarn.application.classpath</name>
  <value>
    /opt/hadoop/etc/hadoop,
    /opt/hadoop/share/hadoop/common/*,
    /opt/hadoop/share/hadoop/common/lib/*,
    /opt/hadoop/share/hadoop/hdfs/*,
    /opt/hadoop/share/hadoop/hdfs/lib/*,
    /opt/hadoop/share/hadoop/mapreduce/*,
    /opt/hadoop/share/hadoop/mapreduce/lib/*,
    /opt/hadoop/share/hadoop/yarn/*,
    /opt/hadoop/share/hadoop/yarn/lib/*
   </value>
</property>
    
<!-- Container [containerID is running 256072192B beyond the 'VIRTUAL' memory limit.  -->
<property>
  <name>yarn.nodemanager.vmem-check-enabled</name>
  <value>false</value>
</property>
</configuration>
```



After configure all resources, add slaves info to the file `vim /opt/hadoop/etc/hadoop/workers` (**while hadoop version > 3**) 

```text
localhost
slave01
slave02
```

or edit the file `/opt/hadoop/etc/hadoop/slaves`.

```text
192.168.56.103  slave01
192.168.56.102  slave02
```



### Activate Hadoop



Check hadoop version.

```shell
hadoop version
```



Format Namenode.

```shell
hdfs namenode -format
```



In master node, activate the hadoop. 

You can check the link http://192.168.56.101:9870 (hadoop version >= 3.x) to see hadoop status , or check the link http://192.168.56.101:50070 while hadoop version < 3.

You can browse http://192.168.56.101:8088 to see all hadoop applications.

While you start all applications, the whole services including slave ones would be activate on the same time.

```shell
$ /opt/hadoop/sbin/start-all.sh
```



Check the status.

```shell
$ jps
```



Stop the all service.

```shell
$ /opt/hadoop/sbin/stop-all.sh
```









