# Minor Upgrade

The minor upgrade on ckan is to upgrade ckan in the limited changes, for example, 2.5.1 to 2.5.7, etc.

## Stop CKAN Service

```shell
$ . /usr/lib/ckan/default/bin/activate
$ sudo service ckan stop
$ sudo service ckan status
```

## Establish New Network Configuration

* Edit the nginx network configuration.

```shell
# temporarily move the file to another directory
$ sudo mv /etc/nginx/sites-available/ckan /etc/nginx
$ sudo cp /etc/nginx/ckan /etc/nginx/sites-available/ckan
$ sudo vim /etc/nginx/sites-available/ckan
```

* Edit the following nginx configuration to the ckan service.

```conf
proxy_cache_path /tmp/nginx_cache levels=1:2 keys_zone=cache:30m max_size=250m;

server {
    listen 80;
    # Temporarily reset the server_name for upgrading the system.
    #server_name data.cdc.gov.tw;
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

    # Temporarily remove the 301 permanently moved statue.
    #return 301 https://$host$request_uri;
}
```

* Restart the service.

```shell
$ sudo service nginx status
$ sudo service nginx restart
```

* Edit the CKAN Configuration file.

```shell
$ sudo vim /etc/ckan/default/production.ini
```

* Edit the following parameter.

```conf
...
#ckan.site_url = https://data.cdc.gov.tw/
ckan.site_url = http://127.0.0.1/

...
#solr_url = http://data.cdc.gov.tw:8983/solr/ckan
solr_url = http://127.0.0.1:8983/solr/ckan
```

* Restart the ckan service

```shell
$ sudo service ckan restart
$ sudo service ckan status
```

* Surf the url (localhost:12280, or **127.0.0.1:12280**, etc.) from the browser to check whether the portal is available.

## Upgrade Environment

* Stop the ckan service for upgrading ubuntu OS.

```shell
$ sudo service ckan stop
```

* Upgrade the linux core and others softwares.

```shell
# Another ssh connection is established on port 1022.
# Upgrade glibc : Yes
# Restart Services during package uogrades without asking : No.
# Restart Services to Upgrade (postgresql, nginx, ...) : OK
# Nginx : N (O), Keey the original version.
# PostgreSQL : Keep the local version currently installed.
# apt conf : Keep the local version currently installed.
# remove unnecessary package : y
$ sudo do-release-upgrade
```

## Upgrade CAKN

* Download the latest CKAN version.

```shell
$ . /usr/lib/ckan/default/bin/activate
(pyenv) $ sudo wget http://packaging.ckan.org/python-ckan_2.5-trusty_amd64.deb
(pyenv) $ dpkg --info python-ckan_2.5-trusty_amd64.deb

# configuration file (nginx) : N
(pyenv) $ sudo dpkg -i python-ckan_2.5-trusty_amd64.deb
```

* Create a new python virtualenv due to python upgrade (Ubuntu OS Upgrade).

```shell
$ deactivate
$ cd /usr/lib/ckan
$ rm -rf ./default/bin
$ rm -rf ./default/lib
$ virtualenv --no-site-packages default/
$ virtualenv default -p /usr/bin/python
```

## (Re-)install Packages

* Install the core ckan package.

```shell
(pyenv) $ cd /usr/lib/ckan
(pyenv) $ sudo chown jkw:jkw -R /usr/lib/ckan
(pyenv) $ pip install -e ./default/src/ckan
```

* Install the necessary libraries.

```shell
# Install necessary requirements.
(pyenv) $ pip install -r /usr/lib/ckan/default/src/ckan/requirements.in
(pyenv) $ pip install -r /usr/lib/ckan/default/src/ckan/requirements.txt
(pyenv) $ pip install -r /usr/lib/ckan/default/src/ckan/dev-requirements.txt
(pyenv) $ pip install -r /usr/lib/ckan/default/src/ckan/pip-requirements-docs.txt
(pyenv) $ pip install ckantoolkit
(pyenv) $ pip install Flask

# Install necessary headers.
(pyenv) $ sudo apt-get install --install-recommends linux-generic-hwe-16.04

# Install necessary package urllib3.
(pyenv) $ pip install urllib3

# ssl issues due to the old package
(pyenv) $ sudo apt-get --auto-remove --yes remove python-openssl
(pyenv) $ pip install pyOpenSSL

# fix the version upgrade issues
(pyenv) $ pip install -U setuptools
(pyenv) $ pip install --upgrade pyramid
(pyenv) $ pip freeze | grep -i 'webob'
(pyenv) $ pip uninstall webob
(pyenv) $ pip install 'webob>=1.0.7,<1.0.9'

# install uwsgi
(pyenv) $ pip install uwsgi
```

* Install the extension ckanext-scheming.

```shell
(pyenv) $ pip uninstall -y ckanext-scheming
(pyenv) $ cd /usr/lib/ckan/default/src/ckan/ckanext/
(pyenv) $ rm -rf ./ckanext-scheming
(pyenv) $ git clone https://github.com/jiankaiwang/ckanext-scheming.git
(pyenv) $ cd ./ckanext-scheming
(pyenv) $ pip install -e .
```

* Install the extension ckanext-basiccharts.

```shell
(pyenv) $ pip uninstall -y ckanext-basiccharts
(pyenv) $ cd /usr/lib/ckan/default/src/ckan/ckanext/
(pyenv) $ rm -rf ./ckanext-basiccharts
(pyenv) $ git clone https://github.com/jiankaiwang/ckanext-basiccharts.git
(pyenv) $ cd ./ckanext-basiccharts
(pyenv) $ pip install -e .
```

* Install the extension ckanext-geoview.

```shell
(pyenv) $ pip uninstall -y ckanext-geoview
(pyenv) $ cd /usr/lib/ckan/default/src/ckan/ckanext/
(pyenv) $ rm -rf ./ckanext-geoview
(pyenv) $ git clone https://github.com/jiankaiwang/ckanext-geoview.git
(pyenv) $ cd ./ckanext-geoview
(pyenv) $ pip install -e .
```

* Install the extension ckanext-pages.

```shell
(pyenv) $ pip uninstall -y ckanext-pages
(pyenv) $ cd /usr/lib/ckan/default/src/
(pyenv) $ rm -rf ./ckanext-pages
(pyenv) $ git clone https://github.com/jiankaiwang/ckanext-pages.git
(pyenv) $ cd ./ckanext-pages
(pyenv) $ pip install -e .
```

* Install the extension ckanext-cdcmainlib.

```shell
(pyenv) $ pip uninstall -y ckanext-cdcmainlib
(pyenv) $ cd /usr/lib/ckan/default/src
(pyenv) $ rm -rf ./ckanext-cdcmainlib
(pyenv) $ git clone https://github.com/jiankaiwang/ckanext-cdcmainlib.git
(pyenv) $ cd /usr/lib/ckan/default/src/ckanext-cdcmainlib
(pyenv) $ pip install .
```

Edit the ckan configuration, e.g. **/etc/ckan/default/production.ini**.

```conf
# cdcmainlib configuration
ckan.cdcmainlib.psqlUrl = postgresql://ckan_default:ckan@localhost/ckan_default
```

* Install the extension ckanext-cdcframe.

```shell
(pyenv) $ pip uninstall -y ckanext-cdcframe
(pyenv) $ cd /usr/lib/ckan/default/src
(pyenv) $ rm -rf ./ckanext-cdcframe
(pyenv) $ git clone https://github.com/jiankaiwang/ckanext-cdcframe.git
(pyenv) $ cd /usr/lib/ckan/default/src/ckanext-cdcframe
(pyenv) $ pip install .
```

Edit the ckan configuration, e.g. **/etc/ckan/default/production.ini**.

```conf
# cdcframe configuration
extra_public_paths = /usr/lib/ckan/default/src/ckanext-cdcframe/ckanext/cdcframe/public
```

* Install the extension ckanext-cdcregistration.

```shell
(pyenv) $ pip uninstall -y ckanext-cdcregistration
(pyenv) $ cd /usr/lib/ckan/default/src
(pyenv) $ rm -rf ./ckanext-cdcregistration
(pyenv) $ git clone https://github.com/jiankaiwang/ckanext-cdcregistration.git
```

It is necessary to edit the **register.js** (the form for registering).

Second, it is important to modify the CKAN core registration base. (Preparation 4 to 7 step)

[https://github.com/jiankaiwang/ckanext-cdcregistration](https://github.com/jiankaiwang/ckanext-cdcregistration)
Finish the installation after editing the above changes.

```shell
(pyenv) $ cd /usr/lib/ckan/default/src/ckanext-cdcregistration
(pyenv) $ pip install .
```

* Install the extension ckanext-cdctondc.

```shell
(pyenv) $ pip uninstall -y ckanext-cdctondc
(pyenv) $ cd /usr/lib/ckan/default/src
(pyenv) $ rm -rf ./ckanext-cdctondc
(pyenv) $ git clone https://github.com/jiankaiwang/ckanext-cdctondc.git
(pyenv) $ cd /usr/lib/ckan/default/src/ckanext-cdctondc
(pyenv) $ pip install .
```

Edit the ckan configuration, e.g. **/etc/ckan/default/production.ini**.

```conf
# cdctondc configuration
ckan.cdctondc.psqlUrl = postgresql://ckan_default:ckan@localhost/ckan_default
ckan.cdctondc.apikey = APIKEY
ckan.cdctondc.apiUrl = APIURL
```

* Install the extension ckanext-cdccushomepage.

```shell
(pyenv) $ pip uninstall -y ckanext-cdccushomepage
(pyenv) $ cd /usr/lib/ckan/default/src
(pyenv) $ rm -rf ./ckanext-cdccushomepage
(pyenv) $ git clone https://github.com/jiankaiwang/ckanext-cdccushomepage.git
(pyenv) $ cd /usr/lib/ckan/default/src/ckanext-cdccushomepage
(pyenv) $ pip install .
```

Edit the iframe source on `denguens1.html` (under ckanext/cdccushomepage/templates/home/snippets).

[**optional**] Remove the **featured_group** section on ckanext/cdccushomepage/templates/home/layout1.html.

If you remove the section, the extension is needed to re-install and system is also needed to re-start.

```python
{% block featured_group %}
	{#{% snippet 'home/snippets/featured_group.html' %}#}
{% endblock %}
```

* Install the extension ckanext-download.

```shell
(pyenv) $ pip uninstall -y ckanext-download
(pyenv) $ cd /usr/lib/ckan/default/src
(pyenv) $ rm -rf ./ckanext-download
(pyenv) $ git clone https://github.com/jiankaiwang/ckanext-download.git
(pyenv) $ cd /usr/lib/ckan/default/src/ckanext-download
(pyenv) $ pip install .
```

## Edit the CAKN Configuration

Edit the ckan configuration, e.g. **/etc/ckan/default/production.ini**.

* Add the plugins

```conf
ckan.plugins = scheming_datasets stats text_view image_view recline_view datastore datapusher scheming_groups scheming_organizations resource_proxy pages linechart barchart piechart basicgrid geo_view cdcmainlib cdcframe cdcregistration cdctondc cdccushomepage download
```

* Set email Notification on **production.ini**.

```conf
ckan.activity_streams_email_notifications = true
```

Set email notification on crontab.

```conf
paster --plugin=ckan post -c /etc/ckan/default/production.ini /api/action/send_email_notifications > /dev/null
```

* SMTP Settings

```conf
#email_to = you@yourdomain.com
#error_email_from = paste@localhost
smtp.server = smtp.gmail.com
smtp.starttls = True
smtp.user = email
smtp.password = password for the email
smtp.mail_from = email
```

* Language Settings

```conf
ckan.locale_default = zh_TW
ckan.locale_order = en pt_BR ja it cs_CZ ca es fr el sv sr sr@latin no sk fi ru de pl nl bg ko_KR hu sa sl lv
ckan.locales_offered = en zh_TW
ckan.locales_filtered_out = zh_TW
```

* Google recaptcha

```conf
ckan.recaptcha.version = 2
ckan.recaptcha.publickey = publickey
ckan.recaptcha.privatekey = privatekey
```

* Google Analytics

```conf
# one line only
ckan.template_footer_end = <!-- Google Analytics --><script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');ga('create', 'INFO', 'auto');ga('send', 'pageview');</script><!-- /Google Analytics -->
```

* Remove the public data.

```shell
(pyenv) $ rm -f /usr/lib/ckan/default/src/ckan/ckan/public/data/*
(pyenv) $ ll /usr/lib/ckan/default/src/ckan/ckan/public/data/
```

## Rebuild the CKAN Service

* Build a ckan script on **/usr/lib/ckan/default/ckan.sh**.

```bash
#!/bin/bash
. /usr/lib/ckan/default/bin/activate
uwsgi --ini-paste /etc/ckan/default/production.ini
```

Set the script with execution authorization.

```bash
$ chmod a+x /usr/lib/ckan/default/ckan.sh
```

* Build a ckan service on **/etc/systemd/system/ckan.service**.

```bash
[Unit]
Description=Taiwan CDC Open Data
After=network.target

[Service]
User=jkw
Group=www-data
ExecStart=/usr/lib/ckan/default/ckan.sh
Restart=always
WorkingDirectory=/usr/lib/ckan/default

[Install]
WantedBy=multi-user.target
```

## Restart the CKAN Service

* Run as the development version.

```shell
(pyenv) $ paster serve /etc/ckan/default/production.ini
```

* Run as the production version.

```shell
(pyenv) $ sudo systemctl start ckan
(pyenv) $ sudo systemctl status ckan
(pyenv) $ sudo systemctl enable ckan
```

## Validate the CKAN Version

* Surf the webpage whose url is **http://127.0.0.1:12280/api/util/status**.




