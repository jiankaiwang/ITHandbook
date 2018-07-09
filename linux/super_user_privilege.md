# Super User Privilege



###Introduction and Background
---

* Question: How to give the privilege like super_user to a custom (normal user)? 

###Basic command and Several parameters
---

* First, create a user with its password:

```Bash
# useradd user01            # format useradd <username>
# passwd user01              # format passwd <username>
```

* Notice command **adduser** is much helpful than useradd, including auto creating home directory, etc.

```Bash
$ sudo adduser --home homePath account
```

* The above commands are trying to add a new user with auto-set its home folder located on ** /home/user01 **. Next promote this user or a group to super_user privilege.

```Bash
# vim /etc/sudoers
```

The file sudoers maintains the privilege like super_user for every terminal user. Find the similar content with the following line.

```Bash
## Allow root to run any commands anywhere
root    ALL=(ALL)    ALL
```

* Try to promote only one user with super_user-like privilege, then add the following on the bottom of the above line.

```Bash
user01    ALL=(ALL)    ALL
```

* The following is the example to test whether it works.

```Bash
$ cd /var/www/html
$ sudo mkdir ./test                # with your own password, not super user
```

If the folder named test could be created under /var/www/html, the super_user like privilege of the special user has already finished. The 'sudo' is similar with ubuntu distribution.

* Try to promote one group named USER01 with super_user-like privilege, then add the following on the bottom of the above line.

```Bash
%USER01 ALL=(ALL)    ALL
```

And the same procedure with the test of the single user mentioned above.

* If you want to skip entering the password, the following line is the way.

```Bash
%USER01 ALL=(ALL)    NOPASSWD:    ALL
```

* [Optional] If you want to delete the user, the following is the command. (Notice: -r is the parameter for auto-deleting all folder related with this user, including /home/(username))

```Bash
# userdel -r user01                # format userdel -r <username>
```

