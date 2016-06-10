# FTP Server

<script type="text/javascript" src="../js/general.js"></script>

###install ftp server
---

```Bash
$ sudo yum -y install vsftpd
$ sudo touch /etc/vsftpd/chroot_list
$ sudo chkconfig vsftpd on
$ sudo iptables -A INPUT -m state --state NEW -m tcp -p tcp --dport 20 -j ACCEPT
$ sudo iptables -A INPUT -m state --state NEW -m tcp -p tcp --dport 21 -j ACCEPT
$ sudo service iptables save
$ sudo service iptables restart
```

###ftp server 設定 
---

```Bash
$ sudo vim /etc/vsftpd/vsftpd.conf
```

* anonymous_enable=YES -> NO
* 限制用戶只能在家目錄 (/etc/vsftpd/chroot_list 的用戶可不受限制) 
  1. chroot_local_user=YES
  2. chroot_list_enable=YES
  3. chroot_list_file=/etc/vsftpd/chroot_list
* 如要 ftp 的檔案列表可以看到跟 Server 上同樣的時間，請在檔案加入:
  1. use_localtime=YES # 使用本地時區

```Bash
$ sudo vim /etc/vsftpd/ftpusers
```

###install ftp client
---

```Bash
$ sudo yum install ftp
```

###use ftp
---

```Bash
$ ftp "IP"
```