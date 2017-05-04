# Installation & Activation

<script type="text/javascript" src="../js/general.js"></script>

### Windows
---

* 安裝 MongoDB Community Edition (MongoDB for Windows 64-bit)
   * 注意安裝路徑建議於 C:\Program Files\MongoDB\Server\3.2\

* 安裝完的 binary 執行檔說明如下

| Component Set | Binaries |
| -- | -- |
| Server | mongod.exe |
| Router | mongos.exe |
| Client | mongo.exe |
| MonitoringTools | mongostat.exe, mongotop.exe |
| ImportExportTools | mongodump.exe, mongorestore.exe, mongoexport.exe, mongoimport.exe |
| MiscellaneousTools | bsondump.exe, mongofiles.exe, mongooplog.exe, mongoperf.exe |


* 單次執行 MongoDB

```bash
# 啟動資料庫為 d:\test\mongodb\data 的伺服器
> "C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe" --dbpath d:\test\mongodb\data

# 連結此資料庫
> "C:\Program Files\MongoDB\Server\3.2\bin\mongo.exe"
```

* 設定 MongoDB 服務

1. 創造資料夾放置於資料與紀錄用 log

```bash
# 資料夾
> mkdir c:\data\db

# 檔案
> echo '' > c:\data\sys.log
```

2. 創造一個組態檔 (mongod.cfg) 放置於 c:\data\mongod.cfg

```config
systemLog:
    destination: file
    path: c:\data\sys.log
storage:
    dbPath: c:\data\db
```

3. 安裝服務

```bash
> "C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe" --config "c:\data\mongod.cfg" --install
```

4. 啟動服務

```bash
> net start MongoDB
```

5. 關閉服務

```bash
> net stop MongoDB
```

6. 移除服務

```bash
> "C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe" --remove
```

