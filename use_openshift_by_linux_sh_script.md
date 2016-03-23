# Use OpenShift by linux shell script

因 OpenShift 服務底層為 Git 管理，因此可以透過簡單的 Shell script 佈署與更新服務。

###Shell Script 執行 Git clone 及 push
---
透過 vim 創造一個 shell script 檔案，並將下列 shell script 貼上

```Bash
$ vim /home/xxx/桌面/openshift.sh
```

```Bash
#!/bin/bash

gitUrl=ssh://xxx.git
clonePath=/home/xxx/yyy

function downClone
{
        if [ -d $clonePath ]; then
                rm -rf $clonePath
        fi
        git clone $gitUrl $clonePath
}

function update
{
        cd $clonePath
        git add .
        git pull $gitUrl
        if [ "$2" = "" ]; then
                git commit -a -m "$2"
        else
                git commit -a -m "modify data"
        fi
        git push $gitUrl master
}

if [ "$1" = "-d" ]; then
        downClone
elif [ "$1" = "-u" ]; then
        update
elif [ "$1" = "-h" ]; then
        echo "Usage: git clone 'welcome' for openshift usage"
else
        echo "Input error!"
        echo "$1 -h gives usage information."
fi
```

使用方法如下；
* clone 至本機 (若已有資料夾，則會先刪除)

```Bash
$ sh /home/xxx/桌面/openshift.sh -d
```

* push 至 OpenShift

```Bash
$ sh /home/xxx/桌面/openshift.sh -u
```

詳細說明如下；
* gitUrl : 為 OpenShift 上該服務 git ssh 協定下的網路位置
* clonePath : 為本機放置此服務程式碼的位置
* downClone : 內含 git clone 的指令
* update : 內含 git push 的指令
* 透過 -h 來顯示使用說明
















