# Owncloud

<script type="text/javascript" src="../js/general.js"></script>

### Install LAMP On Ubuntu 16.04
---

```bash
$ sudo apt-get update

# install requirements
$ sudo apt-get unzip

# install PHP
$ sudo apt-get install -y \
      php7.0 \
      php7.0-cli \
      libapache2-mod-php7.0 \
      php7.0-gd \
      php7.0-json \
      php7.0-ldap \
      php7.0-mbstring \
      php7.0-mysql \
      php7.0-xml \
      php7.0-xsl \
      php7.0-zip \
      php-curl

# install apache2
$ sudo apt-get install apache2

# install MySQL server
$ sudo apt-get install mysql-server
```

### Prepare for Owncloud
---

* Create a user and database in the MySQL Server.

### Install Owncloud Server
---

* Install the owncloud server

```bash
# get owncloud server 
$ wget https://download.owncloud.org/community/owncloud-10.0.0.zip

# uncompress the zip
$ unzip ./owncloud-10.0.0.zip

# move to the apache2 default path
$ sudo cp -r ./owncloud /var/www/html/owncloud

# change own to apache2
$ sudo chown www-data:www-data -R ./owncloud
```

* Set the trusted domain

```bash
# edit the configuration file
$ sudo vim /var/www/html/owncloud/config/config.php
```

```conf
...
# add the trusted domain or IP
# in order to use others IP as the host
'trusted_domains' => array (
    '192.168.1.2',
    'test.org'
),
...
```

and restart the apache2 service,

```bash
$ sudo service apache2 restart
```






