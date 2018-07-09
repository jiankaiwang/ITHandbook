# Spark with HDFS



## Example



* Check the configurate (`core-site.xml`) to get hdfs address.

```xml
<configuration>
<property>
   <name>fs.defaultFS</name>
   <value>hdfs://master:9000</value>
</property>
...
<configuration>
```



* Access HDFS in PySpark

```shell
pyspark
```

* read from hdfs
```python
lines = sc.textFile("hdfs://master:9000/user/input/sample.txt")
lines.count()
```

* safe mode
```shell
hadoop dfsadmin -safemode leave
```

* write into hdfs
```python
rowdata = sc.parallelize([[1,2],[3,4]])
rowdata.map(lambda row: row[0] + row[1])\
	.saveAsTextFile("hdfs://master:9000/user/input/example")
```

```shell
hadoop fs -cat hdfs://master:9000/user/input/example/part-00000
```















