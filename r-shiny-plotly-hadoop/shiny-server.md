# Shiny-Server

<script type="text/javascript" src="../js/general.js"></script>

### install on ubuntu 16.04
---

* 參考資料 : [https://www.rstudio.com/products/shiny/download-server/](https://www.rstudio.com/products/shiny/download-server/)

* 安裝指令

```bash
# update library list and upgrade current 
sudo apt-get update
sudo apt-get upgrade

# install R core
sudo apt-get install r-base
sudo apt-get install r-base-dev

# install shiny package into R core
sudo su -c "R -e \"install.packages('shiny', repo='https://cran.rstudio.com')\""

# install necessary packages for shiny server and all of its dependencies
sudo apt-get install gdebi-core

# download installer
wget https://download3.rstudio.org/ubuntu-12.04/x86_64/shiny-server-1.5.1.834-amd64.deb
```

* Configuration

```bash
# main conf file
# default site_dir : /srv/shiny-server
# default R_code_dir : /opt/shiny-server
# default site_port : 3838
sudo vim /etc/shiny-server/shiny-server.conf 

# main shiny-server log path
cd /var/log/shiny-server/

# service operation
sudo service shiny-server [start|stop|restart]
```

* Suggested packages into R core : Plotly

```bash
# install necessary softwares
sudo apt-get install libxml2-dev
sudo apt-get install openssl
sudo apt-get install libssl-dev
sudo apt-get install curl
sudo apt-get install libcurl4-gnutls-dev

# install packages or connectors into R core on the regular repository
sudo su -c "R -e \"install.packages('rmarkdown',repos='https://cran.rstudio.com')\""
sudo su -c "R -e \"install.packages('XML', repo='https://cran.rstudio.com')\""
sudo su -c "R -e \"install.packages('httr', repo='https://cran.rstudio.com')\""
sudo su -c "R -e \"install.packages('openssl', repo='https://cran.rstudio.com')\""
sudo su -c "R -e \"install.packages('curl', repo='https://cran.rstudio.com')\""
sudo su -c "R -e \"install.packages('plotly', repo='https://cran.rstudio.com')\""
sudo su -c "R -e \"install.packages('ggthemes', repo='https://cran.rstudio.com')\""
```

* Run with shared folder by VM (VirtualBox as the example)

```bash
# add to the group
# by default, shiny-server is running by a default user : shiny (in conf file)
sudo adduser shiny vboxsf
```









