# CKAN 安裝

###作業系統環境
1. 建議使用 Ubuntu 12.02 LTS or 12.04 LTS x86_64 Server Edition
2. 可以透過虛擬機先進行建置 (需注意網路配置)


###安裝必須套件

```Bash
$ sudo apt-get install python-dev postgresql libpq-dev python-pip python-virtualenv git-core solr-jetty openjdk-6-jdk
```

###Virtual environment 設定
1. 新增一個虛擬環境 (virtualenv) 供 CKAN 使用：

```bash
$ sudo mkdir -p /usr/lib/ckan/default
$ sudo chown `whoami` /usr/lib/ckan/default
$ virtualenv --no-site-packages /usr/lib/ckan/default
```

2. 進入剛才新增的虛擬環境：

```bash
$ . /usr/lib/ckan/default/bin/activate
```
#####註解
欲離開虛擬環境，可使用 deactivate 指令。若需返回，只要再執行
```bash
$ . /usr/lib/ckan/default/bin/activate
```
即可。

