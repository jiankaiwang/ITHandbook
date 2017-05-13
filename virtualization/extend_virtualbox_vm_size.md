# Extend VM HD Size on VirtualBox

<script type="text/javascript" src="../js/general.js"></script>

### Extend the VMDK size
---

```bash
# first clone a new hd as vdi format
$ VBoxManage clonehd "source.vmdk" "cloned.vdi" --format vdi

# resize to 50GB (max is 50GB)
$ VBoxManage modifyhd "cloned.vdi" --resize 51200

# format back to vmdk format
$ VBoxManage clonehd "cloned.vdi" "resized.vmdk" --format vmdk
```

### Extend the current space
---

* by [GParted.iso](http://gparted.org/)

### Extend the LVM on the filesystem
---

```bash
# check current space of each filesystems
$ sudo df -h

# check lvm status
$ sudo lvdisplay

# extend the space to the lvm
# 必須先將 PV 做好後，將 PV 加入 VG，做 VG 的擴充，VG 擴充好了，就有空間可以配給 LV
# name of LV could be found by the command above
$ sudo lvextend -L +10G /dev/UbuntuServer1604-vg/root

# after extend the LV, resize/modify the filesystem
$ sudo resize2fs /dev/UbuntuServer1604-vg/root
```





