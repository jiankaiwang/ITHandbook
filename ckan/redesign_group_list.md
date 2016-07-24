# 修改 group 呈現清單

<script type="text/javascript" src="../js/general.js"></script>

### 以三欄為一列方式呈現，並移除組織清單
---

* 修改路徑

```
/usr/lib/ckan/default/src/ckan/ckan/templates
  |- home/
    |- layout1.html
    |- snippets/
      |- featured_group.html
```

* 修改 layout1.html 如下

```
<div role="main" class="homepage-data-section">
  <div class="container">
    ...
  </div>
  <div class="row row1 section-topic general-font-family"> <!-- hr --> </div>
  <div class="container">
    <div class="span12 col1 hp-category-margin hp-category-margin-mb" style="margin-left: 6px;">
        {# Note: this featured_group block is used as an example in the theming
           tutorial in the docs! If you change this code, be sure to check
           whether you need to update the docs. #}
        {# Start template block example. #}
        {% block featured_group %}
          {% snippet 'home/snippets/featured_group.html' %}
        {% endblock %}
        {# End template block example. #}
    </div>
  </div>
</div>
```