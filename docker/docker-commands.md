# Docker Commands

## Images

```bash
# 取得鏡像
# options : 選項
#   |- 如 --help
# Docker Registry URL : 預設為 Docker Hub
#   |- 如 IP/URL:Port
# Repository : [source/]<名稱>
#   |- 若不指定 source，則為官方 (library)
# Tag : 多為版本，若不指定，則為 latest
docker pull [options] [Docker Registry URL] <Repository>:<Tag>

# 列出鏡像
# -a : 顯示中間層鏡像
# -q : 僅顯示鏡像 SHA
# -f dangling=true : 列出所有虛懸鏡像 TAG 為 <none>
# Repository name : 僅顯示某一資料庫的鏡像
# -f : 篩選器
# label name : 鏡像標籤名
# --format : 依格式顯示
#   |- regular 定義格式，如 table {{.ID}}\t{{.Repository}}\t{{.Tag}}
# --digests : 摘要 (SHA)
docker images [-a] [-q] [-f dangling=true] [Repository name]
docker images [-f [since=<Repository>:<Tag>|label=<label name>]]
docker images [--format "<regular>"] [--digests]

# 查看鏡像 commit 版本歷史
docker history <Repository>:<Tag>

# 對 Dockerfile 進行建構
# -t : 指定新建構的鏡像名稱
# . : 表示將當前目錄打包送至 Docker Engine 進行建構
# -f : 指定要進行建構鏡像的路徑及檔名
# URL : 支援直接自 URL 進行建構，如 git repository
# gzip|bzip2|xz : 支援來自壓縮檔的建構
# - < : 表式來字標準輸入
docker build <[-t <Repository>:<Tag> .|-f <path/filename>|<URL>|<gzip|bzip2|xz>| - < <fileName>]>
# 支援 pipeline 方式進行建構
# 但此方式不支援如 COPY 等上下文的建構方式
cat Dockerfile | docker build -

# 直接匯入一個壓縮包形成鏡像
# Tar : 壓縮檔，如 gzip, bzip2 等
# URL : 連結
# - : 標準輸入
docker import [options] <Tar|URL|-> [<Repository>[ :<Tag>]]

# 建立不需進行打包入 Docker 進行建構的忽略規則，類似 .gitignore
touch .dockerignore
vim .dockerignore

# 保存鏡像，可以配合 pipeline
# pipeline:
#   |- 如 " | gzip > fileName.tar.gz "
docker save <Repository>[ :<Tag>] [pipeline]

# 載入鏡像
# -i : 輸入字串
# 範例 :
# docker save <镜像名稱> | bzip2 | pv | ssh <用户名>@<主机名> 'cat | docker load'
docker load -i <fileName>

# 刪除鏡像
# 刪除虛懸鏡像 : [-f dangling=true]
docker rmi <<Repository>:<Tag>|<SHA>>
docker rmi $(docker images -q [Repository Name|-f dangling=true])
```

## Dockerfile

```bash
# 指定基礎鏡像
# scratch : 空白鏡像，後續第一項指令作為第一層
From <Repository>:<Tag>
From scratch

# 將 local 當時上下文 (Context) 目錄的文件複製進鏡像內的位置
# 目標路徑可以不需事先創建
# Source : 來源檔案，當時上下文目錄檔案
# Target : 目的位置，鏡像內絕對位置
# 範例 : Copy package.json /usr/src/app/path
Copy <Source>[ <Source 2> [<Source 3>]] <Target>

# 將當時上下文 (Context) 目錄的 local 文件加入進鏡像
# Add 相較 Copy 有更多的功能，如自解壓縮等，但語義在不同來源上有很多差異，並不建議使用
Add <Source> <Target>

# 執行指令，執行完後即 commit 成新一層
# 寫法應為一次 Run 一整個相關操作的步驟，且清除無關文件
# shell : 即 batch 指令
# exec : 類似函式調用方式，即 ["可執行腳本", "傳入參數1", "傳入參數2"]
# 範例 :
# RUN buildDeps='gcc libc6-dev make' \
#     && 'apt-get update' \
#     && apt-get install -y $buildDeps \
#     && apt-get purge -y --auto-remove $buildDeps
Run <shell|exec>

# 執行指令，不同於 Run 的是 Cmd 為容器運行時執行指令
# Docker 運行指令
# shell : 即 batch 指令
# exec : 類似函式調用方式，即 ["可執行腳本", "傳入參數1", "傳入參數2"]
# params : ["參數1", "參數2"]
#   |- 如果指令為 shell 格式，則命令會被包裝成 sh -c 執行，且格式被解析為 JSON 數組
#   |- 如 echo $HOME 指令被解析成 CMD ["sh", "-c", "echo $HOME"]
Cmd <shell|exec|params>

# 執行指令，設定容器組態來準備運行其他指令，與 Cmd 相同在容器運行時執行指令
# 不同於 Cmd，Entrypoint 讓鏡像變成像命令一樣使用，且可以運行 Cmd 前作一些準備工作
# shell : 即 batch 指令
# exec : 類似函式調用方式，即 ["可執行腳本", "傳入參數1", "傳入參數2"]
Entrypoint <shell|exec> 

# 設定環境變數，或如 batch 中宣告之變數
# key : 變數名
# value : 設定的値
Env <key> <value>
Env <key1>=<value1>[ <key2>=<value2>[ <key3>=<value3>]]

# 建構環境變數
# 與 Env 不同的是建構鏡像後 Arg 所建立的變數於容器運行不會存在
# 但 docker history 指令仍可以看到
# 可以用 docker build --build-arg <key1>=<value1> 於建構時進行覆蓋
Arg <key1>=<value1>

# 定義匿名資料卷
# 預先指定某些目錄掛載為匿名卷，即使運行終使用者忘記掛載，也不會向容器寫入大量數據
# Path : 容器中的路徑，如 /data，容器運行時，任何向 /data 寫入訊息皆不會記錄進儲存庫
Volume <Path>
Volume ["<Path1>", "<Path2>", ...]

# 聲明容器使用端口，並不等於和 Host Port 對映
# Port : 端口，如 80
Expose <port>[ <port2>]

# 改變之後各層工作目錄位置
# Path : 目錄位置，若無會自動建立
Workdir <Path>

# 改變之後各層當前用戶
# 轉換身份，建議用 gosu 指令
# Name : 用戶名，需事先建立 (e.g. useradd)
User <Name>

# 檢查容器健康狀況，僅能出現一次，多寫僅最後一次指令生效
# --interval=<Peroid> : 檢查狀況的期間
# --timeout=<Time> : 執行檢查期間，超過視成失敗
# --retries=<Count> : 連續幾次失敗後，檢查視為 unhealthy
# shell : 即 batch 指令
# exec : 類似函式調用方式，即 ["可執行腳本", "傳入參數1", "傳入參數2"]
# Cmd 指令回傳値代表檢查狀況，0 : 成功，1 : 失敗，2 : 保留 (建議不使用)
# 可以透過 docker ps -a 來看目前檢查狀況
# 亦可以透過 docker inspect <sha/name> | python -m json.tool
Healthcheck [--interval=<Peroid>|--timeout=<Time>|--retries=<Count>] Cmd <Shell|Exec>

# 僅於基礎鏡像才執行的指令
Onbuild <Cmd|Run|Copy| ...>
```

## Containers

```bash
# 查看目前所有容器資訊
# -a : 所有容器，不論是否運行中
# -q : 僅顯示容器摘要碼
docker ps [-a|-q]

# 以鏡像為基礎運行一個容器
# options
#   |- -i : 介面交互操作
#   |- -t : terminal
#   |- --rm : 容器關閉後隨即刪除
#   |- --name : 指定容器一個名稱
#   |- -d : run on the daemon (background)
#   |- -p : Port forwarding，指定端口，可以指派多組
#     |- binding-IP : 要綁定的 IP 或 URL (例如 127.0.0.1)，未填則默認所有位置
#   |- -P : Port forwarding，非指定端口，隨機分派宿主端口
#   |- -v : 掛載資料卷
#     |- volName : 資料卷 Host 位置
#     |- path : 容器掛載位置
#     |- auth : 容器讀取權限，如 ro (read-only)
#   |- --volumes-from : 掛載來自其他 container 的資料卷 (資料共用)
#   |- --link : 容器間相互連接，可以透過 
#               (1) 容器內 cat /etc/hosts 查看 (下 --link 指令的容器)
#               (2) 於 docker run 指令時顯示環境變數 env 即可
#     |- Sha/Name : 要連接的 container Sha 或 name
#     |- alias : 此連線的別名
# Exec : 執行指令
docker run [options] <Repository>:<Tag> [Exec]
docker run \
    [-i] [-t] [--rm] [--name <name>] [-v <volName>:<path>[:auth]] \
    [--volumes-from <sha/name>] [-d] [-P] \
    [[-p [<binding-IP>:]<host Port>:<container Port>[:<TCP|UDP>]]*]\
    [--link <sha/name>:<alias>]\
    <Repository>:<Tag> <Exec>

# 啟動已終止的容器
# Sha : 容器摘要碼
# Name : 容器名稱
docker start <Sha|Name>

# 進入在背景運行的容器
# -i : 交互操作
# -t : 終端機
# 範例 :
# docker exec -it webserver bash
docker exec [-i] [-t] <sha/name> <exec>

# 進入在背景運行的容器，和 exec 不同的是
# |- attach 為唯一執行個體，僅管多個 attach 仍會同步內容
# |- attach 僅在容器啟動時工作目錄為 /bin/bash 下才能使用，否則需用 exec 轉換
docker attach <Sha|Name>

# 終止容器運行
# Sha : 容器摘要碼
# Name : 容器名稱
docker stop <Sha|Name>

# 重啟容器運行
# Sha : 容器摘要碼
# Name : 容器名稱
docker restart <Sha|Name>

# 容器儲存層變動紀錄
docker diff <sha/name>

# 將儲存層合併入鏡像層成為新的鏡像
# options 如下
#   |- 作者 : --author <Name <Email>>
#   |- 訊息 : --message <info>
docker commit [options] <Container SHA/NAME> [<Repository>[:Tag]]

# 查看目前容器狀況
# --format : 輸出格式，例如 {{json .State.Health}}
docker inspect --format <format> <sha/name> 

# 獲取容器輸出的訊息，包含背景運行的輸出
# Sha : 容器摘要碼
# Name : 容器名稱
docker logs <Sha|Name>

# 查看容器映射宿主網路端口狀況
docker port <Sha|Name>

# 導出容器，不同於 Commit 為 export 並不會儲存成新的鏡像
docker export <Sha|Name>

# 導入容器快照成鏡像
# 注意 :
# |- 若用 docker export 的容器快照為來源，則 docker import 與 docker load 匯入結果不同
# |- docker load 會僅載入鏡像部分，因 docker export 並沒有 commit 的結果，
# |- docker load 會損失容器儲存層(尚未 commit 入鏡像部分會遺失)
# - 為標準輸入，常配合 pipeline 使用
# |- 如 cat ubuntu.tar | docker import - ubuntu:latest
docker import <URL|Path|-> <Repository>[:<Tag>]

# 移除終止的容器
# container Sha/Name : 容器　SHA 碼或是名稱
# -f : 刪除運行中的容器
# -v : 刪除資料卷
# $(docker ps -a -q) : 刪除所有容器，默認不刪除運行中容器
docker rm [-f|-v] <container Sha/Name>
docker rm $(docker ps -a -q)
```

## Repository

```bash
# 登入 Repository Registry (如 Docker Hub)
# 帳戶訊息存放於本地目錄的 .dockercfg
docker login

# 搜尋倉庫中的鏡像
# stars=N : 搜尋幾顆星以上的儲存庫
docker search [--filter=<stars=N>] <Repository>

# 將鏡像推送到 Repository Registry
# Repository : 儲存庫名，可能為軟體名或使用者名
# Tag : 標籤，可能為版本或軟體名
docker push <Repository>/<Tag>

# Docker hub 支援 Automated Builds (自動創建)
# 目前支援 Github 與 Bitbucket，當有新 commit 時，會自動創建

# 構建私有的鏡像倉庫，背景運行及映射 port 至宿主 OS
# docker-registry 為 docker 官方提供的工具
# <host-port>:<container-port> : 映射容器端口至宿主端口
# 範例：
# sudo docker run -d -p 5000:5000 -v /opt/data/registry:/tmp/registry registry
#   |- 預設倉庫被創建於容器的 /tmp/registry 底下
#   |- 透過 -v 將上傳的鏡像放置於本地 /opt/data/registry 位置
# Private Docker Hub 服務確認範例
#   |- 取得 Docker-API-Version : 
#      curl -v http://localhost:5000/v2/
#   |- 取得 ubuntu/latest (已 push 成功後) 的資訊 :
#      curl http://localhost:5000/v2/ubuntu/manifests/latest
docker pull registry:latest
docker run -d \
    [-p <host-port>:<container-port>] [-v <local-path>:<contaniner-path>] \
    registry 
    
# 標記要上傳至 Private Docker Hub 的 image
# Local-Repository : 本地鏡像
# Hub <IP|URL> : 私有 Docker 註冊器 IP 或 URL
# 範例：
# |- docker tag hello-world:latest localhost:5000/hw:latest
docker tag <Local-Repository>[:<Tag>] <Hub <IP|URL>[:Port]/[<User|Repository>[:<Tag>]]>

# 上傳已標記的鏡像至 Private Docker Hub
# 範例：
# |- docker push localhost:5000/hw:latest
# 查看倉庫中鏡像：
# |- $ curl -v http://localhost:5000/v2/<name>/manifests/<reference>
# |- 範例 : curl -v http://localhost:5000/v2/hw/manifests/latest
docker push <Tagged-Image>

# 自 Private Docker Hub 下載已標記的鏡像
# 範例：
# |- docker pull localhost:5000/hw:latest
docker pull <Tagged-Image>
```










