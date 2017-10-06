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

# restart the service
sudo gitlab-ctl restart

# access by the browser at port 80
# redirect to reset the apssword at the first time
# default user account is admin
```

* troubleshooting
    * while changing network setting of VirtualBox, the command **sudo gitlab-ctl reconfigure** must be reconfigured

### Access the GitLab 
---

* git operation

```
# http example
git clone http://test@192.168.3.19/test/test.git ./Desktop/test

# ssh example
git clone git@192.168.3.19:test/test.git ./Desktop/test
```

### Reset Administrator Password
---

```bash
# login to gitlab-ce console
$ sudo gitlab-rails console production

# find administrator
> user = User.where(id: 1).first

# [Optional] : find a specific account
> user = User.find_by(email: 'admin@local.host')

# reset password, both of the following commands must be executed
# rule : at least 8 characters
> user.password = 'secret_pass'
> user.password_confirmation = 'secret_pass'

# save the password
> user.save!
```



