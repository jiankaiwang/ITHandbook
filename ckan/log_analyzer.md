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
$ sudo goaccess /var/log/nginx/ckan_access.log -o /usr/lib/ckan/default/src/ckan/ckan/public/report.html --log-format=COMBINED --real-time-html
```



* Create a shell script.

Create a shell script for log analyzer (**/usr/lib/ckan/default/ckanlog.sh**).

```shell
$ vim /usr/lib/ckan/default/ckanlog.sh
```

Add the following content to the shell script.

```shell
#!/bin/bash
goaccess /var/log/nginx/ckan_access.log -o /usr/lib/ckan/default/src/ckan/ckan/public/report.html --log-format=COMBINED --real-time-html
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



