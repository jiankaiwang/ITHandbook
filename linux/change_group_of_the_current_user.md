# change group of the current user

<script type="text/javascript" src="../js/general.js"></script>

###Look up the group
---

* Use the following command to show all the groups to which you belong to.

```Bash
$ groups
```

###Change the group
---

* It is quite convenient to read, write and execute (d---rwx---) one document or folder by the setting of the same group within different users from distinct groups. The following command could set the main group of the current user. One user might hold several groups one time, if is necessary.

```Bash
# usermod -g root LINUX (usage: usermod -g <target group> <username>)
```

###Add sub-group
---

* The following command could add a sub-group to the current user.

```Bash
# usermod -a -G httpd BUILD (usage: usermod -a -G <target group> <username>)
```

  1. ** -G **: for sub-group (uppercase), several groups
  2. ** -g **: for main group (lowercase), only one group

