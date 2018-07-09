# use rsync



###Introduction and Background
---

* After building my own website set on a linux-based environment, this website contained lots of experimental data , open source codes and self-defined codes so that it is necessary to backup those data by another container located on another places, a hard disk.

* There are several policies to backup the data, such like the incremental backup, differential backup and mirror backup. (more detailed information refer to Backup strategies)

* The condition is the following :
  1. The older version of data is not important, it is only necessary to keep one version, the latest one.
  2. The container is quite not big enough to store all data.
  3. Most of the data are text-based file, such as .html .php .docx .pptx, the other parts are programs (self-defined or open source codes in compressed format) and the system-related programs or settings are not the primary.
  4. It needs to recovery quickly and make the service back to run as usual.

* Based on the requirements, mirror backup is the option for this condition. There is a basic and popular command rsync which could afford such jobs. The following is to introduce the rsync command.

* And the entire job could be added into a schedule for the linux-based OS by crontab.

###Basic command and Several parameters
---

* Basic format of the command rsync: 

```Bash
$ rsync [parameters] source destination 
```

* The following is some descriptions of parameters:

| Parameters | descriptions |
| -- | -- |
| -v | Observed mode to catch the progress condition and show file list. |
| -q | On the contrary of '-v', it only outputs error message on the screen. |
| -r | Recursively copy the files inside the folder. (quite important) |
| -u | Only update, does not always cover the destination file. If the destination file is the latest, the file did not be changed. |
| -l (L) | 	Copy the property of the .lnk, not origin data. |
| -p | 	Copy files with their permission. |
| -g | Copy files with their group information. |
| -o | Copy files with names of their creators. |
| -D | Copy files with their device information. |
| -t | Copy files with their origin parameters of the time. |
| -I (i) | Copy files without their property of time in order to quickly copy files by skipping the compare between source and destination file. |
| -z | Copy files by compressed methods. |
| -e | Copy files through special network protocol, such as ssh, etc. |
| -E | Copy files with the modification of permissions. |
| -a | Copy files with r,l,p,t,g,o,D parameters as the default. |

* Formats of source and destination:

```Bash
# Copy all data under folder data, /data/* , inside the folder backUp, /backUp/.
$ rsync -avu /home/user/data/ /backUp/ 

# Copy the entire folder data, /data , under the folder backUp, /backUp/data/.
$ rsync -avu /home/user/data /backUp/ 
```

###rsync with ssh protocol
---

* It is convenient to use rsync on the ssh protocol among several host_PC and guest_PC. It usually deals with the protocol by auto-login the host_PC (refer to ssh communicate with auto-login on RSA [Link](https://sites.google.com/site/gljankai/knowledges/it/informationsecurity.1465367437129/sshrsa.1465367437122)) and rsync could automatically operate between two PCs.

* The basic Linux command is the following, take an example transmitting from /home/data/ belonging to root@192.168.1.2 to /Backup/ belonging to root@192.168.1.3:

```Bash
# rsync -av -e ssh /home/data/ root@192.168.1.3:/Backup/
```



