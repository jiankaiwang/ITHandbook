# Mount the Resource



## Mount the NAS



*   general mount command

```bash
sudo mkdir /media/sf_folder/
sudo mount -t cifs //IP/path /media/sf_folder/ -o username=user,password=pwd
```

*   auto mount (over **cifs** protocol)

```bash
sudo vim /etc/fstab
```

```ini
# add the following configuration
# rsize : read bytes
# wsize : write bytes
//IP/path /media/sf_folder cifs user=user,pass=pass,rsize=8192,wsize=8192 0 0
```

```bash
# mount testing and set to automount after rebooting the system
sudo mount -a
```

*    allow read and write for all users

```ini
# add the following configuration
# rsize : read bytes
# wsize : write bytes
//IP/path /media/sf_folder cifs user=user,pass=pass,rsize=8192,wsize=8192,file_mode=0777,dir_mode=0777 0 0
```

