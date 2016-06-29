# Jenkins

<script type="text/javascript" src="../js/general.js"></script>

###安裝 Jenkins 於 Linux
---

| 註解 |
| -- |
| 可於 Jenkis 官網依不同環境安裝，底下以 CentOS 7 環境為主 |

* 選擇 [Downloads]，選擇 [Weekly Release]，選擇 [Red hat/Fedora/CentOS]，進入[說明頁面](RedHat Linux RPM packages for Jenkins)

* 可以透過 repo 方式安裝(建議) 或是透過 rpm 下載安裝。

```Bash
$ sudo wget -O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins.io/redhat/jenkins.repo
$ sudo rpm --import http://pkg.jenkins.io/redhat/jenkins.io.key

$ sudo yum install jenkins
```

* 設置防火牆

```Bash
$ sudo firewall-cmd --zone=public --add-port=8080/tcp --permanent
$ sudo firewall-cmd --zone=public --add-service=http --permanent
$ sudo firewall-cmd --reload
```

* 啟動 Jenkins

```Bash
sudo service jenkins start/stop/restart
sudo chkconfig --level 135 jenkins on
```

* 啟動 Jenkins，為確認是 administrator 安裝 Jenkins，因此需要讀取檔案內密碼來確認

```
$ sudo vim /var/lib/jenkins/secrets/initialAdminPassword
```

* 開啟瀏覽器並輸入底下網址便可以開始使用 jenkins

```
http://localhost:8080/
```

###啟動 Jenkins.war 
---

```
# http
java -jar jenkins.war --httpPort=9090 --httpListenAddress=100.64.110.20

# https
java -jar jenkins.war --httpsPort=9090 --httpsListenAddress=100.64.110.20
```

| Parameters | Description |
| -- | -- |
| --httpPort | 監聽 http port |
| --httpListenAddress | http 使用的 host IP 或 Url |
| --httpsPort | 使用 https port |
| --httpsListenAddress | https 使用的 host IP 或 Url |





