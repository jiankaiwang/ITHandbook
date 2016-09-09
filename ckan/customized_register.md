# 客製化註冊選單及避免自動註冊登入

<script type="text/javascript" src="../js/general.js"></script>

* 增加一選項用來申請組織

### 修改 postgresql 資料庫組態
---

* 修正 login 的 peer authentication failed 問題，修正 conf 設定

```bash
# 修改 postgresql.conf 
$ sudo vim /etc/postgresql/9.3/main/pg_hba.conf
```

並將之改成，由 peer 改成 md5

```bash
# ...
# Database administrative login by Unix domain socket
local   all             postgres                                md5

# TYPE  DATABASE        USER            ADDRESS                 METHOD

# "local" is for Unix domain socket connections only
local   all             all                                     md5
# ...
```

修改後重啟服務

```bash
$ sudo /etc/init.d/postgresql restart
```

嘗試登入 CKAN PostgreSQL 資料庫

```bash
$ psql -U ckan_default
```

### 修改 CKAN 使用 postgresql 的 table schema 用來儲存新欄位
---

* 基本操作 postgresql 資料庫指令 (可參考)

```bash
\list                                                   # 列出資料庫
\dt                                                     # 列出資料表
\d+ public.user                                         # 列出資料表綱目
ALTER TABLE "user" ADD COLUMN organ text;               # 增加欄位
ALTER TABLE "user" ALTER COLUMN organ TYPE text;        # 改變欄位型態
\connect ckan_default                                   # 變更目前所在資料庫
```

* 增加欄位

```bash
# 登入 postgresql
$ psql -U ckan_default

# 增加 organ 欄位
=> ALTER TABLE "user" ADD COLUMN organ text;

# 檢查是否新增欄位成功
=> \d+ public.user

# 查看目前所有使用者的資料
=> select * from public.user;

# 先對所有使用者加入 organ，假設為 eic
=> update public.user set organ = 'eic' where id = '' or 1 = 1;
```

### 加入自定義對 PostgreSQL 資料庫處理類別
---

* 參考 [Gitbook](https://jiankaiwang.gitbooks.io/seed/content/python/py2psqlpy.html)、或 [github](https://github.com/jiankaiwang/seed/blob/master/python/py2psql.py)。

* 將此類別加入預設 python library 中，並安裝 psycopg2，並記得於 virtualenv 中加入 psycopg2 (ckan 2.5.x 已上已預先安裝)

```bash
# python 2.7 函式庫預設位置
$ cd /usr/lib/python2.7/

# 一般環境下安裝 py2psql 套件
$ sudo pip install psycopg2

# 取得類別程式碼
$ sudo wget https://raw.githubusercontent.com/jiankaiwang/seed/master/python/py2psql.py
```

### 加入數項功能入 helpers.py
---

```python
# 引用自定義 library
from py2psql import *

# 加入函式 : 完整參考 helpers.py
def getReq2OrgList(getOrg, getCrtUser)
def getUserState(getID)
def setUserState(getID,setState)

# 加入 allowed function
__allowed_functions__ = [
    '...',
    'getReq2OrgList',
    'getUserState',
    'setUserState',  
    '...'
]
```

```bash
$ sudo restart ckan
```

### 加入待核可選單
---

* 於 templates/home/snippets/ 底下加入 requested_members.html

```bash
# snippet 選單
$ vim /usr/lib/ckan/default/src/ckan/ckan/templates/home/snippets/requested_members.html
```

內容如下，

```html
{% set organization = organization %}
{% set members = members  %}

<h3 class="page-heading">{{ h.getLangLabel("Requested to join the organization","請求加入此組織帳號") }}</h3>
<table class="table table-header table-hover table-bordered">
  <col width="30" />
  <col width="30" />
  <col width="40" />
  <thead>
    <tr>
      <th scope="col">{{ _('Name') }}</th>
      <th scope="col">{{ _('Fullname') }}</th>
      <th scope="col">{{ _('Email') }}</th>
    </tr>
  </thead>
  <tbody>
    {% for name, fullname, email in h.getReq2OrgList(organization, c.members) %}
    <tr>
      <td> {{ name }} </td>
      <td> {{ fullname }} </td>
      <td> {{ email }} </td>
    </tr>
    {% endfor %}
  </tbody>
</table>
```

### 於註冊選單中加入新欄位
---

* 主要參考預設範本 ** /usr/lib/ckan/default/src/ckan/ckan/templates/macros/form.html **

```html
$ vim /usr/lib/ckan/default/src/ckan/ckan/templates/macros/form.html
```

* 主要修正內容為 ** templates/user/new_user_form.html **，並加入下述程式碼，便可依照目前組之選項自動調整；

```html
  {# customized applied organization #}
  <div class="control-group control-medium">
    <label class="control-label" for="field-confirm-password">{{ h.getLangLabel("Applied Organization","申請加入組織") }}</label>
    <div class="controls ">
    <select id="field-organ" name="organ" class="control-medium">
      {% for org in h.get_featured_organizations(count=200) %}
        <option value="{{ org.name }}">{{ h.getLangLabel(org.etitle, org.title) }}</option>
      {% endfor %}
      <option value="other">{{ h.getLangLabel("Others", "其他") }}</option>
    </select>
    </div>
  </div>
```






