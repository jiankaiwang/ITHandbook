# Rstudio Server (Open Source Edition)



## Installiation

```shell
# update the os system and others tools
$ sudo apt-get update
$ sudo apt-get upgrade

# install R-core
$ cd /usr/src
$ sudo sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E298A3A825C0D65DFD57CBB651716619E084DAB9
$ sudo add-apt-repository 'deb [arch=amd64,i386] https://cran.rstudio.com/bin/linux/ubuntu xenial/'
$ sudo apt-get update
$ sudo apt-get install r-base

# install rstudio server
$ sudo apt-get install gdebi-core
$ wget https://download2.rstudio.org/rstudio-server-1.1.419-amd64.deb
$ sudo gdebi rstudio-server-1.1.419-amd64.deb

# verify the installiation
$ sudo rstudio-server verify-installation

# start the rstudio server service
$ sudo systemctl start rstudio-server.service
$ sudo systemctl status rstudio-server.service
$ sudo systemctl enable rstudio-server.service
```



## User



* Add a new user.

```shell
$ sudo adduser example
```



## Usage

* Surf the link http://example.com:8787/ and start the rstudio server service.