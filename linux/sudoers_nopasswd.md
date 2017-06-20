# Execute a sudo shell script without password
---

### Procedures
---

* edit the sudoers

```bash
$ sudo vim /etc/sudoers
```

* add command alias

```conf
Cmnd_Alias    CMD = /path/to/your/script
```

* add the privilege

```conf
user    ALL=NOPASSWD: CMD
```