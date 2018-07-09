# Minikube



由 Google 發布的輕量化工具，可讓使用者在本機架設一個 Kubernetes Cluster。Minikube 會於本機上執行一個 VM，並在此 VM 裡建立一個 single-node Kubernetes Cluster，但並不支援 HA (High Availability)，於大型系統架構下並不實用。



Minikube: https://github.com/kubernetes/minikube



## Quick Start



### 預先準備

* 需先安裝 Virtualization Software, 如  Virtualbox 等。



### 安裝 kubectl 套件

**kubectl** (kubernetes controller) 為存取 kubernetes 上物件的指令。

```bash
$ curl -LO https://storage.googleapis.com/kubernetes-release/release/`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt`/bin/linux/amd64/kubectl
$ chmod +x ./kubectl
$ sudo mv ./kubectl /usr/local/bin/kubectl

# run the command
$ kubectl
```



### 安裝 Minikube 套件

```bash
$ curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 
$ chmod +x minikube
$ sudo mv minikube /usr/local/bin/

# run the command
$ minikube [version]
```



### 啟動 Minikube 工具

```bash
$ minikube start
$ minikube dashboard
$ minikube status
```

若啟動 minikube 無法成功，可以嘗試關閉 virtualbox 及將 `~/.minikube` 資料夾刪除後，重新執行上述指令。



啟動 minikube 後，於 HOME 目錄多一個 `.kube` 資料夾，而 kubectl 便是透過該資料夾下的 **configuration** 與 minikube 溝通，可以透過 `cat` 指令查看 `~/.kube/config` 檔案，如下範例：

```ini
apiVersion: v1
clusters:
- cluster:
    certificate-authority: /home/user/.minikube/ca.crt
    server: https://192.168.99.100:8443
  name: minikube
contexts:
- context:
    cluster: minikube
    user: minikube
  name: minikube
current-context: minikube
kind: Config
preferences: {}
users:
- name: minikube
  user:
    as-user-extra: {}
    client-certificate: /home/user/.minikube/client.crt
    client-key: /home/user/.minikube/client.key

```



## 執行範例



Kubectl 工具資訊

```shell
$ Kubectl version
```



透過 `kubectl run` 在 minikube 上運行一個 google 提供的 **hello-minikube** docker image

```bash
$ kubectl run hello-minikube --image=gcr.io/google_containers/echoserver:1.8 --port=8080
$ kubectl get deployments
$ kubectl get pods -o wide
```



執行 `kubectl expose` 指令，使本機端可以查看到上述服務，並使用 `minikube service` 取得服務的 URL，便可以透過瀏覽器查看此 URL。

```bash
$ kubectl expose deployment hello-minikube --type=NodePort
$ minikube service hello-minikube [--url]
$ kubectl get service
```



瀏覽器內容範例如下 (以 **Windows** 為例):

```html


Hostname: hello-minikube-777b79bbc5-7d5r5

Pod Information:
	-no pod information available-

Server values:
	server_version=nginx: 1.13.3 - lua: 10008

Request Information:
	client_address=172.17.0.1
	method=GET
	real path=/
	query=
	request_version=1.1
	request_uri=http://192.168.99.100:8080/

Request Headers:
	accept=text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
	accept-encoding=gzip, deflate
	accept-language=zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7
	connection=keep-alive
	host=192.168.99.100:32018
	upgrade-insecure-requests=1
	user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36

Request Body:
	-no body in request-

```



Scaling 服務，建立另一 Pod，或關閉其餘的 Pod 至要求的數目。

```shell
$ kubectl scale deployment/hello-minikube --replicas=2
$ minikube service hello-minikube --url
$ kubectl get pods -o wide
```



Rolling 版本，與 Container 相同，可以透過 `tag` 來升版或降版。

```shell
# $ kubectl rollout undo deployments/medium-api
$ kubectl set image deployment/hello-minikube hello-minikube=google_containers/echoserver:1.7
$ kubectl rollout status deployment/hello-minikube
```



相關指令

```shell
# Logs
$ kubectl logs --follow <POD-NAME>

# Execute Commands
$ kubectl exec <POD-NAME> -it -- ls

# Kill
$ kubectl delete service hello-minikube
$ kubectl delete deployment hello-minikube
$ minikube stop
```



## 部署服務



kubectl 可以透過定義好的 YAML 格式檔來執行。

```shell
# 先匯出服務指令檔
$ kubectl get services hello-minikube -o yaml > ./service.yaml

# 透過指令檔來創造服務
$ kubectl create -f ./service.yaml
```

`YAML` 格式如下

```yaml
apiVersion: v1
kind: Service
metadata:
  creationTimestamp: 2018-05-25T07:59:36Z
  labels:
    run: hello-minikube
  name: hello-minikube
  namespace: default
  resourceVersion: "4399"
  selfLink: /api/v1/namespaces/default/services/hello-minikube
  uid: 9169b810-5ff1-11e8-87a0-080027154fee
spec:
  clusterIP: 10.100.148.10
  externalTrafficPolicy: Cluster
  ports:
  - nodePort: 31982
    port: 8080
    protocol: TCP
    targetPort: 8080
  selector:
    run: hello-minikube
  sessionAffinity: None
  type: NodePort
status:
  loadBalancer: {}
```



Kubernetes 將整套系統稱為 Chart，類似 npm 中的 `package.json`。可以透過工具 Helm 來協助建立 YAML 檔案來部署服務，可以至網頁 https://github.com/kubernetes/helm/releases/ 下載。

```shell
$ helm version
$ kubectl config current-context
# minikube
$ helm init --service-account tiller --kube-context minikube
```

若要使用現有的 chart 資源，如下 Wordpress 範例 (使用官方 Chart Repository [KubeApps](https://hub.kubeapps.com/charts?q=wordpress))

```shell
$ helm repo update
$ helm install stable/wordpress
```



 建立自訂的 Chart.ymal.

```shell
$ helm create mcs-lite
$ helm install . --dry-run --debug
$ helm install . --name mcs-lite
```



部署版本管理

```shell
$ helm ls
$ helm upgrade mcs-lite .
# rollback to previous version
$ helm rollback mcs-lite 1
```



打包整個服務

```shell
$ helm package . --debug -d ./charts
$ helm install ./charts/mcs-lite-0.1.0.tgz
```

