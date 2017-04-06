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

# 刪除鏡像
# 刪除虛懸鏡像 : $(docker images -q -f dangling=true) 
docker rmi <Repository>:<Tag>
docker rmi $(docker images -q -f dangling=true)
```

### Dockerfile
---


### Containers
---

```bash
# 以鏡像為基礎運行一個容器
# -i : interactive 介面交互操作
# -t : terminal
# --rm : 容器關閉後隨即刪除
# --name : 指定容器一個名稱
# Exec : 執行指令
# -d : run on the daemon (background)
# -p : Port forwarding
docker run [-i] [-t] [--rm] [--name <name>] <Repository>:<Tag> <Exec>
docker run [-d] [-p <host Port>:<container Port>] <Repository>:<Tag> <Exec>

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






