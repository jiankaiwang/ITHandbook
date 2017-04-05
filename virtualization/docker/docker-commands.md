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

# 刪除鏡像
# 刪除虛懸鏡像 : $(docker images -q -f dangling=true) 
docker rmi <Repository>:<Tag>
docker rmi $(docker images -q -f dangling=true)
```

### Containers
---

```bash
# 以鏡像為基礎運行一個容器
# -i : interactive 介面交互操作
# -t : terminal
# --rm : 容器關閉後隨即刪除
# --name : 指定容器一個名稱
# Exec : 執行指令
# 範例 :
# docker run -it --rm
docker run [-i] [-t] [--rm] [--name <name>] <Repository>:<Tag> <Exec>

# 移除終止的容器
# container Sha/Name : 容器　SHA 碼或是名稱
docker rm <container Sha/Name>
```






