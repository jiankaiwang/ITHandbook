# DataPusher
###安裝
---
* 安裝必須套件：
```Bash
$ sudo apt-get install python-dev python-virtualenv build-essential libxslt1-dev libxml2-dev git
```

* 新增一個虛擬環境供 DataPusher 使用：
```Bash
$ sudo mkdir -p /usr/lib/ckan/datapusher
$ sudo chown `whoami` /usr/lib/ckan/datapusher
$ virtualenv --no-site-packages /usr/lib/ckan/datapusher
```

* 進入剛才新增的虛擬環境：
```Bash
$ . /usr/lib/ckan/datapusher/bin/activate
```

* 自 github ckeckout source 並安裝：
```Bash
$ mkdir /usr/lib/ckan/datapusher/src
$ cd /usr/lib/ckan/datapusher/src
$ git clone https://github.com/ckan/datapusher.git
$ cd /usr/lib/ckan/datapusher/src/datapusher
(pyenv) $ pip install -e .
```

* 安裝所需 Python 套件：
```Bash
(pyenv) $ pip install -r requirements.txt
```

* 執行 DataPusher：
```Bash
(pyenv) $ JOB_CONFIG='/usr/lib/ckan/datapusher/src/datapusher/deployment/datapusher_settings.py' python wsgi.py
```

* 測試 DataPusher，可在瀏覽器輸入 [http://127.0.0.1:8800](http://127.0.0.1:8800)

* 啟用 DataPusher CKAN 外掛：
修改 CKAN 設定檔（一般位於 /etc/ckan/default/），在 ckan.plugins 最後加上：
```Bash
ckan.plugins = datapusher
```

* 重新啟動 CKAN







