# WebGoat



###建立 WebGoat 6 網站
---

* 於 [OWASP 官網](https://www.owasp.org/index.php/Main_Page)下載 WebGoat 網站設置用的 jar 執行檔。

* 本環境為 WebGoat 6.0.1，JRE 為 1.8.0_71。

* 可以透過底下兩種指令運行

```Bash
# 單次啟動
$ java -jar ./WebGoat-6.0.1-war-exec.jar -httpPort 9020
```

```Bash
# 開機便運行
$ vim /etc/rc.local

# 加入下列指令直接在背景運行
java -jar ./WebGoat-6.0.1-war-exec.jar -httpPort 9020 > ./log.txt 2>&1 & echo $!
```

* 開啟瀏覽器輸入底下網址便可以瀏覽 WebGoat 網站

```text
http://localhost:9020/WebGoat/login.mvc
```



