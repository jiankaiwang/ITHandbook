# FTP Server

<script type="text/javascript" src="../js/general.js"></script>

###Install vsftpd into CentOS 7
---

```Bash
$ sudo yum -y install vsftpd
```

###Modify the config
---

```Bash
$ sudo vim /etc/vsftpd/vsftpd.conf
```

組態檔設定如下：

```Bash
anonymous_enable=NO   # line 12: no anonymous
ascii_upload_enable=YES
ascii_download_enable=YES    # line 82,83: uncomment ( allow ascii mode )
chroot_local_user=YES
chroot_list_enable=YES   # line 100, 101: uncomment ( enable chroot )
chroot_list_file=/etc/vsftpd/chroot_list   # line 103: uncomment ( specify chroot list )
ls_recurse_enable=YES   # line 109: uncommen
listen=YES   # line 114: change ( if use IPv4 )
listen_ipv6=NO   # line 123: change ( turn to OFF if it's not need )
local_root=public_htm   # add follows to the end, specify root directory ( if don't specify, users' home directory become FTP home directory )
use_localtime=YES   # use localtime
seccomp_sandbox=NO   # turn off for seccomp filter ( if you cannot login, add this line )
```

###Add the user who can login the ftp
---

```Bash
$ sudo vim /etc/vsftpd/chroot_list
```

```Bash
user   #add users you allow to move over their home director
```

###reactivate the service
---

```Bash
$ sudo systemctl start vsftpd
$ sudo systemctl enable vsftpd
```

###make anonymous fill access controlling
---

```Bash
# set vsftpd.conf 
anon_upload_enable=YES

# set vsftpd.conf: 
anon_mkdir_write_enable=YES

# add the following command into /etc/vsftpd/vsftpd.conf; 
anon_other_write_enable=YES

# set selinux to make ftp fill access controlling; 
$ sudo setsebool -P allow_ftpd_full_access 1
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