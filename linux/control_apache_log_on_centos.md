# Control Apache Log on CentOS

<script type="text/javascript" src="../js/general.js"></script>

###Background
---

* LAMP system 一直以來都是許多伺服器的設計架構，但 Apache 本身因提供服務後，會產生許多 log 檔案 (default: /var/log/httpd/)；包含 error_log、access_log、ssh_access_log 等。當 apache 啟動時間一段時間後， log 檔案大小也會隨之變大許多，尤其是 error_log file，可能會有上百 GB 的大小，因此需要有一個控制 log 檔案大小的方法。

* 一般而言，並不建議將 log 檔案關閉或直接刪除 log 檔案，因為許多資料處理的回饋會透過 log 查詢，因此大都建議能保留。底下便是提供一個方法，依照固定的時間建立一筆大小固定的 log 檔案。

###Method
---

* 先在 "/" (需要 root 權限) 底下建立一個專門放 apache_log 的資料夾，稱為 apache_log，完整路徑為 /apache_log

```Bash
# mkdir /apache_log
```

* 因為產生 log 檔案這件事主要由 root 進行管理，但可由 httpd 進行寫入，所以接下來需要修改此資料夾的 SELinux 原則，如下

```Bash
# chcon -Rt httpd_log_t /apache_log
```

* 開啟 httpd.conf 的設定檔案 (default: /etc/httpd/conf/httpd.conf)，找到 ErrorLog 的位置，將原本 ErrorLog "logs/error_log" 註解化成 #ErrorLog "logs/error_log"，然後改成下列指令：

```Bash
ErrorLog " | /usr/sbin/rotatelogs /home/ntu.sbl.main/apache_system/%Y_%m_%d_error_log 86400 1M"
```

  1. 其中 rotatelogs 為一 program，安裝 apache 時亦同時安裝
  2. 其中 86400 表示為一天，即 24 (小時) * 60 (分鐘) * 60 (秒)
  3. 而 1M 表示為 log_file_size 最大為 1M

* 然後相同的方法也用在 CustomLog，先在 httpd.conf 檔案中找到 CustomLog，而後作底下的修正

  1. CustomLog "logs/access_log" combined 註解化，前面加上 #，並修改成底下的 command
  2. CustomLog " | /usr/sbin/rotatelogs /apache_log/%Y_%m_%d_access_log 86400 1M" common
  3. 其中 common 表示一般檔案，而 combined 表示和某一檔案進行合併

