# Docker images on MicroK8s

## Install Docker

Install Docker tool on Ubuntu.

```sh
$ sudo apt-get update && sudo apt-get install docker.io
```

Add the current user to the `docker` group.

```sh
$ sudo usermod -a -G docker ${USER}
```

Re-enter the account to make the group added take place.

```sh
$ su - ${USER}
```

Run the docker command to list the local docker image. You can also pull the image from the public registry.

```sh
# pull the image from the public registry
$ docker pull nginx:latest

# list the docker images
$ docker images
```

```text
REPOSITORY   TAG     IMAGE ID       CREATED       SIZE
nginx        latest  6678c7c2e56c   7 days ago    127MB
```

## Working with locallt built images without a registry

The images we created or pull is known to Docker daemon. However, Kubernetes is not aware of the images. One of the reasons is the Docker daemon is not a part of the MicroK8s Kubernetes cluster.

We can export the Docker image from the local Docker daemon and `inject` it into the MicroK8s.image cache.

```sh
# export the image from the local Docker daemon
$ docker save nginx:latest > nginx_latest.tar
```

Inject the image into the MicroK8s Kubernetes image cache. **(Under `k8s.io` namespace.)**

```sh
# inject the image into the MicroK8s Kubernetes Image cache
$ microk8s.ctr images import nginx_latest.tar

# you can list images in MicroK8s
$ microk8s.ctr images ls
```

```text
docker.io/library/nginx:latest ...
```

Next, we can create a configure file (`deploy.yml`).

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment   # deployment name
  labels:
    app: nginx
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        imagePullPolicy: Always   # Never might cause `ErrImageNeverPull` 
        ports:
        - containerPort: 80
```

We can deploy this file.

```sh
$ microk8s.kubectl apply -f ./deploy.yml

# view the deployment
$ microk8s.kubectl get deployment
```

## Advanced Opetations

Scale the deployment to multiple replicas.

```sh
$ microk8s.kubectl scale deployment nginx-deployment --replicas=2
```

Create a service to expose the deployment.

```sh
# service/nginx-service exposed
$ microk8s.kubectl expose deployment nginx-deployment --type=NodePort --port=80 --name=nginx-service
```

Check the exposed status.

```sh
$ microk8s.kubectl get all [--all-namespaces]
```

The detail information would be shown.

```text
NAME                                    READY   STATUS              RESTARTS   AGE
pod/k8s-bootcamp-844bd7dd7-h7b49        1/1     Running             4          47h
pod/nginx-deployment-7f997555d8-jp8x4   0/1     ErrImageNeverPull   0          2m58s
pod/nginx-deployment-7f997555d8-r5crd   1/1     Running             0          14m

NAME                    TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
service/kubernetes      ClusterIP   10.152.183.1    <none>        443/TCP        2d
service/nginx-service   NodePort    10.152.183.38   <none>        80:30545/TCP   27s

NAME                               READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/k8s-bootcamp       1/1     1            1           47h
deployment.apps/nginx-deployment   1/2     2            1           14m

NAME                                          DESIRED   CURRENT   READY   AGE
replicaset.apps/k8s-bootcamp-844bd7dd7        1         1         1       47h
replicaset.apps/nginx-deployment-7f997555d8   2         2         1       14m
```

You can simply list the service.

```
$ microk8s.kubectl get services
```

```text
NAME            TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
kubernetes      ClusterIP   10.152.183.1    <none>        443/TCP        2d
nginx-service   NodePort    10.152.183.38   <none>        80:30545/TCP   3m49s
```

Surf the url `10.152.183.38` to access the nginx service. You can simply delete the services and the deployments.

```sh
# delete the service
$ microk8s.kubectl delete services nginx-service

# delete the deployment
$ microk8s.kubectl delete deployment nginx-deployment
```