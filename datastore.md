# DataStore

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



