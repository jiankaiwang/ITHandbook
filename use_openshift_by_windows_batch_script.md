# Use OpenShift by Windows batch script

OpenShift 除了可以透過 Linux shell script 支援外，也可以透過 Windows batch script (檔名 .bat) 支援使用 OpenShift 的服務，而使用方式與 Git 大致相同。

###Windows Shell Script 執行 OpenShift
---
* 系統環境

  * Clone OpenShift 服務至 local 的路徑為 C:\Users\JianKaiWang\Desktop
  * 

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
