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
pip2 install ckantoolkit upgrade
```

* 自 github 安裝 by http protocol

```
# 放置在 ckan 預設放置 plugin 路徑
cd /usr/lib/ckan/default/src/ckan/ckanext

# 取得原 plugin 模組的 http url
$ git clone git@github.com:ckan/ckanext-scheming.git
```

###
