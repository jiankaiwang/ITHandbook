# Extend HD Size on VirtualBox

<script type="text/javascript" src="../js/general.js"></script>

### LVM Introduction
---

* LVM component
    * 物理卷 Physical volume (PV) : 實體 HD
    * 卷组 Volume group (VG) : 數個 PV 組成
    * 邏輯卷 Logical volume (LV) : 由 VG 中劃分出來，可格式化並掛載(實際存放資料)
    * 物理區域 Physical extent (PE) : 於建立 VG 時決定大小，預設為4M
    
* 階層 : 實體 HD -> PV -> VG -> LV -> FileSystem

![](/images/lvm.jpg)


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

* by [GParted.iso](http://gparted.org/) as Extended for LVM format

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





