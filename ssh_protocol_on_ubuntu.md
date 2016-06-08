# SSH Protocol on Ubuntu

<script type="text/javascript" src="gitbook/gitbook.js"></script>
<script type="text/javascript" src="js/general.js"></script>

###Environment
---

* Ubuntu x86_64 LTS 14.04

###Install ssh-server & ssh-client
---

We could use the following commands to install necessary packages of ssh:

```Bash
$ sudo apt-get install openssh-server openssh-client
```

And the following command could be used to check whether the ssh works or not:

```Bash
$ ps aux | grep ssh
```

###Modify the SSH connecting configuration
---

We could change the port ssh protocol used or the other settings within sshd_config (vim might be installed):

```Bash
$ sudo vim /etc/ssh/sshd_config
```

For example, the "Port 22" would exist in the file, and we could change the port with a free one. We could use the following command to check which ports is free to be used.

```Bash
$ sudo less /etc/services
```

You could simply change the port by marking the default and retype a new port.

```Bash
#Port 22                    # the default setting
Port 100                    # the new setting
```

###IP Permissions
---

It is quite simple to allow or deny the IP pretending to access the localhost through ssh by the following command:

```Bash
$ sudo vim /etc/hosts.allow
```

And the format in this file is: sshd:xxx.xxx.xxx.xxx:allow. On the other hand, we could edit the other file named hosts.deny to deny the connection from unexpected IP address.

```Bash
$ sudo vim /etc/hosts.deny
```

And the format in this file is: ** sshd:xxx.xxx.xxx.xxx:deny **.

If the connection result shows "ssh_exchange_identification: Connection closed by remote host", it represents the IP address is denied by the localhost. And you could use "sshd:all:deny" to block all IP addresses excepted for the allow ones through ssh connection.

###Restart & Reload settings
---

According to the version of ssh, it is better use the following command to check what kinds of parameter could be used;

```Bash
$ sudo /etc/init.d/ssh -h
```

The result would be like this: 

```Bash
Usage: /etc/init.d/ssh {start|stop|reload|force-reload|restart|try-restart|status}
```

It shows parameters we could use. When we set a new configuration, it is necessary to restart or reload the ssh service. If there is no "restart", use "stop" and "start" to replace it.

```Bash
$ sudo /etc/init.d/ssh restart
```

###Trouble shootings
---

If the setting seems fine, you cannot connect in ssh. There are two common reasons, setting not working and firewall not closing. The following command could turn off the firewall after the reboot;

```Bash
$ sudo ufw disable
```

And then restart the computer.


















