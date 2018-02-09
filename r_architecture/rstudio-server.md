# Rstudio Server (Open Source Edition)



## Installiation

```shell
# update the os system and others tools
$ sudo apt-get update
$ sudo apt-get upgrade

# install R-core
$ cd /usr/src
$ sudo sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E298A3A825C0D65DFD57CBB651716619E084DAB9
$ sudo add-apt-repository 'deb [arch=amd64,i386] https://cran.rstudio.com/bin/linux/ubuntu xenial/'
$ sudo apt-get update
$ sudo apt-get install r-base

# install rstudio server
$ sudo apt-get install gdebi-core
$ wget https://download2.rstudio.org/rstudio-server-1.1.419-amd64.deb
$ sudo gdebi rstudio-server-1.1.419-amd64.deb

# verify the installiation
$ sudo rstudio-server verify-installation

# start the rstudio server service
$ sudo systemctl start rstudio-server.service
$ sudo systemctl status rstudio-server.service
$ sudo systemctl enable rstudio-server.service
```



## User



* Add a new user.

```shell
$ sudo adduser example
```



## Usage

* Surf the link http://example.com:8787/ and start the rstudio server service.




## Secure with Let's encrypt.



- Install **Let's encrypt**. Refer to the [page](https://jiankaiwang.gitbooks.io/itsys/content/information_security/secure_nginx_with_lets_encrypt_on_ubuntu_1404.html).
- Install **nginx** and set the configuration.

```shell
server {
    listen 80;
    server_name example.com;

    charset     utf8;
    access_log    /var/log/nginx/access.log;

    # rstudio server
    location /rstudio/ {
        # port 80
        #proxy_pass http://127.0.0.1:8787/;
        
        # redirect to 443
        return 301 https://$server_name$request_uri;
    }
}

server {
    listen 443;
    server_name example.com;

    charset     utf8;
    access_log    /var/log/nginx/access.log;

    ssl                  on;
    ssl_certificate      /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key  /etc/letsencrypt/live/example.com/privkey.pem;
    ssl_session_timeout  3m;
    ssl_dhparam /etc/ssl/certs/dhparam.pem;
    ssl_stapling on;
    ssl_stapling_verify on;
    ssl_session_cache shared:SSL:50m;
    add_header Strict-Transport-Security max-age=15768000;

    ssl_protocols  SSLv2 SSLv3 TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers  'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:AES:CAMELLIA:DES-CBC3-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH:!EDH-DSS-DES-CBC3-SHA:!EDH-RSA-DES-CBC3-SHA:!KRB5-DES-CBC3-SHA';
    ssl_prefer_server_ciphers   on;

    # rstudio server
    location /rstudio/ {
        proxy_pass http://127.0.0.1:8787/;
    }
}
```



