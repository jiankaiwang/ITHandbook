# 客製化註冊選單及避免自動註冊登入

<script type="text/javascript" src="../js/general.js"></script>

### 修改 postgresql 資料庫
---

* 修正 login 的 peer authentication failed 問題，修正 conf 設定

```bash
# 修改 postgresql.conf 
$ sudo vim /etc/postgresql/9.3/main/pg_hba.conf
```

並將之改成，由 peer 改成 md5

```bash
# ...
# Database administrative login by Unix domain socket
local   all             postgres                                md5

# TYPE  DATABASE        USER            ADDRESS                 METHOD

# "local" is for Unix domain socket connections only
local   all             all                                     md5
# ...
```

修改後重啟服務

```bash
$ sudo /etc/init.d/postgresql restart
```


