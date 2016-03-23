# Use OpenShift by Windows batch script

OpenShift 除了可以透過 Linux shell script 支援外，也可以透過 Windows batch script (檔名 .bat) 支援使用 OpenShift 的服務，而使用方式與 Git 大致相同。

###Windows Shell Script 執行 OpenShift
---
* 系統環境

  * Clone OpenShift 服務至 local 的路徑為 C:\Users\JianKaiWang\Desktop\openshift
  * OpenShift 上存取服務的 ssh url 為 ssh://xxx.yyy.zzz

| 註解 |
| -- |
| 需要注意連接 OpenShift 上某一服務時，該 local 端使用的佈署環境 (例如電腦等)，需要將其 public key 先行放上 OpenShift 中 ([link](https://openshift.redhat.com/app/console/settings)) |

先開啟一份記事本，並加下列 batch script 貼入，然後存成 .bat 檔案

```Bash
@echo off
C:
set localPath=C:\Users\JianKaiWang\Desktop
set localPathFolder=%localPath%\openshift
set openshiftssh=ssh://xxx.yyy.zzz

if "%1"=="-c" GOTO gitClone
if "%1"=="-p" GOTO gitPush
GOTO help

:gitClone
echo Status: start to clone the service from Openshift.
echo Status: move to the path %localPath%
cd %localPath%
git clone %openshiftssh% %localPathFolder%
echo Status: clone complete
goto end

:commitMsg
git commit -a -m "modify_data"
goto finishCommitMsg

:gitPush
echo Status: move to the folder %localPathFolder%
echo Status: start to push the service into Openshift.
cd %localPathFolder%
git add .
if "%2"=="" goto commitMsg
git commit -a -m "%2"
:finishCommitMsg
git push %openshiftssh% master
echo Status: push complete
goto end

:help
echo "Usage: openshift.bat [-c|-p|-h] [commit-message]"
goto end

:end
cd %localPath%
pause
```

使用方式為
* clone

```Bash
C:\Users\JianKaiWang\Desktop> openshift -c
```

* push
  * 沒有輸入 commit subject, 預設為 "modify_data"

```Bash
C:\Users\JianKaiWang\Desktop> openshift -p
```

  * 有輸入 commint subject

```Bash
C:\Users\JianKaiWang\Desktop> openshift -p commit-message
```







