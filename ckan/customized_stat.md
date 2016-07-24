# 加入並客製化統計資料模組內容

<script type="text/javascript" src="../js/general.js"></script>

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

* ** stat.html ** 內容主要以 li 方式建立清單，故於 endblock stats_group 結尾前加入要統計的項目

```html
{% set stats = h.get_site_statistics() %}

<div class="box stats">
  <div class="inner">
    <h3>{{ _('{0} statistics').format(g.site_title) }}</h3>
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
      
      
      {% endblock %}
    </ul>
  </div>
</div>
```


