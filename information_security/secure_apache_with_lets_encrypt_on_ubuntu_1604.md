# Secure Apache with Let's Encrypt on Ubuntu 16.04

<script type="text/javascript" src="../js/general.js"></script>

### Install Let's Encrypt Client
---

```bash
$ sudo apt-get -s update
$ sudo apt-get install python-letsencrypt-apache
```

### Set up the SSL Certificate
---

```bash
# example.com as the certificate domain for the single domain
# if there is more than one domain, use the following command
# sudo letsencrypt --apache -d example.com -d www.example.com
$ sudo letsencrypt --apache -d example.com
```

```bash
# after installation certificate, use the website to test
https://www.ssllabs.com/ssltest/analyze.html?d=example.com&latest
```

### Set up Auto Renewal
---

* renew once

```
$ sudo letsencrypt renew
```

* renew on scheduling by crontab

```bash
# book renewal
$ sudo vim /etc/crontab

# add the following command
30 2    * * 1   root    /usr/bin/letsencrypt renew >> /var/log/le-renew.log
```
