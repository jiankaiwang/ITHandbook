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
    access_log    /var/log/nginx/sophia.access.log;
        
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

