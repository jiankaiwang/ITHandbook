# Jupyter Notebook Server for Single User



* reference
  *  http://jupyter-notebook.readthedocs.io/en/4.x/public_server.html




## Steps

* A notebook configuration file

```shell
# generate a configuration file
$ jupyter notebook --generate-config

# the default configuration path
$ vim /home/(user)/.jupyter/jupyter_notebook_config.py
```



* Automatic Password setup

```shell
# start python
$ python
```

```python
# import the library
from notebook.auth import passwd

# generate SHA-1 password
# for exmaple: u'sha1:xxx:yyy'
passwd()
```



* Adding hashed password to your notebook configuration file

```shell
# edit the configuration
$ vim /home/(user)/.jupyter/jupyter_notebook_config.py
```

```ini
# edit the password item
c.NotebookApp.password = u'sha1:xxx:yyy'
```



* Running a public notebook server

```shell
# edit the configuration
$ vim /home/(user)/.jupyter/jupyter_notebook_config.py
```

```ini
# Set options for certfile, ip, password, and toggle off browser auto-opening
# if the certfile and keyfile is not set, jupyter notebook would be run over http protocol
c.NotebookApp.certfile = u'/etc/letsencrypt/live/example.com/cert.pem'
c.NotebookApp.keyfile = u'/etc/letsencrypt/live/example.com/privkey.pem'
# Set ip to '*' to bind on all interfaces (ips) for the public server
c.NotebookApp.ip = '*'
c.NotebookApp.password = u'sha1:xxx:yyy'
c.NotebookApp.open_browser = False

# It is a good idea to set a known, fixed port for server access
c.NotebookApp.port = 8899
```



* [**optional for proxy_pass**] Running the notebook with a customized URL prefix

```shell
$ vim /home/(user)/.jupyter/jupyter_notebook_config.py
```

```ini
# the new url is http(s)://xxx:8888/jupyter
c.NotebookApp.base_url = '/jupyter/'
c.NotebookApp.webapp_settings = {'static_url_prefix':'/jupyter/static/'}
```



* Establish the execution script.

```shell
# create a shell script
$ vim /home/(user)/anaconda3/jupyternotebook.sh
```

```shell
#!/bin/bash
/home/(user)/anaconda3/bin/jupyter notebook
```

```shell
# add execution property to the script
$ chmod a+x /home/(user)/anaconda3/jupyternotebook.sh
```



* Establish the service.

```shell
# create a new service
$ sudo vim /etc/systemd/system/jupyternotebook.service
```

```ini
[Unit]
Description=jupyter notebook server
After=network.target

[Service]
User=(user)
Group=(user)
ExecStart=/home/(user)/anaconda3/jupyternotebook.sh
Restart=always
WorkingDirectory=/home/(user)/(path)

[Install]
WantedBy=multi-user.target
```

```shell
sudo systemctl start jupyternotebook.service
sudo systemctl status jupyternotebook.service
sudo systemctl enable jupyternotebook.service
```



* Start the service.

```http
<!-- surf the link -->
http(s)://example.com:8888/jupyter
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
    access_log    /var/log/nginx/jupyter.access.log;

    location /jupyter/ {
        proxy_pass http://127.0.0.1:8899/jupyter/;
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



