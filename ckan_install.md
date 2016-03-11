# CKAN 安裝

###作業系統環境
1. 建議使用 Ubuntu 12.02 LTS or 12.04 LTS x86_64 Server Edition
2. 可以透過虛擬機先進行建置 (需注意網路配置)


###安裝必須套件
```Bash
$ sudo apt-get install python-dev postgresql libpq-dev python-pip python-virtualenv git-core solr-jetty openjdk-6-jdk
```

###Virtual environment 設定
* 新增一個虛擬環境 (virtualenv) 供 CKAN 使用：
```bash
$ sudo mkdir -p /usr/lib/ckan/default
$ sudo chown `whoami` /usr/lib/ckan/default
$ virtualenv --no-site-packages /usr/lib/ckan/default
```

* 進入剛才新增的虛擬環境：
```bash
$ . /usr/lib/ckan/default/bin/activate
```

| 註解 |
| -- |
| 欲離開虛擬環境，可使用 deactivate 指令。若需返回，只要再執行<br>```$ . /usr/lib/ckan/default/bin/activate``` <br>即可。 |

###安裝 CKAN
* 自 github ckeckout source (這邊以 2.4.1 為例）並安裝：
```Bash
$ (pyenv) $ pip install -e 'git+https://github.com/okfn/ckan.git@ckan-2.4.1#egg=ckan'
```

* 安裝所需 Python 套件：
```Bash
$ (pyenv) $ pip install -r /usr/lib/ckan/default/src/ckan/requirements.txt
```

###設定資料庫
* 新增 CKAN 使用之 PostgreSQL 使用者：
```Bash
$ sudo -u postgres createuser -S -D -R -P ckan_default
```

* 新增 CKAN 使用之資料庫：
```Bash
$ sudo -u postgres createdb -O ckan_default ckan_default -E utf-8
```






