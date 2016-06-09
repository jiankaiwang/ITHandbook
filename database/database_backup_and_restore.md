# Database Backup and Restore

<script type="text/javascript" src="../js/general.js"></script>

###備份 mysql database
---

備份單一資料庫

```Sql
$ mysqldump --opt -u [uname] -p [pass] [dbname] > [backupDB.sql]
```
* uname: 資料庫使用者名稱
* pass: 使用資料庫的密碼
* dbname: 資料庫名稱
* backupDB.sql: 備份資料庫的名稱

備份全部資料庫

```Sql
$  mysqldump -u root -p --all-databases > alldb_backup.sql
```

###以壓縮方式備份 mysql database
---

使用 gzip 進行壓縮

```Sql
$ mysqldump -u [uname] -p[pass] [dbname] | gzip -9 > [backupDB.sql.gz]
```

解壓縮

```Sql
$ gunzip [backupDB.sql.gz]
```

###回復 mysql database
---

回覆入新的資料庫：

```Sql
$ mysql -u [uname] -p [db_to_restore] < [backupDB.sql]
```

回覆已存在的資料庫：

```
$ mysqlimport -u [uname] -p[pass] [dbname] [backupfile.sql]
```

###回復被壓縮的 mysql database
---

```Sql
$ gunzip < [backupfile.sql.gz] | mysql -u [uname] -p [pass] [dbname]
```






