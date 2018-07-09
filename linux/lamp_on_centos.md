# LAMP on CentOS



###install apache
---

```Bash
$ sudo yum install httpd
$ sudo systemctl status|start|stop|restart|reload httpd (or)
$ sudo service httpd status|start|stop|restart|reload
```

###Firewall
---

```Bash
$ sudo vim /etc/sysconfig/iptables
```

Configuration 

```Bash
-A INPUT -p tcp -m state --state NEW -m tcp --dport 80 -j ACCEPT
-A INPUT -p tcp -m state --state NEW -m tcp --dport 443 -j ACCEPT
```

Restart firewall service

```Bash
$ sudo service iptables status|start|stop|restart|reload
```

###install PHP, MySQL
---

```Bash
$ sudo yum install php php-mysql php-pdo php-gd php-mbstring
$ sudo yum install mariadb-server mariadb
$ sudo systemctl start mariadb
$ sudo mysql_secure_installation
```

After MariaDB package is installed, start database daemon and use mysql_secure_installation script to secure database (set root password, disable remotely logon from root, remove test database and remove anonymous users).

```Bash
Enter current password for root (enter for none): (none,press enter)
Set password for root: (for database, not operation system)
Remove anonymous user? Y
Disallow root login remotely? n
Remove test database and access to it? Y
Reload privilege tables now? Y
```

access MySQL database server

```Bash
$ mysql -u root -p
```

activate apache, mysql(mariadb) and firewall services

```Bash
$ sudo chkconfig --level 15 httpd on
$ sudo chkconfig --level 15 mariadb on
$ sudo chkconfig --level 15 iptables on
```


