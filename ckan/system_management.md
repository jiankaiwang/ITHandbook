# 系統維護

<script type="text/javascript" src="gitbook/app.js"></script>
<script type="text/javascript" src="js/general.js"></script>

一般而言， CKAN 系統啟動後，便不需要對系統進行重啟，但在開發時 (如 Javascript library 的更新等)、系統更新或是網路環境變動等狀況下，需要將系統進行重新設定，底下便是多種狀況的解決方法。

###更換網路環境 : 需對反向代理伺服器與 CKAN 設定檔進行設定
---

#####反向代理伺服器設定

重新設定 CKAN 系統的網路設置，修改 nginx 中 CKAN 設定，如下；

| 註解 |
| -- |
| 因 CKAN 可以透過虛擬機進行架設，而一台伺服器可以有多個虛擬機同時運作，而透過 nginx 便可以在相同的網路條件下，進行網路反向處理，包含透過轉 port 或 URI 的變動 (如 aaa.company.com 與 bbb.company.com) 等。 |

```Bash
$ sudo vim /etc/nginx/sites-available/ckan
```

主要進行修改的部分為 server_name，

```Bash
proxy_cache_path /tmp/nginx_cache levels=1:2 keys_zone=cache:30m max_size=250m;

server {
    listen 80;
    server_name (Server URI or IP);
    client_max_body_size 1000M;
    access_log /var/log/nginx/ckan_access.log;
    error_log /var/log/nginx/ckan_error.log error;
    charset utf8;

    location / {
        include uwsgi_params;
        uwsgi_pass unix:///tmp/ckan_socket.sock;
        uwsgi_param SCRIPT_NAME '';
    }
}
```

而對於 server_name 的設定有幾個原則；

1. 若有 URI ，不論是透過 DDNS (動態 DNS 伺服器) 來指派或是有指定的網址 (如 azure 等)，則可以此 URI 作為 server_name。

2. 若有 IP ，不論是動態 IP (如虛擬機等) 或是指定 IP 亦可。

3. ** 若是以虛擬機方式架設，網路以 NAT 方式建立，需要透過 host OS 進行轉 port 方式來達成瀏覽 CKAN，如 azure 便是如此，則建議以 URI 方式設定。 (若無 URI，則在 ckan 設定檔中需要確認設定，路徑為 /etc/ckan/default/development.ini) **

#####以 URI 為例進行設定

網路配置

1. 假設 CKAN 於開機後自動載入的設定檔 (預設路徑為 ** /etc/init/ckan.conf **) 中設定 production.ini 為 CKAN 預設使用的組態檔。
2. 假設雲端平台指派的 URI 為 ** xyz.cloudapp.net **。

於 nginx 的設定 (** /etc/nginx/sites-available/ckan **) : 主要為 **  server_name ** 的設定

```Bash
proxy_cache_path /tmp/nginx_cache levels=1:2 keys_zone=cache:30m max_size=250m;

server {
    listen 80;
    server_name xyz.cloudapp.net;
    client_max_body_size 1000M;
    access_log /var/log/nginx/ckan_access.log;
    error_log /var/log/nginx/ckan_error.log error;
    charset utf8;

    location / {
        include uwsgi_params;
        uwsgi_pass unix:///tmp/ckan_socket.sock;
        uwsgi_param SCRIPT_NAME '';
    }
}
```

於 CKAN 設定檔進行設定 (** /etc/ckan/default/production.ini **)

```Bash
# ...
# 需要注意的是
ckan.site_url = http://xyz.cloudapp.net/

# ...
solr_url = http://xyz.cloudapp.net:8983/solr/ckan
```

設定完畢後，重新啟動 CKAN 與 nginx，便可以透過瀏覽器輸入網址

```Html
http://xyz.cloudapp.net/
```

來瀏覽 CKAN 服務。

#####以 NAT 方式建立網路環境

NAT 方式為虛擬機 (Client OS) 向 Host OS 註冊一個 IP，此 IP 與 Host OS 網域並不相同，因此需要透過 Host OS 轉址方式才能瀏覽到虛擬機的頁面。

網路配置

1. 假設 CKAN 於開機後自動載入的設定檔 (預設路徑為 ** /etc/init/ckan.conf **) 中設定 production.ini 為 CKAN 預設使用的組態檔。
2. 假設虛擬機取得由網卡分配的 IP 位置為 ** 10.0.2.15 **。
3. Host OS 與 Client OS 的轉址設置如下；

| 名稱 | 協定 | 主機 IP | 主機連接埠 | 客體 IP | 客體連接埠 |
| -- | -- | -- | -- | -- | -- |
| solr | TCP | 127.0.0.1 | 8983 | 10.0.2.15 | 8983 |
| datapusher | TCP | 127.0.0.1 | 8800 | 10.0.2.15 | 8800 |
| http | TCP | 127.0.0.1 | 9080 | 10.0.2.15 | 80 |
| ssh | TCP |127.0.0.1 | 9022 | 10.0.2.15 | 22 |

於 nginx 的設定 (** /etc/nginx/sites-available/ckan **)

| 註解 |
| -- |
| ** 需要注意的是 nginx 是處理轉入 Client OS 的 request，因此 server_name 需要填寫 127.0.0.1，而非瀏覽器上所列的 127.0.0.1:9080。 ** |

```Bash
# ...

server {
    listen 80;
    server_name 127.0.0.1;
    client_max_body_size 1000M;

# ...
```

於 CKAN 設定檔進行設定 (** /etc/ckan/default/production.ini **)，如下；

| 註解 |
| -- |
| ** 需要注意的是 CKAN 組態檔與 nginx 設置相同，因執行的 scope 皆為 Client OS，因此在 ckan.site_url 設定需以 127.0.0.1 為主，非流覽器網址的 127.0.0.1:9080 ** |

```Bash
# ...
ckan.site_url = http://127.0.0.1/

# ...
solr_url = http://127.0.0.1:8983/solr/ckan
```

設定完畢後，重新啟動 CKAN 與 nginx，便可以透過瀏覽器輸入網址

```Html
http://127.0.0.1:9080/
```

來瀏覽 CKAN 服務。

#####以 Bridge 方式建立網路環境

Bridge 方式為虛擬機 (Client OS) 直接向網路卡取得一組 IP 位置，且此 IP 位置的網域與 Host OS 相同，因此可以直接使用瀏覽器網址輸入 ip 位址即可 (如 http://192.168.1.157/ 等)。

網路配置

1. 假設 CKAN 於開機後自動載入的設定檔 (預設路徑為 ** /etc/init/ckan.conf **) 中設定 production.ini 為 CKAN 預設使用的組態檔。
2. 假設虛擬機取得由網卡分配的 IP 位置為 ** 192.168.1.157 **。

於 nginx 的設定 (** /etc/nginx/sites-available/ckan **)

```Bash
# ...

server {
    listen 80;
    server_name 192.168.1.157;
    client_max_body_size 1000M;

# ...
```

於 CKAN 設定檔進行設定 (** /etc/ckan/default/production.ini **)

```Bash
# ...
ckan.site_url = http://192.168.1.157/

# ...
solr_url = http://192.168.1.157:8983/solr/ckan
```

設定完畢後，重新啟動 CKAN 與 nginx，便可以透過瀏覽器輸入網址

```Html
http://192.168.1.157/
```

來瀏覽 CKAN 服務。

#####重啟 CKAN 服務

當重新設定 nginx 與 CKAN 組態檔後，必須重新將之啟動，如下指令；

* 重啟反向代理伺服器

```Bash
$ sudo service nginx restart
```

* 重啟 CKAN 服務

```
$ sudo restart ckan
```












