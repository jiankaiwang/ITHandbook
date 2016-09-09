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
=> update public.user set email = 'none@cdc.gov.tw' where email = '';
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
import psycopg2
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

* 並於註冊後加新欄位內容入資料庫，並透過修正 state 欄位不進行自動登入，修正 ** ckan/ckan/logic/action/create.py **

```python
# 加入 library
from py2psql import *

# 並於 user_create 函式下，於 .commit() 入 postgresql 後，加入新欄位內容與更改 user 狀態
    # ....
    if not context.get('defer_commit'):
        model.repo.commit()

    # modify user state and add value into organ
    p2l = py2psql("127.0.0.1","5432","ckan_default","public.user","ckan_default","ckan")
    p2l.update({"state":"inactive", "organ":data_dict["organ"]}, {"name":data_dict["name"], "email":data_dict["email"]})
    # ...
```

### 於使用者修改內容中，加入申請單位欄位
---

* 主要修正內容為 ** templates/user/edit_user_form.html **，並加入下述程式碼，便可依照目前組之選項自動調整；

```html
  {# customized applied organization #}
  <div class="control-group control-medium">
    <label class="control-label" for="field-confirm-password">{{ h.getLangLabel("Applied Organization","申請加入組織") }}</label>
    <div class="controls ">
    <select id="field-organ" name="organ" class="control-medium">
      {% for org in h.get_featured_organizations(count=200) %}
        <option value="{{ org.name }}" {% if org.name == h.getUserOrgan(data.id) %} selected{% endif %}>{{ h.getLangLabel(org.etitle, org.title) }}</option>
      {% endfor %}
      <option value="other">{{ h.getLangLabel("Others", "其他") }}</option>
    </select>
    </div>
  </div>
```

* 並於修改個人資料後加新欄位內容入資料庫，修正 ** ckan/ckan/logic/action/update.py **

```python
# 加入 library
from py2psql import *

# 並於 user_update 函式下，於 .commit() 入 postgresql 後，加入新欄位內容
    # ....
    if not context.get('defer_commit'):
        model.repo.commit()

    # update the organization
    p2l = py2psql("127.0.0.1","5432","ckan_default","public.user","ckan_default","ckan")
    p2l.update({"organ":data_dict["organ"]},{"name":data_dict["name"], "email":data_dict["email"]})
    # ...
```

### 於個人資料頁面中加入申請組織資料
---

* 修正頁面回傳資料內容，修正 ** ckan/ckan/lib/dictization/model_dictize.py **，於 user_dictize 函式中取得資料庫資料回傳至前端

```python
from py2psql import *

def user_dictize(user, context, include_password_hash=False):
    if context.get('with_capacity'):
        user, capacity = user
        result_dict = d.table_dictize(user, context, capacity=capacity)
    else:
        result_dict = d.table_dictize(user, context)

    password_hash = result_dict.pop('password')
    del result_dict['reset_key']

    result_dict['display_name'] = user.display_name
    result_dict['email_hash'] = user.email_hash
    result_dict['number_of_edits'] = user.number_of_edits()

    # customize to get organ value
    p2l = py2psql("127.0.0.1","5432","ckan_default","public.user","ckan_default","ckan")
    result_dict.setdefault('organ', p2l.select({"email": user.email},["organ"],asdict=True)[0]["organ"])

    result_dict['number_created_packages'] = user.number_created_packages(
        include_private_and_draft=context.get(
            'count_private_and_draft_datasets', False))
```

* 顯示申請內容，修改 ** templates/user/read_base.html ** 內容

```html
      <!-- -->
      
      {% block user_info %}
      <div class="info">
        <dl>
          {% if user.name.startswith('http://') or user.name.startswith('https://') %}
            <dt>{{ _('Open ID') }}</dt>
            <dd>{{ user.name|urlize(25) }}{# Be great if this just showed the domain #}</dd>
          {% else %}
            <dt>{{ _('Username') }}</dt>
            <dd>{{ user.name }}</dd>
          {% endif %}
        </dl>
        {#{% if user.organ %}
        <dl>
            <dt>{{ h.getLangLabel("Applied Organ","申請組織") }}</dt>
            <dd>{{ user.organ }}</dd>
        </dl>
        {% endif %}#}
        {% if c.is_myself %} 

        <!-- -->
```

### 於組織管理中加入待加入成員名單
---

* 新增待加入組織清單，修改 ** templates/organization/members.html **，需注意 ** requested_members.html ** 已新增。

```html
 
      {% endfor %}
    </tbody>
  </table>

  {# add applied list #}
  {{ h.snippet('home/snippets/requested_members.html', organization=organization, members=c.members) }}
```












