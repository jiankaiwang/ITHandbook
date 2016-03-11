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

###建立 CKAN 設定檔
* 新增放置 CKAN 設定檔之目錄：
```Bash
$ sudo mkdir -p /etc/ckan/default
$ sudo chown -R `whoami` /etc/ckan/
```

* 透過 paster 新增範例設定檔：

| 重要 |
| -- |
| 執行任何 paster 指令時，請確認是在虛擬環境下 |
```Bash
(pyenv) $ paster make-config ckan /etc/ckan/default/development.ini
```

* 修改前面新增的 development.ini，搜尋下面字串，並將帳號密碼與 db 名稱依照前數步驟「設定資料庫」進行設定：
```Bash
sqlalchemy.url = postgresql://ckan_default:pass@localhost/ckan_default
```

| 註解 |
| -- |
| 第一個 ckan_default 是使用者名稱，pass 請填寫 db 密碼，最後的 ckan_default 填入 db 名稱 |

* 設定 site_url :
```Bash
ckan.site_url = http://127.0.0.1:5000
```






