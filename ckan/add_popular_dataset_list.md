# 加入熱門資料集選單

<script type="text/javascript" src="../js/general.js"></script>

### 新建模組
---

* 此模組為自建模組

```bash
/usr/lib/ckan/default/src/ckan/ckan/templates/
  |- home/
    |- snippet/
      |- customized_popular.html  # entry point
  |- snippet/
    |- popular_data.html          # 真正顯示內容的頁面
```

* customized_popular.html 內容如下

```html
{% set intro = g.site_intro_text %}

<div class="box" style="padding-bottom: 20px;">
  <header class="hp-header-bg">
    {% if intro %}
      {{ h.render_markdown(intro) }}
    {% else %}
      <h3 class="page-heading module-content">
      {{ h.getLangLabel("Popular Data","熱門資料") }}
      </h3>
    {% endif %}
  </header>

  {# customized #}
  {% block home_image %}
  {% snippet 'snippets/popular_data.html' %}
  {% endblock %}

</div>
```

* popular_data.html 內容如下

```html
{# customized : list 5 popular datasets #}
{% for post in range(0,5,1) %}
    <div class="blog-title dataset-item module-content">
        {% snippet 'snippets/package_item.html', package=c.datasets[post], banner=true %}
    </div>
{% endfor %}
```

###客製化模組
---

* 假設使用 ** layout1.html ** 作為主要顯示的模組，此需要管理員登入後於「設置」中「首頁」項目中亦選擇「Introductory area, search, ... 」選項才是以 layout1.html 為模組。

* 將剛複製出的 ** customized_stats.html ** 加入 ** layout1.html **，並放置於主畫面牆之下。

```html
<div role="main" class="homepage-data-section">
  <div class="container">
    <div class="row row1 section-topic general-font-family">
     {# 重新設定區塊主題，getLangLabel 為自定義函式 (位於 helper.py 中) #}
     {{ h.getLangLabel("Browser more topics and data.", "瀏覽更多的資料與內容") }}
    </div>
    <div class="row row2">
      <div class="span6 col1">
      </div>
      <div class="span6 col2">
        {% block popular %}
          {% snippet 'home/snippets/customized_popular.html' %}
        {% endblock %}
      </div>
    </div>
  </div>
</div>
```
