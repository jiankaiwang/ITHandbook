# Use OpenShift by Windows batch script

OpenShift 除了可以透過 Linux shell script 支援外，也可以透過 Windows batch script (檔名 .bat) 支援使用 OpenShift 的服務，而使用方式與 Git 大致相同。

###clone
---
開啟 windows 命令提示字元，並於「桌面」將 OpenShift 上的服務複製到本機

```Bash
C:\Windows\System32> git clone ssh://xxx.yyy.zzz
```

###push
---
開啟 windows 命令提示字元，並移動至要佈署於 OpenShift 服務的資料夾

```Bash
C:\Windows\System32> cd C:\temp\openshift\welcome
C:\Windows\System32> git add .
C:\Windows\System32> git commit -a -m "modify_data"
C:\Windows\System32> git push ssh://xxx.xxx.xxx.xxx.xxx master
```

