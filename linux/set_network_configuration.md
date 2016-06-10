# Set Network Configuration

<script type="text/javascript" src="../js/general.js"></script>

** Use cmd ifconfig to make sure the name representing network interface. **

###Basic setting details path
---

Path/Folder

```Bash
# cd /etc/sysconfig/network-scripts/
```

ethernet setting, the configuration file:

```Bash
# vim /etc/sysconfig/network-scripts/ifcfg-eth0
```

wireless LAN setting, the configuration file:

```Bash
# vim /etc/sysconfig/network-scripts/ifcfg-wlan0
```

###Wake up network interface
---

Restart the whole network interface:

```Bash
# /etc/init.d/network restart
```

Wake up the ethernet, eth0, interface as an example:

```Bash
# ifup eth0
```

Shut down the ethernet, eth0, interface as an example:

```Bash
# ifdown eth0
```

###Request a new IP address
---

Release IP address used now and take ethernet as an example:

```Bash
# dhclient -v -r eth0
```

Request a new IP address with its relative network configuration and take ethernet as an example:

```Bash
# dhclient -v eth0
```

###Replace temporary network settings
---

Set (or replace the IP address):

```Bash
# ifconfig eth0 192.168.1.20 netmask 255.255.255.0 up
```

Set gateway: 

```Bash
# route add default gw 192.168.1.1
```

###Set DNSs
---

Add(or Set) the DNS server address into the network interface:

```Bash
# vim /etc/resolv.conf
```

Add a new DNS server, 168.95.1.1 as a example, add the following information on the bottom of the file:

```Bash
nameserver 168.95.1.1
```


