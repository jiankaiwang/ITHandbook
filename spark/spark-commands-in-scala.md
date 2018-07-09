# Spark Commands in Scala



```scala
# I/O
val lines = sc.textFile("sample.txt")

# anonymous function
val bsdLines = lines.filter(line=>line.contains("google"))
# defined function
def isBSD(line:String) = { line.contains("bank") }
val filterLines = lines.filter(isBSD)

# iteration
filterLines.foreach(bLine=>println(bLine))

# property
filterLines.count
filterLines.first
filterLines.top(<int>)    # descending

# collect
filterLines.collect()

# placeholder
filterLines.map(_.toString.reverse).collect()

# map
val numbers = sc.parallelize(List(1,2,3,4,5))
val numberSquared = numbers.map(num => num*num)

# flatmap
val idsStr = lines.flatMap(line=>line.split(","))

# distinct
idsStr.distinct.count
idsStr.distinct.collect()
```

