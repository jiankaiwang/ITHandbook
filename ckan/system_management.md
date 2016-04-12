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

###以 URI 為例進行設定
---

* 網路配置


* 於 nginx 的設定

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

* 於 CKAN 設定檔進行設定 (production.ini)

```Bash
# ...
# 需要注意的是
ckan.site_url = http://xyz.cloudapp.net/

# ...
solr_url = http://xyz.cloudapp.net:8983/solr/ckan
```
















