# Quick Reference



## Basic Commands

```sh
kubectl 
	version
	create -f ./service.yaml
	run <hello-server> [--image=gcr.io/google-samples/hello-app:1.0] [--port 8080]
	expose 
		deployment <hello-server> [--type="LoadBalancer"]
	get 
		service <hello-server>
		deployment [-o wide]
		pods [-o wide]
		svc <deployment-name>
	scale <hello-server> [--replicas=2]
	set 
		image <deployment/hello-minikube> <hello-minikube=google_containers/echoserver:1.7>
	rollout 
		status <deployment/hello-minikube>
	exec <POD-NAME> [-it]
	delete 
		service hello-minikube
	  deployment hello-minikube
```

