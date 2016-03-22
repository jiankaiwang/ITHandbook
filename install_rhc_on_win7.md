# 安裝 rhc 於 Windows 7

###安裝 Ruby
---
* Install Ruby with RubyInstaller : [Official Website](http://rubyinstaller.org/)
  * during the installation you can accept all of the defaults
  * it is mandatory that you select the Add Ruby executables to your PATH check box in order to run Ruby from the command line
  * Use command 'ruby -v' to check the version of ruby and whether it works correctly or not

```Bash
Microsoft Windows [版本 6.1.7601]
Copyright (c) 2009 Microsoft Corporation.  All rights reserved.

C:\Windows\System32>ruby -v
ruby 1.9.3p551 (2014-11-13) [i386-mingw32]
```
 
| 註解 |
| -- |
| 建議安裝 ruby 1.9.3 版本 |

###安裝 Git 版本控制軟體
---
* 安裝 [Git for Windows (link)](http://msysgit.github.com/)，透過 Git 能夠進行分散式開發且作為與 OpenShift 服務進行版本控管的依據
* 安裝完後，預設會直接將 git Path 加入環境變數中，可以透過命令提式字元進行查詢
* Use command 'git --version' to check the version of git and whether it works correctly or not

```Bash
Microsoft Windows [版本 6.1.7601]
Copyright (c) 2009 Microsoft Corporation.  All rights reserved.

C:\Windows\System32>git --version
git version 2.6.4.windows.1
```

###安裝及設定 OpenShift gem
---





