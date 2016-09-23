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


