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


