# 透過 API 上傳至國發會

<script type="text/javascript" src="../js/general.js"></script>

### 確認 ckanext-scheming plugin 格式
---

```

```

### 於 PostgreSQL DB 中加入 ndcsync 表格紀錄同步狀態
---

```bash
# 登入 postgresql service
$ psql -U ckan_default

# 進入 ckan 資料庫
\connect ckan_default

# 加入一張新表
CREATE TABLE ndcsync ( id serial primary key, cdcid text not null, ndcid text, state text NOT NULL, operation text not null, beginning date, ending date, code text, progress text );

# 表格綱目如下
#  Column   |  Type   |                      Modifiers                       | Storage  | Stats target | Description
#-----------+---------+------------------------------------------------------+----------+--------------+-------------
# id        | integer | not null default nextval('ndcsync_id_seq'::regclass) | plain    |              |
# cdcid     | text    | not null                                             | extended |              |
# ndcid     | text    |                                                      | extended |              |
# state     | text    | not null                                             | extended |              |
# operation | text    | not null                                             | extended |              |
# beginning | date    |                                                      | plain    |              |
# ending    | date    |                                                      | plain    |              |
# code      | text    |                                                      | extended |              |
# progress  | text    |                                                      | extended |              |
```

### 加入自定義類別 py2psql (py to psql) 及 REQUESTMETHOD
---

* py2psql : Python 與 PostgreSQL 溝通類別
* REQUESTMETHOD : 透過 Python 傳送 GET/POST/PUT/DELETE 方法

```bash
# python 2.7 函式庫預設位置
$ cd /usr/lib/python2.7/

# 取得 py2psql 程式碼
$ sudo wget https://raw.githubusercontent.com/jiankaiwang/seed/master/python/py2psql.py

# 取得 REQUESTMETHOD2 程式碼
$ sudo wget https://raw.githubusercontent.com/jiankaiwang/seed/master/python/REQUESTMETHOD2.py
```

### 加入同步函式入 helpers.py
---

```python
# 進入虛擬機
$ . /usr/lib/ckan/default/bin/activate

# 加入功能入 helpers.py
$ vim /usr/lib/ckan/default/src/ckan/ckan/lib/helpers.py
```

* 加入定義與內容可以參考 helpere.py

### 加入上傳 icon
---

* 修改 ** templates/package/read_base.html ** 頁面

```html

{# ... #}

  {# customized : upload to NDC #}
  {% if request.method == "GET" %}
    {# at the beginning, not submitting #}
    <form method="post" name="upload" action="#" class="sumbit-form">
      <button class="btn btn-primary" name="save" type="submit" style="display: inline-block;" value="DataGovTW">
        <i class="icon-cloud-upload"></i>
        {{ h.getLangLabel("Submit to Data.gov.tw", resourceStatus) }}
      </button>
    </form>
  {% elif request.method == "POST" and h.getPostRequestParamValue(request.body, "save") == "DataGovTW" %}
      <button class="btn btn-danger" name="save" type="submit" value="DataGovTW">
        <i class="icon-repeat"></i>
        {#{{ h.getLangLabel("Submitting","正在上傳") }}#}
        {{ pkg }}
      </button>
      {# refresh for prepare data submitting #}
      {#{% set activate = h.uploadToDataGovTWBody(pkg.id) %}#}
      {#<meta http-equiv="refresh" content="15;url=#"></meta>i#}
  {% endif %}

{# ... #}

```



