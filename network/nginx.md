# Nginx



## 狀況/問題

* 當我們僅有一個 IP，一個實體主機，卻需要同時利用多虛擬機來提供不同服務時

* 或是需要利用一個實體主機來指向不同內網的實體主機時

當上述狀況發生時，通常會有兩個方法來達成，

* 利用 DNS 分層進行解析位置

* 利用不同 port 來分開處理不同的服務



## 利用不同 DNS 的例子

有兩虛擬機伺服器 (VM1,VM2) 分別有兩個網址

* abc.example.com.tw (VM1) 指到 111.222.111.222

* def.example.com.tw (VM2) 指到 111.222.111.222

而此兩個網址皆由電信公司代管，此時可以用 nginx 反向代理伺服器來處理

* 利用實體主機或是虛擬機上安裝 nginx

* 將外部連入 port 80 (www,http) 的服務導入

* 利用 nginx 的 domain vhost 偵測連入的網址，若是 abc.example.com.tw 則轉向 VM1，若是 def.example.com.tw 則轉向 VM2



## 利用不同 port 的例子

而很多實施例則是利用不同 port 來達成，如下有兩台虛擬機，資訊分別如下：

* System01 (VM1); inner IP: 192.168.56.101

* System02 (VM2); inner IP: 192.168.56.102

而實體主機資訊為 System.main; Outer IP: 10.12.52.89，而實施例概念如下；

* 在實體機上安裝 nginx，並提供反向代理服務

* 根據不同的連入 port 來提供在不同虛擬機上的福務

* 而兩台虛擬機上皆有 apache 提供正向伺服器的服務



## 安裝 nginx，舉 CentOS 6.4 為例

先在負責軟體更新與安裝的資料夾下，編輯 nginx 相關的安裝資料

```Bash
$ sudo vim /etc/yum.repos.d/nginx.repo
```

然後鍵入下列資料

```Bash
[nginx]
name=nginx repo 
baseurl=http://nginx.org/packages/centos/6/$basearch/
gpgcheck=0
enabled=1
```

* 其中 baseurl=http://nginx.org/packages/OS/EOSRELEAS/$basearch/
* OS: 指你所使用的作業系統，以此例而言，為 centos
* EOSRELEAS: 指你的作業系統的版本，以此例而言，為 6

然後利用 yum 來進行安裝 nginx

```Bash
sudo yum install nginx
```

之後可以利用 rpm 來查看安裝後的文件放置位址

```Bash
rpm -ql nginx
```

安裝完成後，就可以利用 service 來開啟 nginx 服務

```Bash
sudo service nginx restart
```



## 設置反向代理位址

設定 nginx 反向代理的檔案位置為 /etc/nginx，而底下有兩個資料夾；

* 主要設定資料夾： /etc/nginx/ (主要檔案：nginx.conf)

* 擴充設定資料夾： /etc/nginx/conf.d/ (擴充檔案：*.conf)

而當我們要設置反向代理的資訊時，可以在 /conf.d/ 下放置一個副檔名為 .conf 檔案即可，舉例而言：

* 設定主機監聽 port 8100

* 將連入 8100 port 的服務導向 inner IP (VM allocated) 192.168.56.101 的虛擬機 1 (System01)

而設定檔案可以設置如下

```Bash
server {
	listen		8100;
	server_name	10.12.52.89;
	
	charset		utf8;
	access_log	/var/log/nginx/system01.log	main;
	
	location / {
        proxy_pass       http://192.168.56.101:80;
        proxy_set_header Host      $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

其中 proxy_pass 便是要導向的 inner IP 位址，80 為導入的 port，之後再重新啟動一次服務即可

```Bash
$ sudo service nginx restart
```

若是設置上沒有問題，但仍然不能 access，可以嘗試朝 firewall 的方面來處理



## nginx 提供的首頁與網站放置資料夾

此資料夾位於 /usr/share/nginx/html，而內含有如 default.html 與 50x.html 等預設的 html 文件



## nginx 設定 Access-Control-Allow-Origin

* 底下是 site-availables 底下其中一組態範例

```ini
server {
    listen 9080;

    server_name 127.0.0.1;

    client_max_body_size 1000M;
    access_log /var/log/nginx/ckan_access.log;
    error_log /var/log/nginx/ckan_error.log error;
    charset utf8;

    location / {
        add_header Access-Control-Allow-Origin *;
        include uwsgi_params;
        uwsgi_pass unix:///tmp/ckan_socket.sock;
        uwsgi_param SCRIPT_NAME '';
    }
}
```

於 **location /** 底下設置即可

```ini
add_header Access-Control-Allow-Origin *
```



## 安裝於 Ubuntu

* 底下舉 ubuntu 16.04 為例

```shell
$ sudo apt-get update
$ sudo apt-get install nginx nginx-extras php php-fpm
```

* Check the fastcgi pass configuration.

```shell
# the following is the default setting
# listen = /run/php/php7.0-fpm.sock
$ cat /etc/php/7.0/fpm/pool.d/www.conf | grep 'listen ='
```

* Edit the configuration.

```shell
$ sudo vim /etc/nginx/sites-available/default
```

* And add the following block to the configuration.

```conf
server {
    listen 80;
    root /usr/share/nginx/html;
    server_name example.com;
    index index.php index.html;
    access_log /var/log/nginx/jiankaiwang.access.log;
    error_log /var/log/nginx/jiankaiwang.error.log;

    # pass the PHP scripts to FastCGI server listening on the php-fpm socket
    location ~* \.php$ {
        try_files $uri =404;
        fastcgi_pass unix:/run/php/php7.0-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```



## 設定 https Proxy_Pass



底下為透過 nginx 設定 https 協定的 proxy_pass 範例，並可以透過 nginx 轉入 node js 服務。



```ini
server {
        listen 443;
        server_name example.com;

        charset     utf8;
        access_log    /var/log/nginx/example.com.log    main;

        ssl                  on;
        ssl_certificate      /etc/letsencrypt/live/example.com/fullchain.pem;
        ssl_certificate_key  /etc/letsencrypt/live/example.com/privkey.pem;
        ssl_session_timeout  3m;

        ssl_protocols  SSLv2 SSLv3 TLSv1;
        ssl_ciphers  'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:AES:CAMELLIA:DES-CBC3-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH:!EDH-DSS-DES-CBC3-SHA:!EDH-RSA-DES-CBC3-SHA:!KRB5-DES-CBC3-SHA';
        ssl_prefer_server_ciphers   on;

        location / {
                proxy_pass https://example.com:4430;
                proxy_set_header Host      $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
}
```










