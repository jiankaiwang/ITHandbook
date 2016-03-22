# 資料庫的使用者
###前提
---
* 大部分的資料庫使用涉及資料庫的四個基本操作，Create、Read(Query)、Update 及 Deiete，此類型的資料庫使用者多為擁有者角色。

* 本文下例建立在幾個前提之下：
  * 已有資料庫 (Database) 且此資料庫中含有資料表 (Table)
  * 含有一個能進入資料庫伺服器的管理員
  * 部分操作在 SQL Server 2014 Management Studio 上完成

###先創立一個可以登入伺服器的使用者
---
必須先建立一個能夠登入此資料庫伺服器的使用者，此時此使用者並無指定有哪一資料庫的權限。

```Sql
/* 假設登入帳號為 dbuser，密碼亦為 dbuser */
CREATE LOGIN dbuser 
	WITH PASSWORD = 'dbuser' 
GO
```

