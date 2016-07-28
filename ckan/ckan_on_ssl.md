# CKAN on SSL

<script type="text/javascript" src="../js/general.js"></script>

### 預先準備
---

* 於 Nginx 中使用 Let's encrypt : [https://jiankaiwang.gitbooks.io/itsys/content/information_security/secure_nginx_with_lets_encrypt_on_ubuntu_1404.html](https://jiankaiwang.gitbooks.io/itsys/content/information_security/secure_nginx_with_lets_encrypt_on_ubuntu_1404.html)

### 修改 ngnix 服務 default 設定
---

* 一般而言， nginx 預設內容可以不用多加設定

```Bash
server {

        # port 80 is also activated
        listen 80 default_server;
        listen [::]:80 default_server ipv6only=on;

        # port 443 to use ssl protocol
        listen 443 ssl;

        root /usr/share/nginx/html;
        index index.html index.htm;

        location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                try_files $uri $uri/ =404;
                # Uncomment to enable naxsi on this location
                # include /etc/nginx/naxsi.rules
        }

        location ~ /.well-known {
               allow all;
        }

}
```

### 修改 nginx 服務中 ckan 的組態
---

* 主要針對 ckan 設定 nginx 服務轉 port

```bash
proxy_cache_path /tmp/nginx_cache levels=1:2 keys_zone=cache:30m max_size=250m;

server {
    listen 80;
    server_name example.no-ip.biz;
    return 301 https://$host$request_uri;
}

server {

    listen 443;

    # cakn server url
    server_name example.no-ip.biz;

    client_max_body_size 1000M;
    access_log /var/log/nginx/ckan_access.log;
    error_log /var/log/nginx/ckan_error.log error;
    charset utf8;

    # ssl configuration
    ssl on;
    
    # full chain : combine both domanin's certificate and let's encrypt chain certificate
    ssl_certificate /etc/letsencrypt/live/example.no-ip.biz/fullchain.pem;
    
    # the certificate's private key
    ssl_certificate_key /etc/letsencrypt/live/example.no-ip.biz/privkey.pem;

    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    
    # use Diffie-Hellman Group
    ssl_dhparam /etc/ssl/certs/dhparam.pem;
    ssl_ciphers 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:AES:CAMELLIA:DES-CBC3-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH:!EDH-DSS-DES-CBC3-SHA:!EDH-RSA-DES-CBC3-SHA:!KRB5-DES-CBC3-SHA';
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_stapling on;
    ssl_stapling_verify on;
    add_header Strict-Transport-Security max-age=15768000;

    # add the access directory to the block server
    location ~ /.well-known {
        allow all;
    }

    location / {
        include uwsgi_params;
        uwsgi_pass unix:///tmp/ckan_socket.sock;
        uwsgi_param SCRIPT_NAME '';
    }
}
```

### 修改 ckan 服務 production 組態
---

```bash

...

# make sure to change ckan site url
ckan.site_url = https://example.no-ip.biz/

...

...

# 需要注意 solr 並不支援 https, 需用 http protocol
solr_url = http://example.no-ip.biz:8983/solr/ckan

...

```
