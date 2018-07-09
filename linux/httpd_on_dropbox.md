# httpd on dropbox



###become one of the apache
---

```Bash
$ sudo usermod -a -G apache jkw
$ sudo usermod -a -G jkw apache
```

因為之後可能需要讀取 apache 資料或是 apache 讀取 jkw 資料，所以先將使用者與 apache 加入相互群組，如此一來便可以避免讀不到資料的權限問題出現。

###change privilege of Dropbox folder
---

```Bash
$ chmod 775 /home/jkw
$ chmod 775 /home/jkw/Dropbox
$ cd /home/jkw/Dropbox; sudo cp -r /var/www/html ./
$ sudo chown -R jkw:apache /home/jkw/Dropbox/html
```

將 775 設置給家目錄與 Dropbox 的原因為，可以讓 apache 直接進行讀取與寫入，而設置 chown 的原因為將此資料夾給與 apache 群組使用，配合先前的 g=rwx，可以不受到權限的限制。

###Set apache configuration
---

```Bash
$ sudo vim /etc/httpd/conf/httpd.conf
```

找到 DocumentRoot，並改成下列 Dropbox 資訊

```Bash
DocumentRoot "/home/jkw/Dropbox/html"
然後再找到下列位置 <Directory "/var/www/html">，並改成底下
<Directory "/home/jkw/Dropbox/html">
```

###Error Message : set seLinux
---

```Bash
Starting httpd: Syntax error on line 292 of /etc/httpd/conf/httpd.conf:
DocumentRoot must be a directory
```

```Bash
# 從 ls -alZ 可以看出新的目錄並沒有受到 sys 的認證，為 undefinied，故需要設定 seLinux，即為底下 command
$ ls -alZ /home/jkw/Dropbox/html

# Set seLinux
$ sudo setsebool -P httpd_enable_homedirs on

# restart service
$ sudo service httpd restart
```
