# Quick Start



## Preparation



* Install `Docker CE`.

```shell
sudo apt-get update

# install over https
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
    
# add Docker's official GPG key    
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# check fingerprint
sudo apt-key fingerprint 0EBFCD88

# x86_64 / amd64
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
   
   
sudo apt-get update

# install the docker-ce
sudo apt-get install docker-ce

sudo docker --version
```



* Upgrade Docker.

```shell
sudo apt-get update
```



* Start the demo.

```shell
sudo docker run hello-world
```

