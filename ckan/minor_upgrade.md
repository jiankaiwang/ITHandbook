# Minor Upgrade

The minor upgrade on ckan is to upgrade ckan in the limited changes, for example, 2.5.1 to 2.5.7, etc.

## Stop CKAN Service

```shell
$ sudo service ckan stop
$ sudo service ckan status
```

## Establish New Network Configuration

* Edit the nginx network configuration.

```shell
$ sudo vim /etc/nginx/sites-available/ckan
```

* Edit the following nginx configuration to the ckan service.

```conf
...
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
        include uwsgi_params;
        uwsgi_pass unix:///tmp/ckan_socket.sock;
        uwsgi_param SCRIPT_NAME '';
    }

    # Temporarily remove the 301 permanently moved statue.
    #return 301 https://$host$request_uri;
}
...
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

* Surf the url (localhost:12280, or 127.0.0.1:12280, etc.) from the browser to check whether the portal is available.

## Upgrade Environment


## Upgrade CAKN


## (Re-)install Packages


## Rebuild the CKAN Service


## Edit the CAKN Configuration


## Restart the CKAN Service



## Validate the CKAN Version