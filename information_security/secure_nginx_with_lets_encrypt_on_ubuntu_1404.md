# Secure Nginx with Let's Encrypt on Ubuntu 14.04

<script type="text/javascript" src="../js/general.js"></script>

### Requirement
---

* Ubuntu 14.04 with non-root user who has ** sudo ** privileges
* own or control the registered domain name
* (lowest) A Record points your domain to the public IP address of the server

### Step.1 : install Let's Encrypt Client
---

* install Git and bc

```bash
# update the server's package
$ sudo apt-get update

# install necessary git and bc packages
$ sudo apt-get -y install git bc
```

* install ** letsencrypt ** from github to local /opt/letsencrypt

```bash
$ sudo git clone https://github.com/letsencrypt/letsencrypt /opt/letsencrypt
```

### Step.2 : Obtain a Certificate
---

* Here, we demonstrate using **Webroot** plugin to obtain an SSL certificate.
  * The Webroot plugin works by placing a specific file in the directory /.well-known

```bash
$ sudo mkdir /.well-known
```

* Install nginx (skip if it is already installed)

```bash
$ sudo apt-get install nginx
```

* Set configuration of nginx server

```bash
# edit nginx default configuration
$ sudo vim /etc/nginx/sites-available/default
```

```bash
# add the access directory to the block server (inside server block)
location ~ /.well-known {
        allow all;
}
```

```bash
# the default document root for using Webroot plugin 
/usr/share/nginx/html
```

* Reload Nginx Service

```bash
$ sudo service nginx reload
```

* Create a SSL Certificate
  * specify our domain name with **-d** option
  * if you want a single cert to work with multiple domain names (e.g. example.com or www.example.com, etc.), be sure to include all of them.

```
# the exmaple command is 
./letsencrypt-auto certonly -a webroot --webroot-path=/usr/share/nginx/html -d example.com -d www.example.com
```

* the following is the example using abc.cloudapp.net

```
cd /opt/letsencrypt
./letsencrypt-auto certonly -a webroot --webroot-path=/usr/share/nginx/html -d abc.cloudapp.net
```

* after Let's encrypt initialization









