# LAMP in Ubuntu

<script type="text/javascript" src="../js/general.js"></script>

### Ubuntu 16.04
---

```bash
# install php7.0 module
sudo apt-get install php7.0 php7.0-fpm php7.0-mysql libapache2-mod-php7.0 php7-mcrypt -y

# edit beginning page order
sudo vi /etc/apache2/mods-enabled/dir.conf

# restart the service
sudo service apache2 restart

# install mysql 
sudo apt-get install mysql-server -y
```

