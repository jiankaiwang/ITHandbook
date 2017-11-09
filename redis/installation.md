# Redis

* refer to the [page](https://redis.io/topics/quickstart)

## Install on Ubuntu 16.04

* install steps

```bash
$ wget http://download.redis.io/redis-stable.tar.gz
$ tar xvzf redis-stable.tar.gz
$ cd redis-stable
$ make

# install at least tcl 8.5 version
$ sudo apt-get install tcl8.5-dev

# check whether the build works
$ make test
```

* all binaries built completely would exist on **redis-stable/src** folder

| binary | description |
|--|--|
| **redis-server** | the Redis Server itself |
| **redis-sentinel** | the Redis Sentinel executable (monitoring and failover) |
| **redis-cli** | the command line interface utility to talk with Redis |
| **redis-benchmark** | used to check Redis performances |
| **redis-check-aof** and **redis-check-dump** | useful in the rare event of corrupted data files |

* Copy both Redis server and the command line interface to the proper places

```bash
$ sudo cp src/redis-server /usr/local/bin/
$ sudo cp src/redis-cli /usr/local/bin/
```

## Start and Login the server

* start the server

```bash
# without configuration
$ redis-server

# with configuration
$ redis-server /path/to/your/config/file
```

* check the server is still available

```bash
# this should return a message "PONG"
$ redis-cli ping
```

* login the server

```bash
$ redis-cli
```

## Basic Data Types

| type | description |
|--|--|
| **Binary-safe strings** | Redis keys are binary safe, from string data type to image data type. (max size : 512 MB) |
| **Lists** | collections of string elements sorted according to the order of insertion |
| **Sets** | collections of unique, unsorted string elements |
| **Sorted sets** | similar to Sets but where every string element is associated to a floating number value, called score |
| **Hashes** | very similar to Ruby or Python hashes |
| **Bit arrays** (or **simply bitmaps**) | an array of bits |
| **HyperLogLogs** | used to check Redis performances |

## Configure Redis

* Default conf file path : **/install/root/path/redis_stable/redis.conf**
    * bind 127.0.0.1 : default bind ip or 0.0.0.0 for all interfaces
    * port 6379 : default service port
    * requirepass : modify foobared with "examplePWD"
    * daemonize : modify no with yes (standalone), but keep no in daemon (background service)
    * stop-writes-on-bgsave-error : modify to no to avoid MISCONF issue.

## Run at startup as the service

* Create a configuration file

```bash
$ sudo vim /etc/systemd/system/redis.service
```

* Write the following content
    * **Notice the daemonize in the configuration must be no.**
    * the [Unit] section by adding a description and defining a requirement that networking be available before starting this service
    * the [Service] section, we need to specify the service's behavior. For security purposes, we should not run our service as root
    * the [Install] section, we can define the systemd target that the service should attach to if enabled

```conf
[Unit]
Description=Redis In-Memory Data Store
After=network.target

[Service]
User=redis
Group=redis
ExecStart=/usr/local/bin/redis-server /path/to/your/redis-stable/redis.conf
ExecStop=/usr/local/bin/redis-cli shutdown
Restart=always

[Install]
WantedBy=multi-user.target
```

* Create the Redis User, Group and Directories

```bash
sudo adduser --system --group --no-create-home redis
sudo mkdir /var/lib/redis
sudo chown redis:redis /var/lib/redis
sudo chmod 770 /var/lib/redis
```

* Control the service

```bash
# 服務管理
sudo systemctl start redis
sudo systemctl stop redis
sudo systemctl restart redis
sudo systemctl status redis

# 開機啟動
sudo systemctl enable redis
sudo systemctl disable redis
```








