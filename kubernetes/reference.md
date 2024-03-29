# Quick Reference



## Basic Commands

```sh
kubectl 
  help <command-name>
  version
  config
    set-context <context-name>  # create the context
    use-context <context-name>  # use the context
  create 
    -f ./service.yaml           # from the yaml file
    deployment <deployName>     # create a deployment
      --image <container-name>  # from the Docker image
    secret                      # create the secret
      generic
        --from-file <folder-path>
      tls
      docker-registry
    configmap <name>
      --from-file
    clusterrolebinding 
      <name>
      --clusterrole=<cluster-admin>
      [--user=$(gcloud config get-value account) |
       --serviceaccount=kube-system:tiller]
    serviceaccount              # create a service coount
      <tiller>
      --namespace <kube-system>
  run <hello-server> 
    [--image=<hub>] 
    [--port 8080]
    [--replicas=<number>]
    [--labels="key1=value1,key2=label2"]
  attach
    <-it <pod-name>>            # attach the pod and send the msg to it    
  logs                          # show the logs
    [-f]                        # follows the messages
    <pod-name>
  expose                        # create a service using `expose`
    deployment <hello-server>   # expose an existing deployment
      # ask the cloud provider to create a LoadBalancer for apps
      [--type=<"LoadBalancer"|"ClusterIP"|"NodePort">]
      [--name="svc-name"]       # the service name
      <--port 8080>             # must expose the port number
  label                         # update the resources's labels
    <res-type> <res-name> <"secure=y">   # add labels
    <res-type> <res-name> <"secure-">    # remove, without =
    <pod-name> <"secure=y">
  get 
    componentstatuses           # the health check
    service                     # get the service list    
      [service-name]
      [deployment-name]        
    deployment [-o wide]        # get the deployment list
    pods                        # get the pod list
      [-o wide]                 
      [-l "app=name,secure=y"]  # get with the labeling info
      <pod-name>
        [--show-labels]         # show the pod's labels
    configmap
    secret
    namespaces                  # get the namespace list
    replicasets                 # get the replicaset information
    serviceaccount
      [--namespace=<kube-system>]
    clusterrolebinding
    daemonsets                  # get the daemonset information
  scale                         # scale the deployment
    deployment <name> 
    <--replicas=2>              # the number of replicas
  describe                      # show the metadata
    nodes <node-name>           # the node's information
    pods <pod-name>
  port-forward                  # port-forwarding from local or node port
    <pod-name|services/service-name>
    [--address <0.0.0.0>]
    <local-port:pod-port>  
  set 
    image <deployment/hello-minikube> <hello-minikube=google_containers/echoserver:1.7>
  rollout 
    status <deployment/hello-minikube>
  exec                          # execute the commands in the pod
    <POD-NAME> 
    [-c <container-name>]
    [--stdin] [--tty]           # interactive
    [-- commands]               # recommended to add `--`
  cp                            # copy from the container to the local
    <POD-NAME>:</path> </path/local>
  delete                        # delete the objects
    service <service-name>
    deployment <deploy-name>
  cluster-info
  explain                       # explain the object and its meta data
    <deplyment|service|deployment.metadata.name> 
    <--recursive>
  edit                          # edit the running objects
    [deployment <deployment-name>]
  rollout                       # the rolling update 
    history <deployment/name>   # the rollout history
    pause <deployment/name>     # pause the rollout
    resume <deployment/name>    # resume the pasued rollout
    status <deployment/name>    # show the rollout status
    undo <deployment/name>      # roll back to the previous versions
  apply                         # apply the new changes
    <-f file.yaml>
    --dry-run=client            # dry run the modification 
    view-last-applied
    edit-last-applied
    set-last-applied
```

