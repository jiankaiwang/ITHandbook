# DataPusher

<script type="text/javascript" src="../js/general.js"></script>

###功能簡介
---
* 自動上傳資料內容至 DataStore 資料庫。
* 可自資料編輯頁面之「DataStore」頁籤確認上傳狀態或手動上傳資料至 DataStore 資料庫。

###系統需求
---
* CKAN (>=2.1)
* PostgreSQL (>=9.0)

| 註解 |
| -- |
| 若依照本文件的教學安裝 CKAN，你應該已經滿足所有套件需求 |

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

###佈署
---
DataPusher 的 Production 安裝與 CKAN 類似，使用 nginx + uwsgi 的方式。

| 註解 |
| -- |
| 本教學部份內容係參考 [How To Set Up uWSGI and Nginx to Serve Python Apps on Ubuntu 14.04 (DigitalOcean)](https://www.digitalocean.com/community/tutorials/how-to-set-up-uwsgi-and-nginx-to-serve-python-apps-on-ubuntu-14-04) 與 [Serving Flask With Nginx (Vladik Khononov)](http://vladikk.com/2013/09/12/serving-flask-with-nginx-on-ubuntu/) |

* 安裝 uwsgi：
```Bash
(pyenv) $ pip install uwsgi
```

* 修改 wsgi.py：
為配合 uwsgi，我們需要將 wsgi.py 做小修改。<br>
開啟 /usr/lib/ckan/datapusher/src/datapusher/wsgi.py，修改如下：
```Bash
import ckanserviceprovider.web as web
import datapusher.jobs as jobs
import os
# check whether jobs have been imported properly
assert(jobs.push_to_datastore)
os.environ['JOB_CONFIG'] = '/usr/lib/ckan/datapusher/src/datapusher/deployment/datapusher_settings.py'
web.init()
web.app.run(web.app.config.get('HOST'), web.app.config.get('PORT'))
```

* 建立 uwsgi 設定檔：
創建 log 檔案
```Bash
$ mkdir /etc/ckan/default/log
$ touch /etc/ckan/default/log/datapusher.log
```
新增 /etc/ckan/default/datapusher.ini，內容如下：
```Bash
[uwsgi]
wsgi-file = /usr/lib/ckan/datapusher/src/datapusher/wsgi.py
socket = /tmp/datapusher.sock
master = true
processes = 1
chmod-socket = 664
vacuum = true
die-on-term = true
logto = /etc/ckan/default/log/datapusher.log
```

* 建立 Upstart 檔案：
```Bash
$ sudo vi /etc/init/datapusher.conf
```

* 在開啟的 vi 編輯器中，輸入以下內容：
```Bash
description "uWSGI instance to serve DataPusher"
start on runlevel [2345]
stop on runlevel [!2345]
setuid (填入 /usr/lib/ckan/datapusher 目錄的擁有者)
setgid www-data
script
    cd /etc/ckan/default
    . /usr/lib/ckan/datapusher/bin/activate
    uwsgi --ini /etc/ckan/default/datapusher.ini
end script
```

* 之後便可使用以下指令啟動 DataPusher：
```Bash
$ sudo start datapusher
```

* 你可以使用以下指令確認 DataPusher 是否正常運作：
```Bash
$ ps aux | grep datapusher
```
你應該可以看到類似下面的輸出：
```Bash
demo 1009  0.0  0.2 266332 37512 ?        Sl   Sep14   2:49 uwsgi --ini /etc/ckan/default/datapusher.ini
```

| 註解 |
| -- |
| 目前此佈署方法無法使用 sudo stop datapusher 的方式停止 DataPusher，請直接使用 kill 指令。 |

* 修改 CKAN 設定檔（一般位於 /etc/ckan/default/），修改 ckan.datapusher.url 為：
```Bash
ckan.datapusher.url = http://0.0.0.0:8800/
```

* 重新啟動 CKAN

###問題排除
---
* 若是於資料上傳時出現下列錯誤

```Html
錯誤： Process completed but unable to post to result_url
```

則需要確認 ckan 設定檔中  的 ** ckan.site_url ** 設定為正確，因大多數的 CKAN Server 以 VM 方式建立，若有 URI ，則應以 URI 設置，而非 IP 位置 (尤其在以 NAT 建立的虛擬機上更應如此)，如下範例；

```Bash
ckan.site_url = http://xyz.cloudapp.net/
```




