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

  {# cdc #}
  {% block home_image %}
  {% snippet 'snippets/popular_data.html' %}
  {% endblock %}

</div>
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
        {% block stats %}
          {% snippet 'home/snippets/customized_stats.html' %}
        {% endblock %}
      </div>
      <div class="span6 col2">

      </div>
    </div>
  </div>
</div>
```

* ** customized_stats.html ** 內容主要以 li 方式建立清單，故於 endblock stats_group 結尾前加入要統計的項目

```html
{% set stats = h.get_site_statistics() %}

<div class="box stats">
  <div class="inner">
    {# customized : 修改 module 標題 #}
    <h3 class="page-heading module-content">
      <i class="icon-signal icon-1x"></i>&nbsp;&nbsp;{{ h.getLangLabel("Statistics","統計資訊") }}
    </h3>
    <ul>
      {% block stats_group %}
      <li>
        <a href="{{ h.url_for(controller='package', action='search') }}">
          <b>{{ h.SI_number_span(stats.dataset_count) }}</b>
          {{ _('dataset') if stats.dataset_count == 1 else _('datasets') }}
        </a>
      </li>
      <li>
        <a href="{{ h.url_for(controller='organization', action='index') }}">
          <b>{{ h.SI_number_span(stats.organization_count) }}</b>
          {{ _('organization') if stats.organization_count == 1 else _('organizations') }}
        </a>
      </li>
      <li>
        <a href="{{ h.url_for(controller='group', action='index') }}">
          <b>{{ h.SI_number_span(stats.group_count) }}</b>
          {{ _('group') if stats.group_count == 1 else _('groups') }}
        </a>
      </li>
      {# customized #}
      {# 假設 ckan 有安裝 plugin ckanext-pages 模組 #}
      {# 底下為計算有多少則消息被發布 #}
      <li>
        {% set posts = h.get_recent_blog_posts() %}
        <a href="{{ h.url_for(controller='ckanext.pages.controller:PagesController', action='blog_show', page='') }}">
          <b>{{ h.getLen(posts) }}</b>
          {{ h.getLangLabel("news","消息") }}
        </a>
      </li>
      {% endblock %}
    </ul>
  </div>
</div>
```
