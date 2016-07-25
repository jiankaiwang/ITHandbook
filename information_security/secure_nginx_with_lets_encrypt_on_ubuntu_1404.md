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




