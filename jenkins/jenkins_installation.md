# Jenkins Installation

Jenkins provides you with lots of installation methods, including default installation, war file, docker container, etc.

## On CentOS 7

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

## by WAR file

```
# http
java -jar jenkins.war --httpPort=9090 --httpListenAddress=100.64.110.20 > $LOGFILE 2>&1

# https
# If your keystore contains multiple certificates (e.g. you are using CA signed certificate) 
# Jenkins might end-up using a incorrect one. 
# In this case you can convert the keystore to PEM and use following command line options:
java -jar jenkins.war --httpPort=-1 --httpsPort=9090 --httpsListenAddress=100.64.110.20 -httpsCertificate=path/to/cert --httpsPrivateKey=path/to/privatekey > $LOGFILE 2>&1
```

| Parameters | Description |
| -- | -- |
| --httpPort | 監聽 http port |
| --httpListenAddress | http 使用的 host IP 或 Url |
| --httpsPort | 使用 https port |
| --httpsListenAddress | https 使用的 host IP 或 Url |





