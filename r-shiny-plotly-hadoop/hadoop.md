# Hadoop

<script type="text/javascript" src="../js/general.js"></script>

### background
---

### install
---

* Hadoop 運行在 Java 環境下，需要先安裝 Java，底下舉 ** /usr/java/jdk1.7.0_79/ ** 為例

* 於 Apache Hadoop 官方網站上下載 [Tarball source](http://hadoop.apache.org/releases.html)，底下舉版本 ** hadoop-2.6.4.tar.gz ** 為例

* 安裝過程

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
export JAVA_HOME=/usr/java/jkd1.7.9_79/

# 使用此設定
$ source ~/.bash_profile
```

```bash
# 透過設定 hadoop 專案的環境變數設定中
vim ./etc/hadoop/hadoop-env.sh

# 將 JAVA_HOME 進行設置
export JAVA_HOME=/usr/java/jkd1.7.9_79/
```