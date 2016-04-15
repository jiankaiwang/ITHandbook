# 問題排除

<script type="text/javascript" src="gitbook/app.js"></script>
<script type="text/javascript" src="js/general.js"></script>

###解決組織或群組於首頁僅能呈現一筆資料問題
---

因 CKAN 預設在首頁的組織或是群組欄位僅能一次呈現出一筆主題，但當資料變多或是一次想顯示多筆主題時，可以透過修改 jinja 中的設定，如下範例增加 organization 的顯示主題數至 5 筆；

```Bash
$ vim /usr/lib/ckan/default/src/ckan/ckan/templates/snippets/organization_item.html
```

增加 get_featured_organizations() 函式的傳數參數 ** (count=5) ** 即可，如下；

```Html
{% set organizations = h.get_featured_organizations(count=5) %}

{% for organization in organizations %}
  <div class="box">
    {% snippet 'snippets/organization_item.html', organization=organization, truncate=50, truncate_title=35 %}
  </div>
{% endfor %}
```

###解決於首頁中點擊組織圖片會無法連入資料集問題
---

這是 set url 函式造成的問題，可以直接將原設計 url 的連結加入下方 href 中，如下範例

```Bash
$ vim /usr/lib/ckan/default/src/ckan/ckan/templates/snippets/organization_item.html
```

修改如下，

```Html
<!-- -->

<header class="module-heading">
  {#
  # use set url might be error, can not link to true page
  {% set url=h.url_for(controller='organization', action='read', id=organization.name) %}
  #}
  {% set truncate=truncate or 0 %}
  {% block organization_item_header_image %}
  <a class="module-image" href="{{ h.url_for(controller='organization', action='read', id=organization.name) }}">
    <img src="{{ organization.image_display_url or h.url_for_static('/base/images/placeholder-organization.png') }}" alt="{{ organization.name }}" />
  </a>
  {% endblock %}
  
<!-- -->
```






