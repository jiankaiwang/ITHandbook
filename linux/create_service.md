# Create a Service in Linux



### Procedures and automatically start at the beginning of boot
---

```bash
# Step.1 : prepare a shell script (new_service.sh)
$ touch new_service.sh

# Step.1.1 : the following header existing is suggested

### BEGIN INIT INFO
# Provides:          ufw
# Required-Start:    $local_fs
# Required-Stop:     $local_fs
# Default-Start:     S
# Default-Stop:      1
# Short-Description: start firewall
### END INIT INFO

# Step.1.2 : chmod with executable
$ chmod a+x new_service.sh

# Step.2 : move to /etc/init.d and name it as new_service_name
$ sudo mv new_service.sh /etc/init.d/new_service_name

# Step.3 : update the start level
# enable or disable the service on which running levels, S(all), 2, 3, 4, 5
$ sudo update-rc.d new_service_name {enable|disable} {S|2|3|4|5}
```

### Create a service over systemctl
---

* create a service

```bash
$ sudo vim /etc/systemd/system/name.service
```

* Write script

```conf
[Unit]
Description=Description of the Service
After=network.target

[Service]
User=user
Group=group
ExecStart=(execStr)
ExecStop=(stopExec)
Restart=always
WorkingDirectory=/path/to/your

[Install]
WantedBy=multi-user.target
```

* Execution Command (execStr)

if the pid is not necessary, `/usr/local/bin/exec /path/to/your/ini.conf > /var/tmp/name.log & 2>&1`
; or the pid conserved, `/usr/local/bin/exec /path/to/your/ini.conf > /var/tmp/name.log & 2>/var/log/name.pid`

* Stop Execution (stopExec)

if there was the pid file `kill -9 $(cat /var/tmp/name.pid)`

* Control the service

```
# control the service
sudo systemctl start redis
sudo systemctl stop redis
sudo systemctl restart redis
sudo systemctl status redis

# start on boot
sudo systemctl enable redis
sudo systemctl disable redis
```
