# 資料庫的使用者

<script type="text/javascript" src="../js/general.js"></script>

###前提
---
* 大部分的資料庫使用涉及資料庫的四個基本操作，Create、Read(Query)、Update 及 Deiete，此類型的資料庫使用者多為擁有者角色。

* 本文下例建立在幾個前提之下：
  * 已有資料庫 (Database) 且此資料庫中含有資料表 (Table)
  * 含有一個能進入資料庫伺服器的管理員
  * 部分操作在 SQL Server 2014 Management Studio 上完成

###先創立一個可以登入伺服器的使用者
---
* 必須先建立一個能夠登入此資料庫伺服器的使用者，此時此使用者並無指定有哪一資料庫的權限。

* 進入 SQL Server 2014 Management Studio 後，對登入的資料庫伺服器點擊右鍵 > 新增查詢，然後鍵入下方 SQL 指令

```Sql
/* 假設登入帳號為 dbuser，密碼亦為 dbuser */
CREATE LOGIN dbuser 
	WITH PASSWORD = 'dbuser' 
GO
```

###建立可以使用此伺服器上資料庫的使用者
---
* 進入 SQL Server 2014 Management Studio 後，對該資料庫伺服器點擊右鍵 > 新增查詢，然後鍵入下方 SQL 指令

```Sql
/* 
* 先連結能使用此資料庫的帳號，此帳號必須能登入此伺服器
* USER dbuser 指登入此資料庫的名稱，而 LOGIN dbuser 則是登入伺服器的名稱
*/
CREATE USER dbuser FROM LOGIN dbuser;

/* 
* 指定此帳號在資料庫中的權限，此例為 database owner
*/
EXEC sp_addrolemember N'db_owner', N'dbuser'
GO
```
