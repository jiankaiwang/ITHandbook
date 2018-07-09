# Socat



Socat 使用時機

* TCP port forwarder
* External Socksifier
* 攻擊較弱的防火牆 (Security Testing)
* the shell interface of unix sockets
* IPv6 Supported
* Redirect TCP oriented programs to a serial line
* Connect serial lines among different computers logically
* Establish a more safety and secure environment



###Socat 安裝方式

* 直接尋找 repository: (安裝資訊紀錄於 **rpmforge** repository)

```Bash
sudo yum install socat
```

* Source Code downloading

```Bash
cd /opt
sudo wget http://www.dest-unreach.org/socat/download/socat-1.7.1.2.tar.gz
sudo tar -zxvf socat-1.7.1.2.tar.gz
cd ./socat-1.7.1.2
sudo ./configure
sudo make
sudo make install
```



###Socat 使用與操作

* TCP redirect to another location : 下例為藉由 TCP protocol 連入本機的 port 8100 時，重新導向至 IP 為 10.12.14.16 位址，port 為 80

```Bash
sudo socat TCP-LISTEN:8100,fork TCP:10.12.14.16:80
```









