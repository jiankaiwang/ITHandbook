# 修改 tags 呈現

<script type="text/javascript" src="../js/general.js"></script>

### 修改路徑
---

```bash
/usr/lib/ckan/default/src/ckan/ckan/
  |- templates/    
    |- package/
      |- read.html                   # 呼叫來源，呼叫 package/snippets/tags.html 
      |- snippets/
        |- tags.html                 # 呼叫 snippets/tag_list.html 呈現每一個 tag
    |- snippets/
      |- tag_list.html               # 呈現 tag 主體
```

### 重新設計內容
---

* 修改 tags 主框架， ** package/snippets/tags.html  **

```html
{% if tags %}
  <section class="tags">
    <h3>{{ h.getLangLabel("Dataset Tags","資料集標籤") }}</h3>
    {# customized
      {% snippet 'snippets/tag_list.html', tags=tags, _class='tag-list well' %}
    #}
    {% snippet 'snippets/tag_list.html', tags=tags, _class='tag-list' %}
  </section>
{% endif %}
```

* 修改每一個 tags ， ** snippets/tag_list.html  **

class tag-customized 被定義在 public/base/css/general.css 中

```css
.tag-customized {
  /* override green.min.css */
  display: inline-block;
  margin-bottom: 4px;
  color: rgba(20,20,20,0.8);
  background-color: rgba(255,255,255,1);
  padding: 1px 10px;
  border: 1px solid rgba(50,50,50,0.8);
  -webkit-border-radius: 5px;
  -moz-border-radius: 100px;
  /* border-radius: 100px; */
  -webkit-box-shadow: inset 0 1px 0 #ffffff;
  -moz-box-shadow: inset 0 1px 0 #ffffff;
  box-shadow: inset 0 1px 0 #ffffff;
  padding: 7px;
}
```

```html
{#
render a list of tags linking to the dataset search page
tags: list of tags
#}
{% set _class = _class or 'tag-list' %}
{% block tag_list %}
  <ul class="{{ _class }}">
    {% for tag in tags %}
      <li>
        {# customized #}
        <a class="{% block tag_list_item_class %}tag{% endblock %} tag-customized" href="{% url_for controller='package', action='search', tags=tag.name %}"><i class="icon-tag"></i> {{ h.truncate(tag.display_name, 22) }}</a>
      </li>
    {% endfor %}
  </ul>
{% endblock %}
```

