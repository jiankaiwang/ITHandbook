# httpd trouble shooting



###httpd.conf line 292 error
---

* Condition description
  1. Background: The httpd service run on CentOS 6.4 (Linux-kernel: 2.6.32-359.14.1.el6.i686), httpd (Apache/2.2.15, httpd -v) and mysqld (version 5.5.33-cll-lve).
  2. Description: After moving the entire folder located on /var/www/html to the other place, moved another folder, named the same html, into /var/www/ and became /var/www/html. It seemed not different from the previous one. But the service httpd could not recognize the folder moved after and it output the message as following
```Bash
Starting httpd: Syntax error on line 292 of /etc/httpd/conf/httpd.conf:
Document Root must be a directory
```
  3. After opening the file /etc/httpd/conf/httpd.conf, ** the line 292 stores the path /var/www/html as the usual ** and this revealed that service httpd seemed the new folder html is not the one as before, so the service could not be processed as before.

* The solution
  1. After several searching the problem on the google search, this problem is caused by ** Security Enhanced Linux (selinux) **, it took different views to the folder html due to moving it.
  2. It could simply make selinux kernel to recognize and re-view the folder /var/www/html by the following command;
```Bash
# restorecon -r /var/www/html
```

### Cache Setting (CentOS)
---

* No Caching in specific file, the rule is set on the configuration file

```bash
$ sudo vim /etc/httpd/conf/no-cache.conf
```

* the rule in the no-cache.conf

```ini
<filesMatch "\.(jpg|png|gif|ppt|pptx|doc|docx|zip|rar|xls|xlsx)$">
  FileETag None
  <ifModule mod_headers.c>
     Header unset ETag
     Header set Cache-Control "max-age=0, no-cache, no-store, must-revalidate"
     Header set Pragma "no-cache"
     Header set Expires "Wed, 11 Jan 1984 05:00:00 GMT"
  </ifModule>
</filesMatch>
```

