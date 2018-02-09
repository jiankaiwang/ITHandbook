# Jupyter Notebook Server for Multiple Users



* Reference
  * https://jupyterhub.readthedocs.io/en/latest/quickstart.html
  * https://media.readthedocs.org/pdf/jupyterhub/latest/jupyterhub.pdf



## Step

* Install **nodejs**.

```shell
$ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```

* Install the package.

```shell
# install jupyterhub and nodejs-based http-proxy
$ python3 -m pip install jupyterhub
$ sudo npm install -g configurable-http-proxy
$ python3 -m pip install notebook  # needed if running the notebook servers locally

# verify the installation
$ jupyterhub -h
$ configurable-http-proxy -h
```

* A notebook configuration file

```shell
$ mkdir /home/(user)/.jupyterhub/
$ cd /home/(user)/.jupyterhub/

# generate a configuration file
$ jupyterhub --generate-config

# the default configuration path
$ vim /home/(user)/.jupyterhub/jupyterhub_config.py
```

* Running a public notebook server

```ini
# [optional] Set options for certfile, ip, password, and toggle off browser auto-opening
# if the certfile and keyfile is not set, jupyter notebook would be run over http protocol
c.JupyterHub.ssl_cert = u'/etc/letsencrypt/live/example.com/cert.pem'
c.JupyterHub.ssl_key = u'/etc/letsencrypt/live/example.com/privkey.pem'

## The public facing ip of the whole application (the proxy)
c.JupyterHub.ip = '0.0.0.0'

## The public facing port of the proxy
c.JupyterHub.port = 8000

## File in which to store the cookie secret.
c.JupyterHub.cookie_secret_file = '/home/(user)/.jupyterhub/jupyterhub_cookie_secret'

## url for the database. e.g. `sqlite:///jupyterhub.sqlite`
c.JupyterHub.db_url = 'sqlite:///home/(user)/.jupyterhub/jupyterhub.sqlite'
```

* Start the jupyterhub server.

```shell
$ sudo -s
# jupyterhub -f /home/(user)/.jupyterhub/jupyterhub_config.py
```

* Establish the service.

```shell
# create a new service
$ sudo vim /etc/systemd/system/jupyterhubserver.service
```

```ini
[Unit]
Description=Jupyterhub
After=syslog.target network.target

[Service]
User=root
Environment="PATH=/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/home/(user)/anaconda3/bin"
ExecStart=/home/(user)/anaconda3/bin/jupyterhub -f /home/(user)/.jupyterhub/jupyterhub_config.py

[Install]
WantedBy=multi-user.target
```

* Start the service.

```shell
$ sudo systemctl start jupyterhubserver.service
$ sudo systemctl status jupyterhubserver.service
$ sudo systemctl enable jupyterhubserver.service
```

* Surf the service.

```http
<!-- surf the link -->
http(s)://example.com:8000/
```



## Server Configuration



* Nginx

```shell
$ sudo vim /etc/nginx/sites-available/default
```

```ini
server {
    listen 80;
    server_name example.com;

    charset     utf8;
    access_log    /var/log/nginx/access.log;
        
    # jupyter portal
    location /jupyter {
        rewrite /jupyter /hub/ redirect;
    }    

	# for login
    location /hub/ {
        proxy_pass http://127.0.0.1:8000/hub/;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $http_host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # web socket
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
    }

    # for main service
    location /user/ {
        proxy_pass http://127.0.0.1:8000/user/;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $http_host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # web socket
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
    }
}
```

```shell
# reload the configuration
$ sudo systemctl reload nginx
```



## Secure the server



- Install **Let's encrypt**. Refer to the [page](https://jiankaiwang.gitbooks.io/itsys/content/information_security/secure_nginx_with_lets_encrypt_on_ubuntu_1404.html).
- Install **nginx** and set the configuration.

```shell
server {
    listen 80;
    server_name example.com;

    charset     utf8;
    access_log    /var/log/nginx/access.log;

    # jupyter portal
    location /jupyter {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        return 301 https://$server_name$request_uri;

        # port 80
        #rewrite /jupyter /hub/ redirect;
        # redirect to 443
        return 301 https://$server_name/hub/;
    }

    # for login
    location /hub/ {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        return 301 https://$server_name$request_uri;

        #port 80
        #proxy_pass http://127.0.0.1:8000/hub/;
        # port 443
        return 301 https://$server_name/hub/;
    }

    # for main service
    location /user/ {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        return 301 https://$server_name$request_uri;

        # port 80
        #proxy_pass http://127.0.0.1:8000/user/;
        # port 443
        return 301 https://$server_name/user/;
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

    # jupyter portal
    location /jupyter {
        rewrite /jupyter /hub/ redirect;
    }

    # for login
    location /hub/ {
        proxy_pass http://127.0.0.1:8000/hub/;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $http_host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # web socket
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
    }

    # for main service
    location /user/ {
        proxy_pass http://127.0.0.1:8000/user/;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $http_host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # web socket
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
    }
}
```

