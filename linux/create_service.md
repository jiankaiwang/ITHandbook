# Create a Service in Linux

<script type="text/javascript" src="../js/general.js"></script>

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