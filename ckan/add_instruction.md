# 在 chanext-pages 中加入 instruction 程式碼區塊

<script type="text/javascript" src="../js/general.js"></script>

### 修改路徑
---

```bash
/usr/lib/ckan/default/src/
  |- ckanext-pages/ckanext/pages/theme/templates_main/ckanext_pages/page.html  # 引用位置
  |- ckan/ckan/templates/snippets
    |- instruction.html
      |- register.html
      |- document.html
      |- admin_doc.html
      |- contact.html      
```

### 引用方式
---

* 加入引用方式

```html
    {# ... #}

    {% if c.page.content %}
      <h1 class="page-heading">{{ h.getLangLabel(c.page.ename,c.page.cname) }}</h1>
      <div class="ckanext-pages-content">
        {% set editor = h.get_wysiwyg_editor() %}
        {% if editor %}
          <div>
              {{c.page.content|safe}}
          </div>
        {% else %}
          {# customized #}
          {{ h.getLangLabel(h.render_content(c.page.econtent),h.render_content(c.page.content)) }}
          {% if c.page.ename == "Suggestion" %}
              {% snippet "snippets/disqus.html" %}
          {% elif c.page.ename == "Developer" %}
              {% snippet "snippets/developer.html" %}
          {# customized #}
          {% elif c.page.ename == "instruction" %}
              {% snippet "snippets/instruction.html" %}
          {% endif %}
        {% endif %}
      </div>
    {% else %}

    {# ... #}
```

* 重新安裝及重啟服務

```bash
$ cd /usr/lib/ckan/default/src/ckanext-pages/
$ python ./setup.py install
$ sudo restart ckan
```

### 內容
---

* 新增主要引用位置 ** instruction.html **

```html
<hr />
{# register document #}
{% snippet 'snippets/register.html' %}

{% if c.user %}
    {# only user can view #}
    <hr />
    {# document #}
    {% snippet 'snippets/document.html' %}
{% endif %}

{% if c.userobj.sysadmin %}
    {# only admin user can view #}
    <hr />
    {# admin document #}
    {% snippet 'snippets/admin_doc.html' %}
{% endif %}

<hr />
{# contact #}
{% snippet 'snippets/contact.html' %}
```

* 新增"註冊文件" ** register.html **

```html
<h3 class="page-heading">{{ h.getLangLabel("Rregistration document","註冊文件") }}</h3>
<p>{{ h.getLangLabel("After registering, please download the document, fill and send it to Information Management Office.","註冊完成
後，帳戶將暫時關閉，請您至底下連結下載表單填寫後傳真給本署資訊室，審核後方可啟用。") }}</p>
<table class="table table-header table-hover table-bordered">
        <col width="30" />
        <col width="20" />
        <col width="50" />
        <thead>
                <tr>
                        <th scope="col">{{ h.getLangLabel("Name","文件名稱") }}</th>
                        <th scope="col">{{ h.getLangLabel("Download","下載連結") }}</th>
                        <th scope="col">{{ h.getLangLabel("Note","備註") }}</th>
                </tr>
        </thead>
        <tbody>
                <tr>
                        <th scope="col">{{ h.getLangLabel("Activate account","帳號開通") }}</th>
                        <th scope="col">
                          <a href="#"><i class="icon-download"></i> {{ h.getLangLabel("Excel","Excel") }}</a>
                        </th>
                        <th scope="col">{{ h.getLangLabel("tax to 02-23959825 #3628 or email to smalla@cdc.gov.tw","傳真至 02-23959825 #3628 >或寄至 smalla@cdc.gov.tw") }}</th>
                </tr>
        </tbody>
</table>
```

* 新增"操作文件" ** document.html **

```html
<h3 class="page-heading">{{ h.getLangLabel("Operational Guideline","操作文件") }}</h3>
<table class="table table-header table-hover table-bordered">
        <col width="30" />
        <col width="20" />
        <col width="50" />
        <thead>
                <tr>
                        <th scope="col">{{ h.getLangLabel("Edition","版本日期") }}</th>
                        <th scope="col">{{ h.getLangLabel("Download","下載連結") }}</th>
                        <th scope="col">{{ h.getLangLabel("Description","說明") }}</th>
                </tr>
        </thead>
        <tbody>
                <tr>
                        <th scope="col">{{ h.getLangLabel("2016/09/01, v.1.0","2016/09/01, v.1.0") }}</th>
                        <th scope="col">
                          <a href="#"><i class="icon-download"></i> {{ h.getLangLabel("PPT","PPT") }}</a>
                        </th>
                        <th scope="col">{{ h.getLangLabel("Basic Platform Training","本署同仁教育訓練") }}</th>
                </tr>
        </tbody>
</table>
```

* 新增"管理文件" ** admin_doc.html **

```html
<h3 class="page-heading">{{ h.getLangLabel("Management Guideline","管理文件") }}</h3>
<table class="table table-header table-hover table-bordered">
        <col width="30" />
        <col width="20" />
        <col width="50" />
        <thead>
                <tr>
                        <th scope="col">{{ h.getLangLabel("Edition","版本日期") }}</th>
                        <th scope="col">{{ h.getLangLabel("Download","下載連結") }}</th>
                        <th scope="col">{{ h.getLangLabel("Description","說明") }}</th>
                </tr>
        </thead>
        <tbody>
                <tr>
                        <th scope="col">{{ h.getLangLabel("2016/09/01, v.1.0","2016/09/01, v.1.0") }}</th>
                        <th scope="col">
                          <a href="#"><i class="icon-download"></i> {{ h.getLangLabel("PPT","PPT") }}</a>
                        </th>
                        <th scope="col">{{ h.getLangLabel("Account activation","帳號開通操作") }}</th>
                </tr>
        </tbody>
</table>
```

* 新增"聯絡文件" ** contact.html **

```html
<h3 class="page-heading">{{ h.getLangLabel("Trouble Shooting","困難排除") }}</h3>
<table class="table table-header table-hover table-bordered">
        <col width="30" />
        <col width="20" />
        <col width="25" />
        <col width="25" />
        <thead>
                <tr>
                        <th scope="col">{{ h.getLangLabel("Service","負責內容") }}</th>
                        <th scope="col">{{ h.getLangLabel("Name","單位姓名") }}</th>
                        <th scope="col">{{ h.getLangLabel("Phone","電話") }}</th>
                        <th scope="col">{{ h.getLangLabel("Email","電子郵件") }}</th>
                </tr>
        </thead>
        <tbody>
                <tr>
                        <th scope="col">{{ h.getLangLabel("Register, Response","註冊, 回覆與跨組織聯繫") }}</th>
                        <th scope="col">{{ h.getLangLabel("Mr. Zhao, Information Management Officei","資訊室趙志雄") }}</th>
                        <th scope="col">{{ "02-23959825 #3628" }}</th>
                        <th scope="col">{{ "smalla@cdc.gov.tw" }}</th>
                </tr>
                <tr>
                        <th scope="col">{{ h.getLangLabel("Operatiom, DevOps","業務, 開發維運") }}</th>
                        <th scope="col">{{ h.getLangLabel("Mr. Wang, Epidemic Intelligence Center","疫情中心王建凱") }}</th>
                        <th scope="col">{{ "02-23959825 #4032" }}</th>
                        <th scope="col">{{ "jkw@cdc.gov.tw" }}</th>
                </tr>
        </tbody>
</table>
```


