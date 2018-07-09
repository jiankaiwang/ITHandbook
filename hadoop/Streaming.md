# Streaming



## Example



* preparation

```shell
mkdir -p ~/hadoop_example/script
mkdir ~/hadoop_example/src
```

create a sample text under `~/hadoop_example/src/sample.txt` (you can use any text material as the sample)



* mapper script (`vim ~/hadoop_example/script/mapper.py`)

```python
#!/usr/bin/env python3

import sys

# input comes from STDIN (standard input)
for line in sys.stdin:
    # remove leading and trailing whitespace
    line = line.strip()
    # split the line into words
    words = line.split()
    # increase counters
    for word in words:
        # write the results to STDOUT (standard output);
        # what we output here will be the input for the
        # Reduce step, i.e. the input for reducer.py
        #
        # tab-delimited; the trivial word count is 1
        print('%s\t%s' % (word, 1))
```

Do not forget to add execution property `chmod +x ~/hadoop_example/script/mapper.py`.



* reduce script (`~/hadoop_example/script/reducer.py`)

```python
#!/usr/bin/env python3

from operator import itemgetter
import sys

current_word = None
current_count = 0
word = None

# input comes from STDIN
for line in sys.stdin:
    # remove leading and trailing whitespace
    line = line.strip()

    # parse the input we got from mapper.py
    word, count = line.split('\t', 1)

    # convert count (currently a string) to int
    try:
        count = int(count)
    except ValueError:
        # count was not a number, so silently
        # ignore/discard this line
        continue

    # this IF-switch only works because Hadoop sorts map output
    # by key (here: word) before it is passed to the reducer
    if current_word == word:
        current_count += count
    else:
        if current_word:
            # write result to STDOUT
            print('%s\t%s' % (current_word, current_count))
        current_count = count
        current_word = word

# do not forget to output the last word if needed!
if current_word == word:
    print('%s\t%s' % (current_word, current_count))
```

Do not forget to add execution property `chmod +x ~/hadoop_example/script/reducer.py`.



* Quick Test

```shell
# example output
# is      1
# to      1
# impose  1
# tariffs 1
# on      1
cat ~/hadoop_example/src/sample.txt | ~/hadoop_example/script/mapper.py

# example output
# which   7
# while   1
# whims   1
# why     2
# Why?    1
# will    2
cat ~/hadoop_example/src/sample.txt | ~/hadoop_example/script/mapper.py | sort -k1,1 | ~/hadoop_example/script/reducer.py
```



* Streaming

```shell
hadoop jar /opt/hadoop/share/hadoop/tools/lib/hadoop-streaming-3.1.0.jar \
	-file ~/hadoop_example/script/mapper.py -mapper ~/hadoop_example/script/mapper.py \
    -file ~/hadoop_example/script/reducer.py -reducer ~/hadoop_example/script/reducer.py \
    -input /user/input/* -output /user/streaming_output
```

the output would exist at `/user/streaming_output`

```shell
hadoop fs -ls /user/streaming_output
hadoop fs -cat /user/streaming_output/part-00000
```













