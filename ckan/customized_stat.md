# 加入並客製化統計資料模組內容



###原模組
---

* 此統計模組為原 layout2.html 的 snippet 模組，原相依位置為

```bash
# 位於 template 底下，為 homepage 中顯示的一部分
/usr/lib/ckan/default/src/ckan/ckan/templates/
  |- home/
    |- layout2.html  # 於此呼叫 stats.html 內容
      |- snippets/stats.html  # 統計値顯示主要內容
```

* 將此取出，並假設以 **layout1.html** 為主模版開發

```bash
# 複製一份 stat.html 內容為 customized_stats.html 並準備引用
cd /usr/lib/ckan/default/src/ckan/ckan/templates
cp ./home/snippets/stats.html ./home/snippets/customized_stats.html

# 位於 template 底下，為 homepage 中顯示的一部分
/usr/lib/ckan/default/src/ckan/ckan/templates/
  |- home/
    |- layout1.html  # 以此為模版，並於此頁面下加入客製化統計頁面
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
  <div>
    <header class="hp-header-bg">
      {# customized 修改 module 標題 #}
      <h3 class="page-heading module-content">
      <i class="icon-signal icon-1x"></i>&nbsp;&nbsp;
      {{ h.getLangLabel("Statistics","統計資訊") }}
      </h3>
    </header>
    <ul class="module-content">
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


