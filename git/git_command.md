# git 常用指令

<script type="text/javascript" src="../js/general.js"></script>

###git 管理環境
---

* git 儲存庫創立

```Bash
# 創造準備使用 git 的工作目錄
mkdir <folder>

# 進入此工作目錄
cd <folder>

# 創立 git 儲存庫
# -- bare : 裸儲存庫
git init [--bare]
```

* git 儲存庫環境管理

```Bash
# 儲存庫狀態
# -s : 精簡版呈現
git status [-s]

# 版本查詢
git --version

# 重新封裝老舊檔案
# --prune : 並清空垃圾或殘留檔案
git gc [--prune]

# 檢查 git 維護下的檔案系統是否完整
git fsck
```

###取得、回復或同步儲存庫
---

```Bash
# 自裸儲存庫取得一份致當前(現在)目錄
git clone [Repo_URL]
```

###提交至儲存庫
---

```Bash
# 加入變更後的檔案準備提交
# . : 所有檔案皆加入
# <file> : 僅加入此資料
git add [.|<file>]

# 提交標題
# -m "message" : 提交時的標題
git commit -m "message"
```






