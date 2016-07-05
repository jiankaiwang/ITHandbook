# git 常用指令

<script type="text/javascript" src="../js/general.js"></script>

###git 管理環境
---

* git 儲存庫創立

```Bash
# 查詢 git 指令
# command : 如 add, commit 等
git help <command>

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
# 列出檔案完整清單(包含路徑)，僅列出已儲存在索引中
git ls-files

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

###發布、取得、回復或同步儲存庫
---

```Bash
# 自裸儲存庫取得一份致當前(現在)目錄
git clone [Repo_URL]

# 查看 commit 物件內容，包含 tree 物件
# branch : 分支名稱，如 master 。
# hash code : 透過 hash code 來找出 commit 時的內容
git cat-file -p <branch|hash code>

# 查看該版本變更紀錄
git show <branch|hash code>

# 比對檔案或版本差異，比對「工作目錄」與「索引」之間的差異
# commit : 比對儲存庫與該指定 commit 之間的差異
# --cached commit : 當前索引與指定 commit 之間的差異
# commit1 commit2 : 比對兩個不同 commit 的版本差異
git diff [commit|--cached commit]
git diff <commit1> <commit2>

# 還原一個檔案
# branch : 自主/分支名稱
# filename : 檔案名稱
git checkout <branch> <filename>

# 加入遠端變數
# variable : 變數名稱
# value : 値
git remote add <variable> <value>
# 範例如下
git remote add <github_url> <remote github repository URL>

# 發布到 github
# branch : 主/分支名稱
git remote add origin git@github.com:xxx/yyy.git
git push -u origin <branch>
```

###儲存庫管理
---

```Bash
# 找出 blob 物件的 hash code
# file : 檔案名稱
git hash-object <file>

# 顯示目前的參照名稱內容
git show-ref

# 自訂參照符號
# branch : 分支 ref 名稱，如 master 或 new_branch 等
# hash : 要修改的 commit 絕對名稱，如 aa3b 等
git update-ref <branch> <hash>

# 加入自訂符號 (symbolic-ref) 參照
# ref_from : 如 ref/fe2_init
# ref_to : 如 ref/heads/fe2
git symbolic-ref <ref_from> <ref_to>

# 加入變更後的檔案準備提交
# . : 所有檔案皆加入
# <file> : 僅加入此資料
git add [.|<file>]

# 完整刪除實體資料
# file : 含有完整路徑的檔案名稱
# -r <folder> : 刪除資料夾
# --cached <file> : 刪除索引中檔案，而不刪除實體檔案
git rm <file>
git rm -r <folder>
git rm --cached <file>

# 修改檔案名稱
# oriFileName : 原檔案名稱(包含路徑)
# modifiedFileName : 修改後檔案名稱(包含路徑)
git mv <oriFileName> <modifiedFileName>

# 查詢歷史紀錄
# -n <number> : 顯示近幾筆的歷史資料
# --pretty=oneline : 精簡化歷史紀錄，僅呈現出主題與描述
# --abbrev-commit : 將 commit 物件的 hash code 進行縮減呈現
git log [-n <number>] [--pretty=oneline] [--abbrev-commit]

# 提交版本紀錄
# -m "message" : 提交時的標題
git commit -m "message"

# 重設儲存庫索引狀態
# --hard : 並還原整個儲存庫
git reset [--hard]
```

###分支
---

```Bash
# 查詢目前分支，顯示出「參照名稱」(refs) 及目前主要分支為何 (前有 * 號)
# 皆位於 .git\refs\heads
git branch
```



