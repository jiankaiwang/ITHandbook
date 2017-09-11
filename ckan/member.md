# 使用者管理

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
# 假設要新增的系統管理員帳號為 sd1
# 執行下列指令後便依程式執行進行密碼設定
(pyenv) $ paster --plugin=ckan sysadmin add sd1 -c /etc/ckan/default/development.ini
```

4. 需要注意當有自訂欄位時，e-mail 為必要資訊，需透過 PostgreSQL 指定 email

```bash
# 登入 PostgreSQL
$ psql -U ckan_default

# e-mail 設定
=> update public.user set email = 'sd1@tw' where name = 'sd1';

# 新增欄位設定 (若有增加組織選擇模組時才需更新)
=> update public.user set organ = 'eic' where name = 'sd1';

# 設定全名
update public.user set fullname = 'sd1' where name = 'sd1';
```

5. 移除管理員權限

```bash
(pyenv) $ paster --plugin=ckan sysadmin remove sd1 -c /etc/ckan/default/development.ini
```

6. 重新設定密碼

```bash
(pyenv) $ paster --plugin=ckan user setpass USERNAME -c YOUR_CONFIG_FILE
```

###資料提供者 / 消耗資料與加值資料者
---

* 新增與刪除一般使用者

```bash
# 假設要新增的使用者為 sd1
(pyenv) $ paster --plugin=ckan user add sd1 email=someemail@example.com organ=org -c /etc/ckan/default/development.ini

# 假設要刪除的使用者為 sd1
(pyenv) $ paster --plugin=ckan user remove sd1 -c /etc/ckan/default/development.ini
```
