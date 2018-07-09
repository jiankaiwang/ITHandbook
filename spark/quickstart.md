# Spark QuickStart



## Preparation



### Hadoop

* Establish hadoop execution environment. [Reference](../hadoop/quickstart.md)



### Spark

* Download the corresponding Spark version from https://spark.apache.org/downloads.html.

```shell
cd ~
wget https://archive.apache.org/dist/spark/spark-2.3.1/spark-2.3.1-bin-hadoop2.7.tgz
tar zvxf spark-2.3.1-bin-hadoop2.7.tgz
sudo mv ./spark-2.3.1-bin-hadoop2.7 /opt/
sudo chown hadoopuser:hadoop -R /opt/spark-2.3.1-bin-hadoop2.7
```

* Register the environment variables.

```shell
vim ~/.bashrc
```

Add the following settings on the end of file.

```shell
# set Spark
export SPARK_HOME=/opt/spark-2.3.1-bin-hadoop2.7/
export PATH=$PATH:$SPARK_HOME/bin:$SPARK_HOME/sbin
```

And not to forget to `source ~/.bashrc`.

* Install with PyPi.

```shell
# python 2.x
# sudo apt-get install python-pip
# pip install pyspark

# python 3.x and pyspark is 2.3.1
sudo apt-get install python3-pip
pip3 install pyspark
```



### Docker

* Establish docker execution environment. [Reference](../docker/README.md)



## Example In Scala



* Spark Operations

```shell
spark-shell
```



* Example for the text file

```scala
# cd ~/spark_example
# execute `spark-shell` first

# the path of file is ~/spark_example/sample.txt
val lines = sc.textFile("sample.txt")
val lineCount = lines.count

# anonymous function
val bsdLines = lines.filter(line=>line.contains("google"))
bsdLines.count    # count the whole filtering

# defined function
def isBSD(line:String) = { line.contains("bank") }
val filterLines = lines.filter(isBSD)
filterLines.count
filterLines.foreach(bLine=>println(bLine))    # print each match
```



* RDD Operations

```scala
# cd ~/spark_example
# execute `spark-shell` first

# map
val numbers = sc.parallelize(List(1,2,3,4,5))
val numberSquared = numbers.map(num => num*num)
numberSquared.foreach(num => print(num + " "))
numberSquared.map(_.toString.reverse).collect()

# flatMap
val idsStr = lines.flatMap(line=>line.split(","))

# distinct
idsStr.distinct.count
idsStr.distinct.collect()
```



## Example In Python



- Spark Operations

```shell
pyspark
```







