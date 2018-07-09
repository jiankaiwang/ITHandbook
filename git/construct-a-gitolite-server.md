# Install Gitolite Server as the Git Server

* Gitolite is a server providing 
	* establishing authorizations of User/Project
	* establishing write/read authorization of branchs/tags

## Ubuntu 14.04

* Install Git

```bash
sudo apt-get update
sudo apt-get install git

# configure git 
git config --global user.email test@example.com
git config --global user.name test
```

* Install Gitolite Server

```bash
sudo apt-get install gitolite
```

* Configure Gitolite

```bash
# gitolite stores its configuration in a git repository
# create a user for gitolite to be accessed as
sudo adduser --system --shell /bin/bash --group --disabled-password --home /home/git git

# prepare ssh key
# assume the current user is the administrator of the git repository
# assume the private/public key was not generated and named by default
ssh-keygen

# copy the administrator public key for future use
cp ~/.ssh/id_rsa.pub /tmp/$(whoami).pub

# switch to the git user and import the administrator's key into gitolite
# the configure file would show after executing the gl-setup command
sudo su - git
gl-setup /tmp/*.pub

# the admin configuration respository locates at /home/git
# two subdirectories, conf and keydir, are generated
# switch back to that user, then clone the configuration repository
exit
git clone git@$IP_ADDRESS:gitolite-admin.git
cd gitolite-admin
```

* Manage gitolite users and repositories

```bash
# add the user by adding their public keys to the keydir directory as <desired_name>.pub
# remove the user by deleting their public keys from the keydir directory
# after adding users, the authorization R/W must be add to the conf/gitolite.conf
vim ./conf/gitolite.conf

# No matter adding or removing users, git commit operation is necessary
git add -A
git commit -m <msg>
git push origin master
```

* Use the server (with example)

```bash
# must add ssh public key to continue
# use user01 as the account
cp user01.pub ./gitolite-admin/keydir

# add a new repo (e.g. newrepo)
# assign to the new account(user01)
vim ./gitolite-admin/conf

# the following is the example in conf/gitolite.conf

newrepo
    RW+         =   user01

# commit to the gitolite server
git add -A
git commit -m "new user and new repo"
git push -u origin master

# after complete the above operation
# operations in user01 end
git clone git@<IP or URL>:newrepo <local Path>
git push -u origin <local branch name>
```