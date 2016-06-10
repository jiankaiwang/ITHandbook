# Install dropbox on CentOS with error-free yum

<script type="text/javascript" src="../js/general.js"></script>

###Introduction and Background
---

* When installing Dropbox on the CentOS-based environment (distribution: 6.4, Linux-kernel: 2.6.32-358.14.1.el6.i686), it may face the problem that the error of updating or installing default command "yum install" could be possible.

* The problem would reveal. (The following figure is the complete message)

```Bash
[root@CentOS ~]# yum groupinstall 'Development Tools'
Loaded plugins: fastestmirror, refresh-packagekit, security
Loading mirror speeds from cached hostfile
 * atomic: mirrors.neusoft.edu.cn
 * base: mirror01.idc.hinet.net
 * elrepo: ftp.ne.jp
 * extras: mirror01.idc.hinet.net
 * rpmforge: ftp.kddilabs.jp
 * updates: mirror01.idc.hinet.net
http://linux.dropbox.com/fedora/6/repodata/repomd.xml: [Errno 14] PYCURL ERROR 22 - "The requested URL returned error: 404 Not Found"
Trying other mirror.
Error: Cannot retrieve repository metadata (repomd.xml) for repository: Dropbox. Please verify its path and try again
[root@CentOS ~]#
```

###Solve the problem
---

* We could solve the problem by change the policy Dropbox followed. By changing the baseurl of Dropbox repository file located on ** /etc/yum.repos.d/dropbox.repo **. 

* Use the following command to edit the policy file of Dropbox.

```Bash
# vim /etc/yum.repos.d/dropbox.repo
```

* The new policy could be changed as the following way :

```Bash
[Dropbox]
name=Dropbox Repository
#baseurl=http://linux.dropbox.com/fedora/$releasever/
baseurl=http://linux.dropbox.com/fedora/19/
gpgkey=https://linux.dropbox.com/fedora/rpm-public-key.asc
```
