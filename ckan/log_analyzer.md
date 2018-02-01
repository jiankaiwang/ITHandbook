# 建立 Log Analyzer



底下以 **GoAccess** 作為 log 分析工具，並即時 (Real-Time) 分析 log。



## Tutorial 

* Basic Operations on Ubuntu Distribution

```shell
# download and install tool
$ echo "deb http://deb.goaccess.io/ $(lsb_release -cs) main" | sudo tee -a /etc/apt/sources.list.d/goaccess.list
$ wget -O - https://deb.goaccess.io/gnugpg.key | sudo apt-key add -
$ sudo apt-get update
$ sudo apt-get install goaccess

# check version
$ goaccess -V

# determine log format
$ sudo vim /etc/goaccess.conf

# HTML Report
# default ckan log (is set on nginx configuration) : /var/log/nginx/ckan_access.log
# report is generated at the public folder
$ sudo goaccess /pwd/ckan_access.log -o /www/html/public/report.html --log-format=COMBINED --real-time-html
```



## Portal Server (nginx)

* Create a shell script.

Create a shell script for log analyzer.

```shell
$ vim /usr/lib/ckan/default/ckanlog.sh
```

Add the following content to the shell script. (**http** protocol)

```shell
#!/bin/bash
goaccess /var/log/nginx/ckan_access.log -o /usr/lib/ckan/default/src/ckan/ckan/public/report.html --log-format=COMBINED --real-time-html
```

Add the following content to the shell script. (**https** protocol)

```shell
#!/bin/bash
goaccess /var/log/nginx/ckan_access.log -o /usr/lib/ckan/default/src/ckan/ckan/public/report.html --log-format=COMBINED --real-time-html --ssl-cert=/etc/letsencrypt/live/data.cdc.gov.tw/cert.pem --ssl-key=/etc/letsencrypt/live/data.cdc.gov.tw/privkey.pem --ws-url=wss://data.cdc.gov.tw:7890
```

Add execution property to the script.

```shell
$ chmod a+x /usr/lib/ckan/default/ckanlog.sh
```



* Create a service.

Create a shell script for log analyzer (**/etc/systemd/system/ckanlog.service**).

```shell
[Unit]
Description=Taiwan CDC Open Data Log Analyzer
After=network.target

[Service]
User=root
Group=root
ExecStart=/usr/lib/ckan/default/ckanlog.sh
Restart=always
WorkingDirectory=/usr/lib/ckan/default

[Install]
WantedBy=multi-user.target
```

Start and enable the servive.

```shell
$ sudo systemctl start ckanlog.service
$ sudo systemctl status ckanlog.service
$ sudo systemctl enable ckanlog.service
```



## Data Server (apache)

- Create a shell script.

Create a shell script for log analyzer.

```shell
$ sudo mkdir /usr/src/goaccess
$ vim /usr/src/goaccess/ckandatalog.sh
```

Add the following content to the shell script. The related ssl certificate is also necessary to add to the command.

```shell
#!/bin/bash
goaccess /var/log/apache2/access.log -o /var/www/html/report.html --log-format=COMBINED --real-time-html --ssl-cert=/etc/letsencrypt/live/od.cdc.gov.tw/cert.pem --ssl-key=/etc/letsencrypt/live/od.cdc.gov.tw/privkey.pem --ws-url=wss://od.cdc.gov.tw:7890
```

Add execution property to the script.

```shell
$ chmod a+x /usr/src/goaccess/ckandatalog.sh
```



- Create a service.

Create a shell script for log analyzer (**/etc/systemd/system/ckandatalog.service**).

```shell
[Unit]
Description=Taiwan CDC Open Data Log Analyzer
After=network.target

[Service]
User=root
Group=root
ExecStart=/usr/src/goaccess/ckandatalog.sh
Restart=always
WorkingDirectory=/usr/src/goaccess/

[Install]
WantedBy=multi-user.target
```

Start and enable the servive.

```shell
$ sudo systemctl start ckandatalog.service
$ sudo systemctl status ckandatalog.service
$ sudo systemctl enable ckandatalog.service
```

