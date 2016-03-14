# ckanext-harvest
###架構
---
* harvest 的運作大致可分為三步驟（同時也是設計 harvesting interface 的主要結構）:
    * gather: 取得 harvest source 的 id, 數量等基本資訊。
    * fetch: 取得 source 中每個 object（物件，或稱資料集）之 metadata。
    * import: 將上一階段取得的 metadata 轉換並建立為 CKAN package（資料集）。

###功能簡介與使用
---
* 新增 harvest source: <br>
使用瀏覽器開啟 SITE_URL/harvest，選取右上之 “Add Harvest source”，依照畫面輸入 source 網址及選取 source 類別。

* 執行 harvest 工作（手動）
    * 進入 virtualenv，執行 gather 與 fetch handler
```Bash
(pyenv) $ paster --plugin=ckanext-harvest harvester gather_consumer -c /etc/ckan/default/production.ini
(pyenv) $ paster --plugin=ckanext-harvest harvester fetch_consumer -c /etc/ckan/default/production.ini
```

| 註解 |
| -- |
| 請勿關閉這兩個 handler |

    * 使用瀏覽器開啟 SITE_URL/harvest，進入剛才建立的 harvest source，選擇右上的「管理者」按鈕，在接下來的頁面選取 Reharvest ，將此 harvest 工作送入排程。

    * 最後進入 virtualenv，執行 run handler：
```Bash
(pyenv) $ paster --plugin=ckanext-harvest harvester run -c /etc/ckan/default/production.ini
```
即會立即開始執行剛才加入的工作排程。

| 註解 |
| -- |
| 手動執行時 harvest 工作並不會自行停止，因為上述 paster harvester run 指令同時也用來確認 harvest 工作是否完成。因此若您確定 harvest 工作已經完成（或已發生錯誤），可以再次執行 run 指令，即可透過下述 d. 的方式檢視此次工作的結果 |

* 執行 harvest 工作（自動）
在 production 環境時，我們會希望系統可以每隔一段時間自動進行 harvesting，此時可以使用 Supervisor 與 cron 來達到目的：
    * [Supervisor](http://supervisord.org/) : 一套任務管理工具，可以在背景執行指定之工作，我們用它來在背景執行 harvest 的 gather_consumer 與 fetch_consumer 兩個常駐工作。
    * cron: unix/linux 系統工具，可以定時執行之工作，我們用它來定時執行 harvest run 工作。
    * 首先我們要安裝 Supervisor：
```Bash
$ sudo apt-get install supervisor
```
您可以透過以下指令確定 Supervisor 是否正在執行：
```Bash
$ ps aux | grep supervisord
```
若 Supervisor 正在執行，則會看到類似以下的輸出：
```Bash
root      9224  0.0  0.3  56420 12204 ?        Ss   15:52   0:00 /usr/bin/python /usr/bin/supervisord
```
    * Supervisor 的設定檔位於 /etc/supervisor/conf.d 目錄下，我們新增一個新的設定檔，命名為 ckan_harvesting.conf，內容如下：
```Bash
; ===============================
; ckan harvester
; ===============================
[program:ckan_gather_consumer]
command=/usr/lib/ckan/default/bin/paster --plugin=ckanext-harvest harvester gather_consumer -c /etc/ckan/default/production.ini
; user that owns virtual environment.
user=okfn
numprocs=1
stdout_logfile=/var/log/ckan/default/gather_consumer.log
stderr_logfile=/var/log/ckan/default/gather_consumer.log
autostart=true
autorestart=true
startsecs=10
[program:ckan_fetch_consumer]
command=/usr/lib/ckan/default/bin/paster --plugin=ckanext-harvest harvester fetch_consumer -c /etc/ckan/default/production.ini
; user that owns virtual environment.
user=okfn
numprocs=1
stdout_logfile=/var/log/ckan/default/fetch_consumer.log
stderr_logfile=/var/log/ckan/default/fetch_consumer.log
autostart=true
autorestart=true
startsecs=10
```


