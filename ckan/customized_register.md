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
ALTER TABLE "user" ADD COLUMN organ text;               # 增加欄位
ALTER TABLE "user" ALTER COLUMN organ TYPE text;        # 改變欄位型態
\connect ckan_default                                   # 變更目前所在資料庫
```

* 增加欄位

```bash
# 登入 postgresql
$ psql -U ckan_default

# 增加 organ 欄位
=> ALTER TABLE "user" ADD COLUMN organ text;

# 檢查是否新增欄位成功
=> \d+ public.user

# 查看目前所有使用者的資料
=> select * from public.user;

# 先對所有使用者加入 organ，假設為 eic
=> update public.user set organ = 'eic' where id = '' or 1 = 1;
```

### 加入自定義對 PostgreSQL 資料庫處理類別
---

* 參考 [Gitbook](https://jiankaiwang.gitbooks.io/seed/content/python/py2psqlpy.html)、或 [github](https://github.com/jiankaiwang/seed/blob/master/python/py2psql.py)。

* 將此類別加入預設 python library 中，並安裝 psycopg2，並記得於 virtualenv 中加入 psycopg2 (ckan 2.5.x 已上已預先安裝)

```bash
# python 2.7 函式庫預設位置
$ cd /usr/lib/python2.7/

# 一般環境下安裝 py2psql 套件
$ sudo pip install psycopg2

# 取得類別程式碼
$ sudo wget https://raw.githubusercontent.com/jiankaiwang/seed/master/python/py2psql.py
```






