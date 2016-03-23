# Use OpenShift by linux shell script

因 OpenShift 服務底層為 Git 管理，因此可以透過簡單的 Shell script 佈署與更新服務。

###Shell Script 執行 Git clone 及 push
---

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