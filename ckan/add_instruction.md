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

```

### 內容
---

* 修改主要引用位置 ** instruction.html **

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







