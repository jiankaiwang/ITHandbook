# VirtualBox Networking



## Compare

| Interface | VM - Host | VM1 - VM2 | VM > Internet | VM < Internet |
|--|--|--|--|--|
| Internal | N | Y | N | N |
| HostOnly | Y | Y | N | N |
| Bridge | Y | Y | Y | Y |
| NAT | N | N | Y | Port forwarding |
| NATNet | N | Y | Y | Port forwarding |



## NAT Configurate

```shell
# 設定 NAT Port forwarding
# modifyvm : 用於關閉的 VM
# controlvm : 用於啟動的 VM
# Cmd : 
# |- format : Policy-Name,type,Host-IP,Host-Port,Guest-IP,Guest-Port
# |- 如 guestssh,tcp,,2222,,22
VBoxManage modifyvm "VM name" --natpf1 "<Cmd>"
VBoxManage controlvm "VM name" natpf1 "<Cmd>"
```



## NAT + Host-only adapter



* In Virtualbox Tools, click the VM and set the network configurate to enable interface 1 (NAT) and to enable interface 2 (Host-only adapter).
* In interface 2, expand the advanced options. In the interface type, select `Intel PRO/1000 MT Desktop` and select `deny` in the module.
* Start the VM.
* In terminal, list all interfaces.

```shell
ip link show
```

the following is the simple example

```shell
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP mode DEFAULT group default qlen 1000
    link/ether 08:00:27:78:bf:5a brd ff:ff:ff:ff:ff:ff
3: enp0s8: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP mode DEFAULT group default qlen 1000
    link/ether 08:00:27:04:e3:e2 brd ff:ff:ff:ff:ff:ff
4: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN mode DEFAULT group default
    link/ether 02:42:48:7d:f1:3f brd ff:ff:ff:ff:ff:ff
```

There are two main interfaces for the VM, enp0s3 and enp0s8.

* Edit the interface configurates.

```shell
sudo vim /etc/network/interfaces
```

And add the following settings.

```shell
# the NAT network configurate
# The primary network interface
auto enp0s3
iface enp0s3 inet dhcp

# the Host-only adapter configurate
# another interface
auto enp0s8
iface enp0s8 inet static
address 192.168.56.101
netmask 255.255.255.0
network 192.168.56.0
```

* Start the interface.

```shell
sudo ifup enp0s8
sudo systemctl restart networking.service
```

* Check the network configurate.

```shell
ifconfig
```









