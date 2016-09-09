# 客製化註冊選單及避免自動註冊登入

<script type="text/javascript" src="../js/general.js"></script>

* 增加一選項用來申請組織

### 修改 postgresql 資料庫組態
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

嘗試登入 CKAN PostgreSQL 資料庫

```bash
$ psql -U ckan_default
```

### 修改 CKAN 使用 postgresql 的 table schema 用來儲存新欄位
---

* 基本操作 postgresql 資料庫指令 (可參考)

```bash
\list                                                   # 列出資料庫
\dt                                                     # 列出資料表
\d+ public.user                                         # 列出資料表綱目
ALTER TABLE "public.user" ADD COLUMN organ text;        # 增加欄位
ALTER TABLE "public.user" ALTER COLUMN organ TYPE text; # 改變欄位型態
\connect ckan_default                                   # 變更目前所在資料庫
```

* 增加欄位

```bash
# 登入 postgresql
$ psql -U ckan_default

# 增加 organ 欄位
ALTER TABLE "public.user" ADD COLUMN organ TYPE text;
```









