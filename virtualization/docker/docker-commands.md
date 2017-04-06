# Docker Commands

<script type="text/javascript" src="../js/general.js"></script>

### Images
---

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
docker images [-a] [-q] [-f dangling=true] [Repository name]
docker images [-f [since=<Repository>:<Tag>|label=<label name>]]
docker images [--format "<regular>"]

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

# 建立不需進行打包入 Docker 進行建構的忽略規則，類似 .gitignore
touch .dockerignore
vim .dockerignore

# 刪除鏡像
# 刪除虛懸鏡像 : $(docker images -q -f dangling=true) 
docker rmi <Repository>:<Tag>
docker rmi $(docker images -q -f dangling=true)
```

### Dockerfile
---

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
```

### Containers
---

```bash
# 以鏡像為基礎運行一個容器
# options
#   |- -i : 介面交互操作
#   |- -t : terminal
#   |- --rm : 容器關閉後隨即刪除
#   |- --name : 指定容器一個名稱
#   |- -d : run on the daemon (background)
#   |- -p : Port forwarding
#   |- -v : 掛載資料卷
#     |- volName : 資料卷名稱
#     |- path : 容器掛載位置
# Exec : 執行指令
docker run [options] <Repository>:<Tag> <Exec>
docker run [-i] [-t] [--rm] [--name <name>] <Repository>:<Tag> <Exec>
docker run [-d] [-p <host Port>:<container Port>] <Repository>:<Tag> <Exec>
docker run [-v <volName>:<path>] <Repository>:<Tag> <Exec>

# 進入在背景運行的容器
# -i : 交互操作
# -t : 終端機
# 範例 :
# docker exec -it webserver bash
docker exec [-i] [-t] <sha/name> <exec>

# 容器儲存層變動紀錄
docker diff <sha/name>

# 將儲存層合併入鏡像層成為新的鏡像
# options 如下
#   |- 作者 : --author <Name <Email>>
#   |- 訊息 : --message <info>
docker commit [options] <Container SHA/NAME> [<Repository>[:Tag]]

# 移除終止的容器
# container Sha/Name : 容器　SHA 碼或是名稱
docker rm <container Sha/Name>
```






