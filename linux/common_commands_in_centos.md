# Common Commands in CentOS

<script type="text/javascript" src="../js/general.js"></script>

###auto login
---

* 設定組態檔

```Bash
$ sudo vim /etc/gdm/custom.conf
```

* 編輯內容

```Bash
AutomaticLoginEnable=true
AutomaticLogin=<username>
```

###RAID Status
---

```Bash
# /home was mount under /dev/md0 and /var was mount under /dev/md1

$ mdadm --detail /dev/md0
$ mdadm --detail /dev/md1
```

###Set the line number when using vim/vi
---

```Bash
# vim /etc/vimrc

set nu                                                       # in the end of file
```

###Install flash from adobe website
---

* Website: [Link (http://get.adobe.com/tw/flashplayer/)](http://get.adobe.com/tw/flashplayer/)

* Choose .rpm file

* install

```Bash
$ rpm -ivh .rpm
```

###Install RPMforge
---

* Check the file installed from [website (http://wiki.centos.org/zh-tw/AdditionalResources/Repositories/RPMForge)](http://wiki.centos.org/zh-tw/AdditionalResources/Repositories/RPMForge)

```Bash
$ wget http://pkgs.repoforge.org/rpmforge-release/rpmforge-release-0.5.3-1.el6.rf.i386.rpm
# cd /etc/yum.repos.d                 # yum repos folder
```

###groupinstall developmental tools, including Perl
---

```Bash
$ yum groupinstall "Development Tools"
```

###Install python
---

```Bash
$ sudo yum install python*
```

###Install kernel-devel
---

```Bash
$ sudo yum install kernel-devel
```

###Install java and eclipse
---

* [Website: http://www.oracle.com/technetwork/java/javase/downloads/index-jsp-138363.html](http://www.oracle.com/technetwork/java/javase/downloads/index-jsp-138363.html)

* download the latest JDK, this could be .rpm format

* [Website: https://www.eclipse.org/downloads/](https://www.eclipse.org/downloads/)

* download JEE version

```Bash
$ gzip -d ./eclipse-jee-kepler-SR2-linux-gtk.tar.gz
$ tar -x ./eclipse-jee-kepler-SR2-linux-gtk.tar
$ mv ./eclipse /home/JKW/programs
$ /home/JKW/code/workspace                         # as default path
```

in eclipse, use oracle java as the default setting

```Bash
open JEE -> Windows -> Preferences -> java -> Installed JREs -> Add -> "/usr/java/jdkx.x.x"
```

###Firewall
---

* open port 80(http) and 443(https)

```Bash
$ sudo vim /etc/sysconfig/iptables

# and add the following setting:
-A INPUT -m state --state NEW -m tcp -p tcp --dport 80 -j ACCEPT
-A INPUT -m state --state NEW -m tcp -p tcp --dport 443 -j ACCEPT
```

* Firewall stop

```Bash
# service iptables stop
```

###Basic internet
---

```Bash
# vim /etc/hosts

# add the end of the file
140.112.230.22 JKWCentOS JKWCentOS.ntu.edu.tw

# domainname -v ntu.edu.tw
```

###NTFS kernel with backup mobile-disk
---

```Bash
# yum search ntfs
# yum install ntfs-3g.i686
```

###Build a shared folder connected among main and client OS
---

* 在 Windows VirtualBox 軟體下建立 Shared_CentOS 共用資料夾

```Bash
$ sudo mount -t vboxsf Shared_CentOS /home/jkw/桌面/Shared_Windows
```



