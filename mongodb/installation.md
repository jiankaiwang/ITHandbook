# Installation & Activation

## Windows

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

## Linux

* Refer to the [webpage](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/).

* Procedures

```bash
# check glibc version (>= 2.23)
$ ldd --version

# import the public key
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6

# create a list file for MongoDB
# use ubuntu 16.04 as an example
$ echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list

# reload the package
$ sudo apt-get update

# install the mongodb
$ sudo apt-get install -y mongodb-org
```

* NAT Port forwarding (must be done if you use VM)

```bash
# edit the configuration file
$ sudo vim /etc/mongod.conf

# add binding IP
# default IP in VirtualBox is 10.0.2.15
# network interfaces
net:
  port: 27017
  bindIp: 127.0.0.1,10.0.2.15
```

* Authorization

```javascript
# login the mongod server by the mongo client
# create a admin
use admin
db.createUser(
  {
    user: "myUserAdmin",
    pwd: "abc123",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)

# create a client
use test
db.createUser(
  {
    user: "myTester",
    pwd: "xyz123",
    roles: [ { role: "readWrite", db: "test" },
             { role: "read", db: "reporting" } ]
  }
)
```

```bash
# start the mongod server
$ mongod --auth --port 27017 --dbpath /data/db1

# or add the setting to conf file and run without additional parameters
$ sudo vim /etc/mongod.conf

# add the following code
security:
    authorization: enabled
```

```bash
# login the server as account admin
$ mongo --port 27017 -u "myUserAdmin" -p "abc123" --authenticationDatabase "admin"

# login the server as account myTester
$ mongo --port 27017 -u "myTester" -p "xyz123" --authenticationDatabase "test"
```

```javascript
# switch to the authorization database
use test
db.auth("myTester", "xyz123" )
```





