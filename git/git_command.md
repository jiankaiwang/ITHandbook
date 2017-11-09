# git 常用指令

The following is the list for common git commands.

## git 管理環境

* git 工具組態設定

```Bash
# 組態設定
# --list : 列表
#  | --system : 列出系統層級，屬於本機所有使用者的預設値 (Git 安裝檔資料夾 etc/gitconfig)
#  | --global : 列出使用者層級設定，屬於使用者專屬的設定値 (登入帳號 home/directory 中 .gitconfig 檔)
#  | --local : 本 git 儲存庫的專屬設定 (資料夾下 .git 中 .config 檔案)
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

# 預設 push 方式
# simple : 僅更新目前分支至遠端資料庫
# matching : 更新所有曾經 push 至遠端資料庫的分支至遠端資料庫
git config <--system|--global|--local> push.default <simple|matching>

# 圖形化查看介面
# --all : 顯示所有 branch (含 detached branch)
gitk [--all]
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
# -u : 列出合併版本衝突的 hash object
git ls-files [-u]

# 儲存庫狀態，包含合併衝突等狀況
# -s : 精簡版呈現
git status [-s]

# 版本查詢
git --version

# 重新封裝老舊檔案
# --aggressive : 完整清理 (不建議經常進行)
# --prune : 並清空垃圾或殘留檔案
# --prune=<date> : default 2 weeks ago
# --auto : Git 自行判定是否需要清理
git gc [--aggressive|--auto|--prune|--prune=<date>|--no-prune]

# 檢查 git 維護下的檔案系統是否完整
git fsck
```

## 發布、取得、回復或同步儲存庫

```Bash
# 自儲存庫取得一份致當前(現在)目錄
# remote URL : 遠端資料庫位置
# local URL : 本地資料庫位置
# -c http.sslVerify=false : skip ssl check 
# --bare : 自一資料庫複製出一份裸資料庫，可做為遠端資料庫用
git clone <remote URL> <local URL>
git clone [-c http.sslVerify=false] [--bare] [project URL] <Repo_URL>

# 查看 commit 物件內容，包含 tree 物件
# -p : 查看此 commit 內容
# -t : 查看此 commit 類型
# branch : 分支名稱，如 master 。
# hash code : 透過 hash code 來找出 commit 時的內容
git cat-file [-p|-t] <branch|hash code>

# 查看該版本變更紀錄
git show <branch|hash code>

# 比對檔案或版本差異，比對「工作目錄」與「索引」之間的差異
# diff : git 原始工具比較
# difftool : 另外比對工具 (可以透過 git config 進行設定)
# commit : 比對儲存庫與該指定 commit 之間的差異
# --cached commit : 當前索引與指定 commit 之間的差異
# commit1 commit2 : 比對兩個不同 commit 的版本差異
git <diff|difftool> [commit|--cached commit]
git <diff|difftool> <commit1> <commit2>

# 加入遠端資料庫變數，需要透過 git remote update 更新與建立追蹤資訊
# variable : 變數名稱
# value : 値
# remote repository name : 遠端資料庫名稱，預設為 origin
# remote repository URL : 遠端資料庫位置
git remote add <variable> <value>
git remote add <remote repository name> <remote repository URL>
# 範例
git remote add origin git@github.com:xxx/yyy.git

# 修改遠端資料庫名稱
git remote rename <old name> <new name>

# 修改遠端資料庫位置
git remote set-url <remote repository name> <new URL>

# 更新 remote 資訊
# 包含由 local 資料庫複製出的遠端資料庫，兩者對應關係
git remote update

# 顯示遠端資料庫資訊
# show : 顯示完整遠端資料庫訊息
# -v : 清單顯示遠端資料庫
git remote [show <repository name>|-v]

# 發布到 remote repository
# -u : 紀錄 local / remote repository 分支對應關係
# remote repository name : 遠端資料庫名稱
# local branch : 要 push 到 remote 的 local 分支名稱
# --delete : 刪除遠端資料庫某一分支
git push [-u|--set-upstream] <remote repository name> <local branch>
git push <remote repository name> --delete <remote branch name>
```

## 儲存庫管理與提交

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
# . : 資料夾底下的新增與修改檔案將會加入儲存庫
# -u : 資料夾底下的刪除檔案於儲存庫中停止更新
# -A : 所有資料夾下的變更皆成立 (包含新增、修改與刪除的檔案)
git add [.|-u|-A] <.|<file>>

# 完整刪除實體資料
# file : 含有完整路徑的檔案名稱
# -r <folder> : 刪除資料夾
# --cached <file> : 刪除索引中檔案(即移除追蹤)，而不刪除實體檔案
git rm <file>
git rm -r <folder>
git rm --cached <file>

# 修改檔案名稱
# oriFileName : 原檔案名稱(包含路徑)
# modifiedFileName : 修改後檔案名稱(包含路徑)
git mv <oriFileName> <modifiedFileName>

# 查詢歷史紀錄
# -n <number> : 顯示近幾筆的歷史資料
# --graph : 圖式化表示
# --pretty=oneline : 精簡化歷史紀錄，僅呈現出主題與描述
# --abbrev-commit : 將 commit 物件的 hash code 進行縮減呈現
# -g : 顯示每一個 reflog 版本中完整的 commit 內容
# --all : 顯示所有分支 (含 detached branch)
# --decorate : 顯示主分支訊息
# --author : 顯示篩選提交者
# --after | --before : 依時間進行篩選
git log [-n <number>|--graph|--pretty=oneline|--abbrev-commit|-g|--shortstat|--numstat|--all|--decorate]
git log [--author=<word>|--after="YYYY-MM-DD HH:MM"|--before="YYYY-MM-DD HH:MM"]

# 依提交者的字母順序依序列出提交檔案
# --numbered : 依提交檔案數進行排序
# --summary : 簡短列出提交結果
git shortlog [--numbered|-n] [--summary|-s]

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
# --amend : 修改準備提交的 commit 內容
# -m "message" : 提交時的標題
# --author="name <email>" : 提交者姓名, 格式需符合
git commit [--amend] -m "message" [--author="name <name@eg.com>"]

# 重設儲存庫索引狀態
# --soft : 僅修正儲存庫的資料，不影響索引與資料夾中資料
# --mixed (預設) : 修正儲存庫與索引，但不影響資料夾中資料
# --hard : 並還原整個儲存庫
# "<reflog tag>" : 參考紀錄標籤 (reflog)，如 "HEAD@{0}" 等
# ORIG_HEAD : 固定字，指回到上一個版本
# filename : 檔案名稱
git reset [--soft|--mixed|--hard] ["<reflog tag>"|"ORIG_HEAD"] 
git reset head ["filename"]

# 修正(undo)版本歷史紀錄
# -n : 回復版本後，暫不 commit，之後只有 [--continue|--abort] 兩種選項
# --continue : 已完成所有操作，並建立一個新版本
# --abort : 放棄本次復原動作，所有邊更狀態還原
git revert [-n]
git revert [--continue|--abort]
```

## 分支

```Bash
# 創建一個新分支
# commit SHA或節點名稱參照 : 若無指定，則為最新的 commit
git branch <branch name> [commit SHA或節點名稱參照]

# 創建分支另一方法 (創建後直接轉換至該分支)
# -b : 創建並切換至某一個分支，若此分支已存在，則出現錯誤
# branch name : 分支名稱
git checkout -b <branch name> [commit SHA或節點名稱參照]

# 修改分支名稱
git branch -m <new name>

# 查詢目前分支，顯示出「參照名稱」(refs) 及目前主要分支為何 (前有 * 號)
# 皆位於 .git\refs\heads
# -d : 刪除分支，未合併時會出現錯誤
# -D : 強制刪除分支，不論是否有合併
# branch name : 分支名稱
# --list : 列出分支名稱
# searching name : 要搜尋的名稱
git branch [-d|-D <branch name>] [--list [searching name]]

# 救回被誤刪的分支
# obj id : object SHA1
git branch [<branch name> <obj id>]

# 轉換主/分支，或還原檔案某一版本
# -f : 強制轉換分支，
#   |- 若原分支 tracked 檔案有修改但未儲存至儲存庫時，會提示錯誤
#   |- 可以透過 -f 強制覆蓋，則該 tracked 檔案變更會遺失
# . : 用檔案庫直接覆蓋，避免不同分支不同內容但相同檔名下，有修改時的錯誤
# branch : 自主/分支名稱
# filename : 檔案名稱，並還原一個檔案
git checkout [-f|.] <branch> [<filename>]

# 將分支 branch name 合併入現在分支中
# --no-ff : 執行 3-way merge，merge 時會產生一個新的 commit 節點
# --abort : 放棄本次 merge，資料庫與檔案皆回到 merge 前
git merge [[--no-ff] <branch name>] [--abort]

# 合併某一 commit 入此分支
# -n : 不建立新節點
# --continue : 已修改完衝突點，繼續合併
# --abort : 放棄合併
git cherry-pick [[-n] <commit 節點>] [--continue|--abort]

# 回復至某一節點或參考名稱的「前一版本」
# 不同於 checkout, revert 不會刪除檔案庫內容, 而會產生新 commit 節點
# 可能會出現衝突問題，透過 git mergetool 與 git revert --continue 處理
git revert [<commit 節點|參考名稱>|--abort]

# 持續性合併 master 或其他分支以維持架構
# 但會破壞分支的 commit 歷史紀錄
# 可能會出現衝突問題，透過 git mergetool 與 git revert --continue 處理
git rebase [<master|分支名稱>|--continue|--abort]

# 從遠端資料庫取得資料，但尚未更新分支內容
# --all : 更新所有分支
git fetch [--all]

# 將遠端資料庫合併入現在儲存庫
# 預設 git pull = git fetch + git merge
# --all : 一次取得該分支的所有資料
# -r | --rebase : 用 rebase 方式取代原本 git pull 中的 git merge 方式
git pull [--all] [-r|--rebase]
```

## 檔案管理

```bash
# 搜尋字串
# -i : 不分大小寫
# -l : 列出檔案
# -c : 共幾行數
# -e : 多筆字串搜尋
# --and : 搜尋邏輯操作子
# commit : 針對的 commit 版本
git grep [-c|-l|-i] <searching> [commit]
git grep -e <searching-1> [[--and] -e <searching-2>] [commit]

# 編輯人員
# -L : 限定 line 範圍
# start : 啟始行數
# end : 結束行數
# filename : 檔案名稱
git blame [-L [start,end|end]] <filename>
```

## Git Server

```bash
# 於目前位置建立 git server
# 目前位置可以是 git 工作資料夾或是 bare 型態資料庫
# --export-all : 開放目前位置底下所有 git 資料庫
#  |- 若不想開放所有資料庫，於要開放資料庫底下新增名為 git-daemon-export-ok 的空檔案
# --enable=receive-pack : 允許修改資料庫
# --base-path : 要開放資的資料夾路徑
# --port : 要監聽的網路 port，預設是 9418
#  |- 透過 git clone git://URL or IP:port/repository path
# --verbose : 運作時顯示重要訊息
# & : 背景運行
# troubleshooting
#   |- hang on writing object(100%) : git config --global sendpack.sideband false
git daemon [--export-all] [--enable=receive-pack] [--base-path='資料夾路徑'] 
git daemon [--port=portNumber] [--verbose] [&]
```



