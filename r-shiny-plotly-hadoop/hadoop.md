# Hadoop

<script type="text/javascript" src="../js/general.js"></script>

### background
---

* Wikipedia description

Apache Hadoop is an open-source software framework for distributed storage and distributed processing of very large data sets on computer clusters built from commodity hardware.

### install
---

* Hadoop 運行在 Java 環境下，需要先安裝 Java，底下舉 ** /usr/java/jdk1.7.0_79/ ** 為例

* 於 Apache Hadoop 官方網站上下載 [Tarball source](http://hadoop.apache.org/releases.html)，底下舉版本 ** hadoop-2.6.4.tar.gz ** 為例

* 下載並解壓縮

```Bash
# 解壓縮
$ tar -zxvf hadoop-2.6.4.tar.gz

# 進入此解壓縮的資料夾內
$ cd hadoop-2.6.4
```

* 設置 JAVA_HOME，可以透過下方兩種方式來達成

```bash
# 透過設置帳戶的 java 執行環境變數
$ vim ~/.bash_profile

# 加入下方設定
export JAVA_HOME=/usr/java/jdk1.7.0_79

# 使用此設定
$ source ~/.bash_profile
```

```bash
# 透過設定 hadoop 專案的環境變數設定中
$ vim ./etc/hadoop/hadoop-env.sh

# 將 JAVA_HOME 進行設置
export JAVA_HOME=/usr/java/jdk1.7.0_79
```

* 設置 Hadoop 安裝路徑

```Bash
# 設定 hadoop 專案的環境變數設定中
$ vim ./etc/hadoop/hadoop-env.sh

# 假設路徑為 /usr/local/hadoop ，並加入下方
export HADOOP_PREFIX=/home/jkw/hadoop-2.6.4
```

* 透過底下指令檢查是否已安裝

```bash
# 應該會出現如何使用的內容
$ bin/hadoop
```

### Check : Standalone Operation

* 底下為一範例可用於確認是否安裝成功，以 hadoop 自身的組態 xml 檔案作為目標，透過 mapreduce 配合正規表示式找出內容符合 dfs[a-z.]+ 的結果，並將此結果輸出至 output 資料夾中。

```bash
# 創建一個測試用輸入檔案的資料夾
$ mkdir input

# 預設將 hadoop 的自身組態檔作為目標
$ cp etc/hadoop/*.xml input

# 執行 hadoop 指令
$ bin/hadoop jar share/hadoop/mapreduce/hadoop-mapreduce-examples-2.6.4.jar grep input output 'dfs[a-z.]+'

# 顯示出結果
$ cat output/*
```














