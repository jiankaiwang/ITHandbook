# Inspect Networking on Pods

## Create a Multiple Pods Deployment with an Exposed Service

The following is a multiple pods deployment configure file (`deploy.yml`).

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment   # deployment name
  labels:
    app: nginx
spec:
  # replicas: 2
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
        # `Never` might cause `ErrImageNeverPull` if no image exists
        imagePullPolicy: Always
        ports:
        - containerPort: 80
```

We create a deployment, scale it and expose a service to the deployment.

```sh
# create a deployment for the `nginx` service
$ microk8s.kubectl apply -f ./deploy.yml

# scale the pods (optional) if you don't set the replicas on the yml
$ microk8s.kubectl scale deploymeny nginx-deployment --replicas=2

# if creating the pod is error, you can delete it (optional)
$ microk8s.kubectl get pod
$ microk8s.kubectl delete pod nginx-deployment-59c9f8dff-zk5rp

# show the deployment
$ microk8s.kubectl get deployment

# expose the service to the deployment
$ microk8s.kubectl expose deployment nginx-deployment --type=NodePort --name=nginx-service --port=80

# view the service
$ microk8s.kubectl get service
```

## Inspect each Pod

Here we create an Nginx service cluster. By default, the k8s would balance the networking for different pods. We can request the cluster URL and inspect the logs of pods.

Show the service information.

```sh
# show the network inforamtion
$ microk8s.kubectl get all
$ microk8s.kubectl get service
```

We can create a python script to do multiple requests.

```sh
# create a virtualenv for requests
$ virtualenv -p python ./k8s_req

# activate the virtualenv
$ source ./k8s_req/bin/activate

# install the necessary package
$ pip install requests
```

The following is the demo example (`req.py`) for requesting the Nginx cluster.

```python
import requests
import time

def req(URL):
  request = requests.get(URL)
  return(int(request.status_code) == 200)

if __name__ == "__main__":
  print("Pass")

  for i in range(200):
    if (i+1) % 2 == 0:
      time.sleep(1)
    if (i+1) % 50 == 0:
      print("Stage {}".format(i+1))

    # we can inspect the logs to watch the networking balance
    url_id = "http://10.152.183.39/?q={}".format(str(i+1))
    if not req(url_id):
      print("Error\n")
      break
```

After you create the script, run the command to start the script.

```sh
$ python req.py
```

You now can inspect the the pods to make sure they are accessible.

```sh
$ microk8s.kubectl get pod -o wide
```

Inspect each pod.

```sh
# the first pod
$ microk8s.kubectl logs nginx-deployment-59c9f8dff-cb6pg

# the second pod
$ microk8s.kubectl logs nginx-deployment-59c9f8dff-648r9
```

You can simply delete the service and the deployment.

```sh
# delete the service
$ microk8s.kubectl delete service nginx-service

# delete the deployment
$ microk8s.kubectl delete deployment nginx-deployment
```