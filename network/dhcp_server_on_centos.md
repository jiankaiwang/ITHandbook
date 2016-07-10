# DHCP Server On CentOS

<script type="text/javascript" src="../js/general.js"></script>

###dhcpd configuration
---

* edit DHCP Configuration file,

```Bash
# vim /etc/dhcp/dhcpd.conf
```

* Add the following setting: (dhcpd.conf)

```Bash
#
# DHCP Server Configuration file.
#   see /usr/share/doc/dhcp*/dhcpd.conf.sample
#   see 'man 5 dhcpd.conf'
#
subnet 192.168.10.0 netmask 255.255.255.0 {
 range 192.168.10.10 192.168.10.200;
 option domain-name-servers 140.112.254.4, 140.112.2.2, 168.95.1.1;
 option domain-name "jkw.centos";
 option routers 192.168.10.1;
 option broadcast-address 192.168.10.255;
 default-lease-time 7200;
 max-lease-time 7200;
}
```

sub-network zone: 192.168.10.0

netmask for controlling zone: 255.255.255.0

dynamic allocating IP address range: 192.168.10.10 ~ 192.168.10.200

Optional and long-termed domain-name-servers: 140.112.254.4, 140.112.2.2, 168.95.1.1;

routers: 192.168.10.1 (must be the IP address of interface for allocation), in this example is wlan0

###dhcpd interface
---

```Bash
# vim /etc/sysconfig/dhcpd
```

* Modify the file as the same following setting:

```Bash
# Command line options here
DHCPDARGS="wlan0"
```

What kinds of interfaces would use the dhcp server (service on CentOS is dhcpd): wlan0 is the example.

###dhcpd activation
---

The following are the commands activating dhcpd service:

```Bash
# service /etc/init.d/dnsmasq stop
# ifconfig wlan0 192.168.10.0 netmask 255.255.255.0 up
# service /etc/init.d/dhcpd restart
```

Due to the conflict between service dnsmasq and service dhcpd, it is necessary to stop dnsmasq first.





