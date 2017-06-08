# Adjust thw swap size in VM hosted on Azure

<script type="text/javascript" src="../js/general.js"></script>

### Procedures
---

* edit the configuration

```bash
$ sudo vim /etc/waagent.conf
```

* Set the configuration

```conf
# set the flag
ResourceDisk.Format=y
ResourceDisk.EnableSwap=y

# set the size
ResourceDisk.SwapSizeMB=xx
```

* Start the configuation

```bash
$ sudo service walinuxagent restart
```