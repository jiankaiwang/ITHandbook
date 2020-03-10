# QuickStart to MicroK8s

Reference
* Start Guide: https://microk8s.io/docs/

## Install MicroK8s

```sh
$ sudo snap install microk8s --classic --channel=1.17/stable
```

## Join the Group

Add the current user to the microk8s group.

```sh
$ sudo usermod -a -G microk8s $USER
```

Re-enter the session for the group update to take place.

```sh
$ su - $USER
```

Check the groups whether microk8s was added.

```sh
$ groups
```

## Check the status

Add the parameter `--wait-ready` to wait for the Kubernetes initialization.

```sh
$ microk8s.status [--wait-ready]
```

## Accuess Kubernetes

MicroK8s bundles its own version of `kubectl` to access Kubernetes. Use `microk8s.kubectl` running commands to minitor or control the Kubernetes.

View your nodes.

```sh
$ microk8s.kubectl get nodes
```

View the running service.

```sh
$ microk8s.kubectl get services
```

You can also set the alias to invoke the `microk8s.kubectl`.

```sh
# optional
$ alias kubectl='microk8s.kubectl'
```

## Deploy an application

Kubernetes manages applications and services. You can easily do the same task using microk8s.

```sh
$ microk8s.kubectl create deployment k8s-bootcamp --image=gcr.io/google-samples/kubernetes-bootcamp:v1
```

You can check the status.

```sh
$ microk8s.kubectl get pods
```

## Use add-ons

For example, add `dns` management to facilitate communication between services. Second, if the service requires storage to provide directory space on the host, add `storage` to set it up.

```sh
$ microk8s.enable dns storage
```

You can check the status of add-ons.

```sh
$ microk8s.status
```

## Starting or Stopping the MicroK8s

```sh
$ microk8s.stop
$ microk8s.start
```