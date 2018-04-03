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



透過 `kubectl run` 在 minikube 上運行一個 google 提供的 **hello-minikube docker image**

```bash
$ kubectl run hello-minikube --image=gcr.io/google_containers/echoserver:1.8 --port=8080
```



執行 `kubectl expose` 指令，使本機端可以查看到上述服務，並使用 `minikube service` 取得服務的 URL，便可以透過瀏覽器查看此 URL。

```bash
$ kubectl expose deployment hello-minikube --type=NodePort
$ minikube service hello-minikube --url
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



