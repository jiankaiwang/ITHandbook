# Use crontab

<script type="text/javascript" src="../js/general.js"></script>

###Introduction and Background
---

* The crontab is a file describing the schedule jobs for the linux-based OS. You could write a code doing something, such as a backup job, and set this job into the crontab. The job would be finished as the set time. The crontab is placed at ** /etc/crontab ** in the CentOS 6.x environment.

* The crond is the main daemon (a service) to do the jobs stored in the file crontab. The crond could be auto activated after the boot of OS, its location is at ** /etc/init.d/crond ** in the CentOS 6.x environment.

###Basic command and Several parameters
---

* The basic format of recordings in the file crontab :

| minute | hour | day of month | month | day of week | user-name | command |
| -- | -- | -- | -- | -- | -- | -- |
| (0-59) | (0-23) | (1-31) | (1-12) | (0-6); Sun=[0 or 7] | [root or userName] | complete command<br>(absolute path) |
| 10 | 3 | 1-31/3 | * | * | root | /home/user/data/backUp.sh |

The example on the above figure is that root executes /home/user/data/backUp.sh at every week (*), every month (*), every three day (1-31/3), 3 AM (3), 10th minute (10).

* The short-termed schedule: delete after being reboot or shut down of the system

```Bash
$  crontab -e             # open temp file of crontab to record short-termed schedule

10 3 1-31/3 * * root /home/data/backUp.sh         # just add this line and store the file (":wq")
```

* The long-termed schedule: keep conducting and executing the schedule no matter whether the system was shut down or not

```Bash
$ vim /etc/crontab     # open the file recording long-termed schedules

10 3 1-31/3 * * root /home/data/backUp.sh         # just add this line on the bottom of file and store it (":wq")
```

* If the schedule just added would not work, you could restart the service crond to make sure it catches the right setting. (In fact, this procedure was not needed to do when I set the long-termed schedule previous.)

```Bash
$ /etc/init.d/crond restart
```