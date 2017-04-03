# 建構以 HTTP/HTTPS 作為協定的 Git Server

<script type="text/javascript" src="../js/general.js"></script>

### Apache Server on Ubuntu 16.04 Over HTTP
---

* install dependencies

```bash
# install apache server and its utilities
sudo apt-get install apache2
sudo apt-get install apache2-utils

# install git
sudo apt-get install git

# establish /home/user/GitRemoteRepository as a git remote repository
mkdir /home/user/GitRemoteRepository
cd /home/user/GitRemoteRepository

# establish /home/user/GitRemoteRepository/example as a project
# chmod 777 to allow push (write authorization)
mkdir /home/user/GitRemoteRepository/example
chmod 777 /home/user/GitRemoteRepository/example
cd /home/user/GitRemoteRepository/example
git init --bare
```

* edit the apache server

```bash
# add the configure to the apache2.conf
sudo vim /etc/apache2/apache2.conf
```

```conf
# add the following in the last line
Include sites-enabled/git.config
```

* edit the git.config

```bash
# edit the configure
sudo vim /etc/apache2/sites-enabled/git.config
```

```conf
# in the git.config
# git remote repository
<Directory /home/user/GitRemoteRepository>
  Options Indexes FollowSymLinks
  AllowOverride None
  Order allow,deny
  Allow from all
</Directory>

# git execution
<Directory /usr/lib/git-core>
  Options Indexes FollowSymLinks
  AllowOverride None
  Order allow,deny
  Allow from all
</Directory>

# other git env setting
SetEnv GIT_PROJECT_ROOT /home/user/GitRemoteRepository
SetEnv GIT_HTTP_EXPORT_ALL
ScriptAliasMatch \
  "(?x)^/git/(.*/(HEAD | \
    info/refs | \
    objects/(info/[^/]+ | \
      [0-9a-f]{2}/[0-9a-f]{38} | \
      pack/pack-[0-9a-f]{40}\.(pack|idx)) | \
    git-(upload|receive)-pack))$" \
"/usr/lib/git-core/git-http-backend/$1"

# add authorization to write and read
<Location /git>
  AuthType Basic
  AuthName "Git Remote Repository"
  AuthUserFile "/home/user/GitRemoteRepository/htpasswd"
  Require valid-user
</Location>
```

* Create authorization table

```bash
# generate the file for authorization
# |- account / password : access the git account
htpasswd -cmb /home/user/GitRemoteRepository/htpasswd <account> <password>
```

* Set up the apache configuration

```bash
sudo a2enmod cgi alias env
```

* Restart the service

```bash
sudo service apache2 restart
```

* Git Operations

```bash
# clone the repository
git clone http://127.0.0.1/git/<資料庫名稱> <local Repo Path>

# push the branch
git push -u <remote repo name> <local branch name>
```

### Apache Server on Ubuntu 16.04 Over HTTPS (Continued ...)
---

* Main Installiation and Setting are the same with HTTP above

* Generate SSL Certificate

```bash
# generate private key 
# input a customized pass phrase
# method : des3
# length : 2048
openssl genrsa -des3 -out server.key 2048

# generate certificate request file (and input all its information)
openssl req -new -key server.key -out server.csr

# generate signature file / Certificate file
# time peroid : 10 years (365 * 10)
openssl x509 -req -days 3650 -in server.csr -signkey server.key -out server.crt

# rename for generating a rsa prikey
mv ./server.key ./server.key.old

# regenerate a RSA Private Key
openssl rsa -in server.key.old -out server.key
```








