# HDFS Operations



You can use `hadoop fs -help ` to get more operations.



## Quick Example



### Starting HDFS



You have to format the hdfs file system first.

```shell
hadoop namenode -format 
```

After formating HDFS, start distributed file system.

```shell
start-dfs.sh
```



### Listing Files in HDFS

```shell
hadoop fs -ls <args>
```



### Inserting Data Into HDFS



Create an input directory.

```shell
hadoop fs -mkdir -p /user/input
```



Store a new file into HDFS.

```shell
echo "Hello world, Hadoop!" > /home/hadoopuser/example.txt
hadoop fs -put /home/hadoopuser/example.txt /user/input
```



List the files.

```shell
hadoop fs -ls /user/input
```



### Retrieving Data From HDFS



Cat the file.

```shell
hadoop fs -cat /user/input/example.txt
```



Get the HDFS file and store it into local.

```shell
hadoop fs -get /user/input/example.txt /home/hadoopuser/example_from_hdfs.txt
```





















