# 建立 Gitlab CE 為私有 Git 資料庫伺服器

<script type="text/javascript" src="../js/general.js"></script>

### Ubuntu 16.04 
---

* Installation : [reference](https://about.gitlab.com/downloads/)

```bash
# install necessary dependencies
# while installing postfix, choose the option 'Internet Site' 
sudo apt-get install curl openssh-server ca-certificates postfix

# add GitLab Package sever and install the server
curl -sS https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.deb.sh | sudo bash
sudo apt-get install gitlab-ce

# configure and start gitlab
sudo gitlab-ctl reconfigure

# access by the browser at port 80
# redirect to reset the apssword at the first time
# default user account is root
```

* troubleshooting
    * while changing network setting of VirtualBox, the command **sudo gitlab-ctl reconfigure** must be reconfigured






