# git 常用指令

<script type="text/javascript" src="../js/general.js"></script>

###git 管理環境
---

* git 工具組態設定

```Bash
# 組態設定
# --list : 列表
#  | --system : 列出系統層級，屬於本機所有使用者的預設値
#  | --global : 列出使用者層級設定，屬於使用者專屬的設定値
#  | --local : 本 git 儲存庫的專屬設定
git config [--list [--system|--global|--local]]

# 取得組態的値
# parameter : 要查看的參數名稱
# 若不傳入任何層級，則可以取得目前組態的綜合設定
git config [--system|--global|--local] <parameter>

# 設定組態
# parameter : 要改變組態中的項目
# value : 改變組態的値
git config <--system|--global|--local> <parameter> <value>

# 開啟編輯整個組態檔
git config --edit <--system|--global|--local>

# 刪除特定層級中的選項
git config --unset <--system|--global|--local> <parameter>

# 設定特定層級中工作指令別名
# git_original_command : git 原指令，如 commit
# self_defined_command : 自定義指令，如 ct
git config <--system|--global|--local> alias.<self_defined_command> <git_original_command>

# 指定特定層級預設文字編輯器
# editor_app_name : 編輯器名稱如 "\"C:\Program Files (x86)\Notepad++\notepad++.exe\"" (notepad++)
git config <--system|--global|--local> core.editor <editor_app_name>

# 設定歷史紀錄的過期時間
# 預設 90 天，commit 不在分支線上則僅有 30 天
git config <--system|--global|--local> <gc.reflogExpire|gc.reflogExpireUnreachable> <"90 days"|"never">
```

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

# 儲存庫狀態，包含合併衝突等狀況
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
# -p : 查看此 commit 內容
# -t : 查看此 commit 類型
# branch : 分支名稱，如 master 。
# hash code : 透過 hash code 來找出 commit 時的內容
git cat-file [-p|-t] <branch|hash code>

# 查看該版本變更紀錄
git show <branch|hash code>

# 比對檔案或版本差異，比對「工作目錄」與「索引」之間的差異
# commit : 比對儲存庫與該指定 commit 之間的差異
# --cached commit : 當前索引與指定 commit 之間的差異
# commit1 commit2 : 比對兩個不同 commit 的版本差異
git diff [commit|--cached commit]
git diff <commit1> <commit2>

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
# 「一般參照」則是指向一個 Git 物件的「絕對名稱」，絕對名稱為 hash code
# branch : 分支 ref 名稱，如 master 或 new_branch 等
# hash : 要修改的 commit 絕對名稱，如 aa3b 等
git update-ref <branch> <hash>

# 加入自訂符號 (symbolic-ref) 參照
# 「符號參照」會指向另一個「一般參照」
# ref_from : 如 ref/fe2_init
# ref_to : 如 ref/heads/fe2
git symbolic-ref <ref_from> <ref_to>

# 相對名稱表示
# 數目 : 該物件的前幾個版本
# ~ : 第一個上層 commit 物件
# ^ : 擁有多個上層(分支合併後) commit 物件時，要代表第幾個第一代的上層物件
# e.g. C^3~3 : C commit 物件第 3 個分支的上三層物件
git rev-parse <參照名稱|絕對名稱><~|^><數目>

# 顯示標籤 (tags)
# tag_name : 標籤的名稱
# -d : 刪除標籤
# object_id : 要標示的 hash code
# -a : 建立標示標籤 (annotated tag)
# desc : 建立標示標籤的描述
git tag [<tag_name>|<tag_name> -d|<tag_name> <object_id>]
git tag [<tag_name> -a -m "<desc>"|<tag_name> <object_id> -a -m "<desc>"]

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
# -g : 顯示每一個 reflog 版本中完整的 commit 內容
git log [-n <number>] [--pretty=oneline] [--abbrev-commit] [-g]

# 查詢版本紀錄變化歷程 (自最新開始回推)，不會上傳至遠端儲存庫
# 查詢特定版本或分支的歷史變化紀錄，如 HEAD|master|<branch name> 等
# delete : 刪除特定歷史紀錄
# expire : 刪除歷史紀錄
# --expire : 設定時間或日期
# --all : 要刪除的對象
git reflog [delete] [HEAD|master|<branch name>]
git reflog [expire] [--expire=now] [--all]

# 建立暫存版本
# 將所有已列入追蹤 (tracked) 的檔案建立暫存版
# -u : 包括所有已追蹤或未追蹤的檔案，皆建立暫存版
# message : 暫存版本的註解
git stash save [-u] [message]

# 查看目前暫存版本清單 
git stash list 

# 取出最新的暫存版本
# pop : 完整取出，並將 stash 暫存版本刪除，移除清單
# apply : 取出暫存版本，但並不移除暫存資料，仍保留於清單中
# apply <stash version> : 僅取出某一特定暫存版本
git stash [pop|apply ["<stash version>"]]

# 移除暫存檔
# clear : 清除所有暫存檔版本
# drop : 清除某一特定的暫存檔
git stash [clear|drop "<stash version>"]

# 提交版本紀錄
# -m "message" : 提交時的標題
git commit -m "message"

# 重設儲存庫索引狀態
# --hard : 並還原整個儲存庫
# "<reflog tag>" : 參考紀錄標籤 (reflog)，如 "HEAD@{0}" 等
git reset ["<reflog tag>"] [--hard]
```

###分支
---

```Bash
# 查詢目前分支，顯示出「參照名稱」(refs) 及目前主要分支為何 (前有 * 號)
# 皆位於 .git\refs\heads
git branch

# 轉換主/分支
# branch : 自主/分支名稱
# filename : 檔案名稱，並還原一個檔案
git checkout <branch> [<filename>]

# 創建分支
# -b : 創建並切換至某一個分支，若此分支已存在，則出現錯誤
# branch name : 分支名稱
git checkout -b <branch name>

# 將分支 branch name 合併入現在分支中
git merge <branch name>

# 分支合併
git branch
```



