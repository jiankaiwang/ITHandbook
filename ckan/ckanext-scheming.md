# ckanext-scheming

<script type="text/javascript" src="../js/general.js"></script>

* ckanext-scheming source 
  * 原 ckan 模組 : [https://github.com/ckan/ckanext-scheming](https://github.com/ckan/ckanext-scheming) 
  * 自製模組 (by forking) : [https://github.com/jiankaiwang/ckanext-scheming](https://github.com/jiankaiwang/ckanext-scheming)

### 安裝
---

* 預先安裝必要 package : ckantoolkit, ckanapi

```bash
# 必須確認進入虛擬環境 (因 ckan 執行為 sandbox-based 環境)
. /usr/lib/ckan/default/bin/activate

# 透過 pip 進行安裝
pip2 install ckantoolkit
pip2 install ckanapi

# 檢查是否安裝成功
pip2 list
```

* 自 github 安裝 by http protocol

```
# 放置在 ckan 預設放置 plugin 路徑
$ cd /usr/lib/ckan/default/src/ckan/ckanext

# 取得原 plugin 模組的 http url
$ git clone https://github.com/ckan/ckanext-scheming.git

# clone 後的內容會放置在
$ cd /usr/lib/ckan/default/src/ckan/ckanext/ckanext-scheming/
```



###
