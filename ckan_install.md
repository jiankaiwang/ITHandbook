# CKAN 安裝

###作業系統環境
---
1. 建議使用 Ubuntu 12.02 LTS or 12.04 LTS x86_64 Server Edition
2. 可以透過虛擬機先進行建置 (需注意網路配置)

<div style="width=100%; margin-top: 10px; margin-bottom: 10px; height: 20px;"/>
###安裝必須套件
---
```Bash
$ sudo apt-get install python-dev postgresql libpq-dev python-pip python-virtualenv git-core solr-jetty openjdk-6-jdk
```

<div style="width=100%; margin-top: 10px; margin-bottom: 10px; height: 20px;"/>
###Virtual environment 設定
---
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

<div style="width=100%; margin-top: 10px; margin-bottom: 10px; height: 20px;"/>
###安裝 CKAN
---
* 自 github ckeckout source (這邊以 2.4.1 為例）並安裝：
```Bash
$ (pyenv) $ pip install -e 'git+https://github.com/okfn/ckan.git@ckan-2.4.1#egg=ckan'
```

* 安裝所需 Python 套件：
```Bash
$ (pyenv) $ pip install -r /usr/lib/ckan/default/src/ckan/requirements.txt
```

<div style="width=100%; margin-top: 10px; margin-bottom: 10px; height: 20px;"/>
###設定資料庫
---
* 新增 CKAN 使用之 PostgreSQL 使用者：
```Bash
$ sudo -u postgres createuser -S -D -R -P ckan_default
```

* 新增 CKAN 使用之資料庫：
```Bash
$ sudo -u postgres createdb -O ckan_default ckan_default -E utf-8
```

<div style="width=100%; margin-top: 10px; margin-bottom: 10px; height: 20px;"/>
###建立 CKAN 設定檔
---
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

<div style="width=100%; margin-top: 10px; margin-bottom: 10px; height: 20px;"/>
###安裝 solr (含中文搜尋支援）
---
| 註解 |
| -- |
| 本部分參考 [How To Install Solr 5.2.1 on Ubuntu 14.04 (DigitalOcean)](https://www.digitalocean.com/community/tutorials/how-to-install-solr-5-2-1-on-ubuntu-14-04) |

* 下載並解壓縮 solr:

| 註解 |
| -- |
| 因為 CKAN schema 與 Solr 5.2.1 以上版本存在[相容性問題](https://github.com/ckan/ckan/issues/2524)，故現階段建議使用 Solr 5.1.0。 |
```Bash
$ cd ~
$ wget http://archive.apache.org/dist/lucene/solr/5.1.0/solr-5.1.0.tgz
$ tar xzf solr-5.1.0.tgz solr-5.1.0/bin/install_solr_service.sh --strip-components=2
```

* 執行 solr 安裝腳本:
```Bash
$ sudo bash ./install_solr_service.sh solr-5.1.0.tgz
```

* 建立供 CKAN 使用之 solr configset:
```Bash
$ sudo -u solr mkdir -p /var/solr/data/configsets/ckan/conf
$ sudo ln -s /usr/lib/ckan/default/src/ckan/ckan/config/solr/schema.xml /var/solr/data/configsets/ckan/conf/schema.xml
$ sudo -u solr cp /opt/solr/server/solr/configsets/basic_configs/conf/solrconfig.xml /var/solr/data/configsets/ckan/conf/.
$ sudo -u solr touch /var/solr/data/configsets/ckan/conf/protwords.txt
$ sudo -u solr touch /var/solr/data/configsets/ckan/conf/synonyms.txt
```

* 下載並將中文斷詞函式庫 [mmesg4j](http://jkwpro.no-ip.info:8080/ckan2/ckan) 之 jar 檔案 (core, solr) 複製至 solr 目錄 (/opt/solr/server/solr-webapp/webapp/WEB-INF/lib)

* 調整 CKAN 搜尋索引定義 (使其支援中文搜尋)：<br>修改 schema.xml，將 fieldType name=”text” 區段修改為：
```XML
<fieldType name="text" class="solr.TextField" positionIncrementGap="100">
    <analyzer type="index">
        <tokenizer class="com.chenlb.mmseg4j.solr.MMSegTokenizerFactory" mode="max-word"/>
        <filter class="solr.SynonymFilterFactory" synonyms="synonyms.txt" ignoreCase="true" expand="true"/>
        <filter class="solr.WordDelimiterFilterFactory" generateWordParts="1" generateNumberParts="1" catenateWords="0" catenateNumbers="0" catenateAll="0" splitOnCaseChange="1"/>
        <filter class="solr.SnowballPorterFilterFactory" language="English" protected="protwords.txt"/>
        <filter class="solr.LowerCaseFilterFactory"/>
        <filter class="solr.ASCIIFoldingFilterFactory"/>
    </analyzer>
    <analyzer type="query">
        <tokenizer class="com.chenlb.mmseg4j.solr.MMSegTokenizerFactory" mode="max-word"/>
        <filter class="solr.SynonymFilterFactory" synonyms="synonyms.txt" ignoreCase="true" expand="true"/>
        <filter class="solr.WordDelimiterFilterFactory" generateWordParts="1" generateNumberParts="1" catenateWords="0" catenateNumbers="0" catenateAll="0" splitOnCaseChange="1"/>
        <filter class="solr.SnowballPorterFilterFactory" language="English" protected="protwords.txt"/>
        <filter class="solr.LowerCaseFilterFactory"/>
        <filter class="solr.ASCIIFoldingFilterFactory"/>
    </analyzer>
</fieldType>
```

| 註解 |
| -- |
| schema.xml 位於 /usr/lib/ckan/default/src/ckan/ckan/config/solr/schema.xml |

* 重新啟動 solr:
```Bash
$ sudo service solr restart
```

* 在瀏覽器輸入以下連結，以建立供 CKAN 使用之 solr core (此處命名為 ckan):
[http://127.0.0.1:8983/solr/admin/cores?action=CREATE&name=ckan&configSet=ckan](http://127.0.0.1:8983/solr/admin/cores?action=CREATE&name=ckan&configSet=ckan)

* 打開瀏覽器，前往 [http://127.0.0.1:8983/solr](http://127.0.0.1:8983/solr) ，若能看到畫面則代表安裝完成
* 修改 /etc/ckan/default/development.ini，指定 solr 連線位址：
```Bash
solr_url = http://127.0.0.1:8983/solr/ckan
```

| 註解 |
| -- |
| 網址中的 “ckan” 請代換成實際的 solr core 名稱 |

<div style="width=100%; margin-top: 10px; margin-bottom: 10px; height: 20px;"/>
###初始化資料庫
---
* 透過 paster 初始化 CKAN 資料庫：
```Bash
(pyenv) $ paster --plugin=ckan db init -c /etc/ckan/default/development.ini	
```

* 如果一切正常，則會看到此訊息：Initialising DB: SUCCESS

<div style="width=100%; margin-top: 10px; margin-bottom: 10px; height: 20px;"/>
###建立 who.ini link
---
```Bash
$ ln -s /usr/lib/ckan/default/src/ckan/who.ini /etc/ckan/default/who.ini
```

<div style="width=100%; margin-top: 10px; margin-bottom: 10px; height: 20px;"/>
###新增 CKAN 系統管理者
* 透過 paster 新增 CKAN 系統管理者：
```Bash
(pyenv) $ paster --plugin=ckan sysadmin add jkw -c /etc/ckan/default/development.ini	
```

| 註解 |
| -- |
| admin 請代換為您需要的使用者名稱，並依照程式提示設定密碼 |

<div style="width=100%; margin-top: 10px; margin-bottom: 10px; height: 20px;"/>
###在開發環境下執行
---
* 透過 paster serve 新安裝的 CKAN 網站
```Bash
(pyenv) $ paster serve /etc/ckan/default/development.ini
```

* 打開瀏覽器，前往 [http://127.0.0.1:5000/](http://127.0.0.1:5000/) ，至此 CKAN 安裝完成















