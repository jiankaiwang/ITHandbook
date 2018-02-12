# Shiny-Server



## install on ubuntu 16.04
* 參考資料 : [https://www.rstudio.com/products/shiny/download-server/](https://www.rstudio.com/products/shiny/download-server/)

* 安裝指令

```bash
# update library list and upgrade current 
sudo apt-get update
sudo apt-get upgrade

# install R core
sudo apt-get install r-base
sudo apt-get install r-base-dev

# install shiny package into R core
sudo su -c "R -e \"install.packages('shiny', repo='https://cran.rstudio.com')\""

# install gdebi core for .deb
sudo apt-get install gdebi-core

# download installer
wget https://download3.rstudio.org/ubuntu-12.04/x86_64/shiny-server-1.5.1.834-amd64.deb

# install installer
sudo gdebi shiny-server-1.5.1.834-amd64.deb
```

* Configuration

```bash
# main conf file
# default site_dir : /srv/shiny-server
# default R_code_dir : /opt/shiny-server
# default site_port : 3838
sudo vim /etc/shiny-server/shiny-server.conf 

# main shiny-server log path
cd /var/log/shiny-server/

# service operation
sudo service shiny-server [start|stop|restart]
```

* Suggested packages into R core : Plotly

```bash
# install necessary softwares
sudo apt-get install libxml2-dev
sudo apt-get install openssl
sudo apt-get install libssl-dev
sudo apt-get install curl
sudo apt-get install libcurl4-gnutls-dev

# install packages or connectors into R core on the regular repository
sudo su -c "R -e \"install.packages('rmarkdown',repos='https://cran.rstudio.com')\""
sudo su -c "R -e \"install.packages('XML', repo='https://cran.rstudio.com')\""
sudo su -c "R -e \"install.packages('httr', repo='https://cran.rstudio.com')\""
sudo su -c "R -e \"install.packages('openssl', repo='https://cran.rstudio.com')\""
sudo su -c "R -e \"install.packages('curl', repo='https://cran.rstudio.com')\""
sudo su -c "R -e \"install.packages('plotly', repo='https://cran.rstudio.com')\""
sudo su -c "R -e \"install.packages('ggthemes', repo='https://cran.rstudio.com')\""
```

* Run with shared folder by VM (VirtualBox as the example)

```bash
# add to the group
# by default, shiny-server is running by a default user : shiny (in conf file)
sudo adduser shiny vboxsf
```



## Secure with Let's encrypt.



* Install **Let's encrypt**. Refer to the [page](https://jiankaiwang.gitbooks.io/itsys/content/information_security/secure_nginx_with_lets_encrypt_on_ubuntu_1404.html).
* Install **nginx** and set the configuration.

```shell
$ sudo vim /etc/nginx/sites-available/default
```

```ini
server {
    listen 80;
    server_name example.no-ip.biz;

    charset     utf8;
    access_log    /var/log/nginx/access.log;

    # let's encrypt
    location ~ /.well-known {
        root /path/letsencrypt;
        allow all;
    }
}
```

* Get the certificate.

```shell
$ cd /opt/letsencrypt
$ ./letsencrypt-auto certonly -a webroot --webroot-path=/path/letsencrypt -d example.no-ip.biz
```

* Edit the nginx configuration and set ssl.

[Notice: It is to secure the nginx server, not the shiny service, but over proxy_pass.]

```ini
server {
    listen 80;
    server_name example.no-ip.biz;

    charset     utf8;
    access_log    /var/log/nginx/access.log;

    location /rshiny/ {
        # redirect to 443
        proxy_set_header Host      $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        return 301 https://$server_name$request_uri;
    }
}

server {
    listen 443;
    server_name example.no-ip.biz;

    charset     utf8;
    access_log    /var/log/nginx/access.log;

    ssl                  on;
    ssl_certificate      /etc/letsencrypt/live/example.no-ip.biz/fullchain.pem;
    ssl_certificate_key  /etc/letsencrypt/live/example.no-ip.biz/privkey.pem;
    ssl_session_timeout  3m;
    ssl_dhparam /etc/ssl/certs/dhparam.pem;
    ssl_stapling on;
    ssl_stapling_verify on;
    ssl_session_cache shared:SSL:50m;
    add_header Strict-Transport-Security max-age=15768000;

    ssl_protocols  SSLv2 SSLv3 TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers  'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:AES:CAMELLIA:DES-CBC3-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH:!EDH-DSS-DES-CBC3-SHA:!EDH-RSA-DES-CBC3-SHA:!KRB5-DES-CBC3-SHA';
    ssl_prefer_server_ciphers   on;

    # rshiny service
    location /rshiny/ {
        proxy_set_header Host      $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:3838/;

        # web socket
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
    }
}
```







