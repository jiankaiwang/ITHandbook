# Extend HD Size on VirtualBox

## LVM Introduction

* LVM component
    * 物理卷 Physical volume (PV) : 實體 HD
    * 卷组 Volume group (VG) : 數個 PV 組成
    * 邏輯卷 Logical volume (LV) : 由 VG 中劃分出來，可格式化並掛載(實際存放資料)
    * 物理區域 Physical extent (PE) : 於建立 VG 時決定大小，預設為4M
    
* 階層 : 實體 HD -> PV -> VG -> LV -> FileSystem

![](/images/lvm.jpg)


## Extend the VMDK size

```bash
# first clone a new hd as vdi format
$ VBoxManage clonehd "source.vmdk" "cloned.vdi" --format vdi

# resize to 50GB (max is 50GB)
$ VBoxManage modifyhd "cloned.vdi" --resize 51200

# format back to vmdk format
$ VBoxManage clonehd "cloned.vdi" "resized.vmdk" --format vmdk
```

## Modify the registry

* in windows

```bash
# virtualbox registry file
C:\Users\username\.VirtualBox\VirtualBox.xml
```

* modify the following part

```xml
...

<MachineRegistry>
    ...
    <MachineEntry uuid="{record new uuid while format hd}" src="D:\code\VirtualBox\(name of vbox)\(name of vbox).vbox"/>
    ...
</MachineRegistry>

...
```

## Modify the vbox

* in windows : modify the virtualbox configuration file under the same vmdk

* modify the following part with new uuid

```xml
<VirtualBox xmlns="http://www.virtualbox.org/" version="1.16-windows">
  <Machine uuid="{(new uuid)}" name="ubuntu_server" OSType="Ubuntu_64" snapshotFolder="Snapshots" lastStateChange="2017-06-02T15:31:43Z">
    <MediaRegistry>
      <HardDisks>
        <HardDisk uuid="{(new uuid)}" location="ubuntu_16.04_server-disk.vmdk" format="VMDK" type="Normal"/>
      </HardDisks>
      <DVDImages>
        <Image uuid="{bad944e0-384f-4ebc-b517-acf209a4b70b}" location="D:/gparted-live-0.28.1-1-amd64.iso"/>
      </DVDImages>
    </MediaRegistry>
    <ExtraData>
    
    ...
    
    <StorageControllers>
      <StorageController name="IDE" type="PIIX4" PortCount="2" useHostIOCache="true" Bootable="true"/>
      <StorageController name="SATA" type="AHCI" PortCount="30" useHostIOCache="false" Bootable="true" IDE0MasterEmulationPort="0" IDE0SlaveEmulationPort="1" IDE1MasterEmulationPort="2" IDE1SlaveEmulationPort="3">
        <AttachedDevice type="HardDisk" hotpluggable="false" port="0" device="0">
          <Image uuid="{(new uuid)}"/>
        </AttachedDevice>
      </StorageController>
    </StorageControllers>
  </Machine>
</VirtualBox>
```

## Extend the current space

* by [GParted.iso](http://gparted.org/) as Extended for LVM format

## Extend the LVM on the filesystem

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





