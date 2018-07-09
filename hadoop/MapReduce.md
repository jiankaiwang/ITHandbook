# MapReduce



## Example



* Create an workspace.

```shell
cd ~
mkdir hadoop_example
mkdir hadoop_example/bin
mkdir hadoop_example/src
```

The default directory structure is the following.

```text
+ hadoop_example
  + bin
  + src
```



* create a `~/hadoop_example/src/WordCount.java` 

```java
import java.io.IOException;
import java.util.StringTokenizer;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;

public class WordCount {

  public static class TokenizerMapper
       extends Mapper<Object, Text, Text, IntWritable>{

    private final static IntWritable one = new IntWritable(1);
    private Text word = new Text();

    public void map(Object key, Text value, Context context
                    ) throws IOException, InterruptedException {
      StringTokenizer itr = new StringTokenizer(value.toString());
      while (itr.hasMoreTokens()) {
        word.set(itr.nextToken());
        context.write(word, one);
      }
    }
  }

  public static class IntSumReducer
       extends Reducer<Text,IntWritable,Text,IntWritable> {
    private IntWritable result = new IntWritable();

    public void reduce(Text key, Iterable<IntWritable> values, Context context
                       ) throws IOException, InterruptedException {
      int sum = 0;
      for (IntWritable val : values) {
        sum += val.get();
      }
      result.set(sum);
      context.write(key, result);
    }
  }

  public static void main(String[] args) throws Exception {
    Configuration conf = new Configuration();
    Job job = Job.getInstance(conf, "word count");
    job.setJarByClass(WordCount.class);
    job.setMapperClass(TokenizerMapper.class);
    job.setCombinerClass(IntSumReducer.class);
    job.setReducerClass(IntSumReducer.class);
    job.setOutputKeyClass(Text.class);
    job.setOutputValueClass(IntWritable.class);
    FileInputFormat.addInputPath(job, new Path(args[0]));
    FileOutputFormat.setOutputPath(job, new Path(args[1]));
    System.exit(job.waitForCompletion(true) ? 0 : 1);
  }
}
```



* create a `~/hadoop_example/src/sample.txt`.

You can use any article you like as the sample.



* Assign the `input_dir` and `output_dir`.

```shell
input_dir=/user/input
output_dir=/user/output
```



* generate a jar resource

The default directory structure.

```text
+ hadoop_example
  + bin
  + src
    - sample.txt
    - WordCount.java
    - hadoop-core-1.2.1.jar (http://mvnrepository.com/artifact/org.apache.hadoop/hadoop-core)
```

```shell
# if there is no directory ..\bin
cd ~/hadoop_example/src

# create a jar resource
# the path is under eclipse
rm -f ../bin/*
javac -classpath hadoop-core-1.2.1.jar -d ../bin WordCount.java 
jar -cvf WordCount.jar -C ../bin . 
```



* Create an input directory in HDFS.

```shell
hadoop fs -mkdir ${input_dir}
hadoop fs -ls ${input_dir}
```

Put the data into the  `input_dir`.

```shell
hadoop fs -put ~/hadoop_example/src/sample.txt ${input_dir}
```



* Run the application.

```shell
hadoop fs -rm -r ${output_dir}
hadoop jar WordCount.jar WordCount ${input_dir} ${output_dir}

# run official jar
hadoop jar /opt/hadoop/share/hadoop/mapreduce/hadoop-mapreduce-examples-3.1.0.jar wordcount ${input_dir} ${output_dir}
```



* disable safe mode

```shell
hadoop dfsadmin -safemode leave
```



## Show the result



```shell
# Found 2 items
# -rw-r--r--   1 hadoopuser supergroup          0 2018-06-19 23:27 /user/output/_SUCCESS
# -rw-r--r--   1 hadoopuser supergroup       3815 2018-06-19 23:27 /user/output/part-r-00000
hadoop fs -ls $output_dir
hadoop fs -cat $output_dir/part-r-00000
```

