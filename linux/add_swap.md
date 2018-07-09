# Add Swap in Ubuntu



### Check Current System Swap

```shell
sudo swapon --show
```



### Check Available Space on Hard Drive

```shell
free -h
```



### Create a Swap File

```shell
sudo fallocate -l 1G /swapfile
ls -lh /swapfile
```



### Enable the Swap File

```shell
sudo chmod 600 /swapfile
ls -lh /swapfile

# mark the file as swap space
sudo mkswap /swapfile

# enable the swap file
sudo swapon /swapfile
sudo swapon --show
```



### Make the Swap File Permanent

```shell
sudo cp /etc/fstab /etc/fstab.bak
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```



### Adjusting Swappiness Property

```shell
# make the setting permanent
cat /proc/sys/vm/swappiness
sudo sysctl vm.swappiness=10
sudo vim /etc/sysctl.conf
vm.swappiness=10          # add in the end of file

cat /proc/sys/vm/vfs_cache_pressure
sudo sysctl vm.vfs_cache_pressure=50
sudo vim /etc/sysctl.conf
vm.vfs_cache_pressure=50  # add in the end of file
```

