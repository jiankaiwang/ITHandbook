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
* 方法一： It might go **wrong**.

  * Installing using update packages : [https://gist.github.com/luislavena/f064211759ee0f806c88](https://gist.github.com/luislavena/f064211759ee0f806c88)

  * gem install the software by command line (assume the software installation file is under C:\)

```Bash
C:\Windows\System32>gem install --local C:\rubygems-update-1.8.30.gem
```
  
  * update the rubygem

```Bash
C:\Windows\System32>update_rubygems --no-ri --no-rdoc
```
  
* 方法二： directly install rubygem and update

```Bash
C:\Windows\System32>gem install rubygems-update
C:\Windows\System32>update_rubygems
C:\Windows\System32>gem update --system
```

###安裝與啟動 rhc
---
* 安裝 rhc

```Bash
C:\Windows\System32>gem install rhc
```

* 啟動 rhc

```Bash
C:\Windows\System32>rhc setup
```

* 設定 rhc

  * 輸入 OpenShift Server hostname : (預設是正確的，可以直接按 enter)
```Bash
Enter the server hostname: |openshift.redhat.com|
```

  * 登入 OpenShift 的帳號，以 abc@gmail.com 為例
```Bash
Login to openshift.redhat.com: abc@gmail.com
```

  * 輸入密碼 : 密碼為不可見，輸入中也不會出現任何符號
```Bash
Password:
```

  * 是否產生一組新的 token : 若是第一次透過 SSH 登入 OpenShift，回 "yes"；若非第一次登入，則應已有 SSH public 及 Private Key。
```Bash
Generate a token now? (yes|no)
```











