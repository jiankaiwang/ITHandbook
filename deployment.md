# 佈署

由於 CKAN 使用 pylons 開發，只要使用任何支援 WSGI 標準的網頁伺服器 (及相關套件) 即可佈署 CKAN。 官方文件 提供多種佈署方式，此教學使用 nginx + uwsgi 方式，較官方示範之 Apache + modwsgi + nginx 單純。

| 註解 |
| -- |
| 本教學部份內容係參考 [How To Set Up uWSGI and Nginx to Serve Python Apps on Ubuntu 14.04 (DigitalOcean)](https://www.digitalocean.com/community/tutorials/how-to-set-up-uwsgi-and-nginx-to-serve-python-apps-on-ubuntu-14-04) |


###新增 production.ini 設定檔
---
```Bash
$ cp /etc/ckan/default/development.ini /etc/ckan/default/production.ini
```

###修改 production.ini
---
* 開啟 production.ini，並修改 [app:main] 的相關設定如下：
```Bash
[app:main]
# 主要是使用 domain.name，但測試時可以使用 IP address
# ckan.site_url = http://site.domain
ckan.site_url = http://127.0.0.1:5000/
```

* 並在檔案的最下方加入：
```Bash
[uwsgi]
socket = /tmp/ckan_socket.sock
master = true
processes = 1
chmod-socket = 664
vacuum = true
die-on-term = true
logto = (欲存放程式除錯紀錄檔之目錄)
```

###安裝 uwsgi
---
* 在虛擬環境下安裝 uwsgi：
```Bash
$ . /usr/lib/ckan/default/bin/activate
(pyenv) $ pip install uwsgi
```

###設定開機自動執行
---
* 建立 Upstart 檔案：
```Bash
$ sudo vi /etc/init/ckan.conf
```

* 在開啟的 vi 編輯器中，輸入以下內容：

```Bash
description "uWSGI instance to serve CKAN"

start on runlevel [2345]
stop on runlevel [!2345]

setuid (填入 /usr/lib/ckan/default 目錄的擁有者)
setgid www-data

script
    cd /etc/ckan/default
    . /usr/lib/ckan/default/bin/activate
    uwsgi --ini-paste /etc/ckan/default/production.ini
end script
```

* 之後便可使用以下指令啟動網站：
```Bash
$ sudo start ckan
```

* 你可以使用以下指令確認網站是否正常運作：
```Bash
$ ps aux | grep ckan
```
你應該可以看到類似下面的輸出：
```Bash
demo 12575  0.0  0.5 249060 85144 ?        S    Sep15   0:41 uwsgi --ini-paste /etc/ckan/default/production.ini
```

* 你可以使用以下指令停止網站：
```Bash
$ sudo stop ckan
```







