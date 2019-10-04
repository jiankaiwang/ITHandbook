# Quick Start



## Environment Setup



### MacOS

Hadware Check

```bash
sysctl -a | grep machdep.cpu.features | grep VMX
```

Install tools and related requirements.

```bash
brew update
brew install kubernetes-cli
brew cask install docker
brew cask install minikube
brew cask install virtualbox
kubectl version
```

Check version.

```bash
docker --version                
docker-compose --version        
docker-machine --version        
minikube version                
kubectl version --client
```

Start kubernetes cluster.

```bash
minikube start
```

