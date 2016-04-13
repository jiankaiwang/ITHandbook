# 使用者管理

<script type="text/javascript" src="../gitbook/app.js"></script>
<script type="text/javascript" src="../js/general.js"></script>

一個開放資料平台的核心便是平台使用者，CKAN 預設便分成 3 類使用成員。

###預設使用者群組 
---

ckan 預設將 ckan 使用者分成 3 組

1. 系統管理員 (具有最大權限) : 具備能新增組織、群組功能，且能指派成員為哪一個組織、群組，並對其有權限管理能力。

2. 資料提供者 (ckan 中用組織的角色) : 提供所有資料來源的角色。

3. 消耗資料與加值資料者 (ckan 中為群組的角色) : 使用平台中資料的角色，能對不同組織的資料進行合併成一個群組。

其中第 1 類系統管理員的設置需要透過指令式進行指派，此與「安裝」 -> 「新增 CKAN 系統管理者」的指令相同，如下；

```Bash
# 假設要新增的系統管理員帳號為 jkw
# 之後便依程式執行進行密碼設定
(pyenv) $ paster --plugin=ckan sysadmin add jkw -c /etc/ckan/default/development.ini
```