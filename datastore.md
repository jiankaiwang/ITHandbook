# DataStore

<script type="text/javascript" src="js/general.js"></script>

###功能簡介
---
* 上傳至資料庫的資料內容，可提供 資料預覽外掛 使用。
* 提供 [DataStore API](http://docs.ckan.org/en/latest/maintaining/datastore.html#the-datastore-api) 可供開發者以 RESTful API 取得 JSON 格式資料。

###系統需求
---
* CKAN (>=2.1)
* PostgreSQL (>=9.0)

| 註解 |
| -- |
| 若依照本文件的教學安裝 CKAN，你應該已經滿足所有套件需求 |

###設定
---
* 啟用 DataStore：
修改 CKAN 設定檔（一般位於 /etc/ckan/default/），因於 CKAN 佈署之「設定開機自動執行」中 Script 用 production.ini，所以接下來需用 production.ini 進行修改，若是為測試用則可以用 development.ini，在 ckan.plugins 最後加上：
```Bash
ckan.plugins = datastore
```

* 新增 DataStore 使用之 PostgreSQL 使用者：
```Bash
$ sudo -u postgres createuser -S -D -R -P -l datastore_default
```

* 新增 DataStore 使用之資料庫：
```Bash
$ sudo -u postgres createdb -O ckan_default datastore_default -E utf-8
```

* DataStore 資料庫連線設定：<br>
修改 CKAN 設定檔，搜尋下面字串，並將帳號密碼與 db 名稱依照上一步所新增的 db 設定：
```Bash
ckan.datastore.write_url = postgresql://ckan_default:password@localhost/datastore_default
ckan.datastore.read_url = postgresql://datastore_default:password@localhost/datastore_default
```

| 註解 |
| -- |
| write_url 的第一個 ckan_default 是 CKAN 資料庫使用者名稱，pass 請填寫 db 密碼，最後的 datastore_default 填入 db 名稱，read_url 同理。 |

* DataStore 資料庫權限設定：
```Bash
(pyenv) $ paster --plugin=ckan datastore set-permissions -c /etc/ckan/default/production.ini
```

* 重新啟動 CKAN

* 測試 DataStore，可輸入以下指令：
```Bash
$ curl -X GET "http://127.0.0.1/api/3/action/datastore_search?resource_id=_table_metadata"
```
可能得到結果如下
```Bash
{"help": "http://127.0.0.1:5000/api/3/action/help_show?name=datastore_search", "success": true, "result": {"resource_id": "_table_metadata", "fields": [{"type": "text", "id": "_id"}, {"type": "name", "id": "name"}, {"type": "oid", "id": "oid"}, {"type": "name", "id": "alias_of"}], "records": [{"_id": "1fab8662e5772995", "alias_of": "pg_views", "name": "_table_metadata", "oid": 18106}, {"_id": "21b5fe766665b205", "alias_of": "pg_tables", "name": "_table_metadata", "oid": 18106}], "_links": {"start": "/api/3/action/datastore_search?resource_id=_table_metadata", "next": "/api/3/action/datastore_search?offset=100&resource_id=_table_metadata"}, "total": 2}}
```



