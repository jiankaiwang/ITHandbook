# 修改 dataset 頁面

<script type="text/javascript" src="../js/general.js"></script>

### 修改路徑
---

```bash
/usr/lib/ckan/default/src/ckan/ckan/
  |- templates/
    |- snippets/
      |- package_list.html           # 引用 package_item.html
      |- package_item.html           # 修改各資料集下的右側主要資訊頁面 
      |- license.html                # dataset 的 license 框架      
    |- package/
      |- read.html                   # 主要顯示頁面，修正標題處與描述，包含資源與標籤引用
      |- read_base.html              # dataset 框架
      |- base.html                   # 修正 sitemap 路徑
```

### 修正語言
---

* 修正 license 語言 ** snippets/license.html **

```html
  {# ... #}
  
  {% if 'license_url' in pkg_dict %}
    {# customized #}
    <a href="{{ pkg_dict.license_url }}" rel="dc:rights">{{ h.getLicenseLabel(pkg_dict, "license_title") }}</a>
  {% else %}
    <span property="dc:rights">{{ pkg_dict.license_title }}</span>
  {% endif %}
  
  {# ... #}
```

* 修正 sitemap 路徑 ** snippets/base.html **

```html
{% block breadcrumb_content %}
  {% if pkg %}
    {# customizec #}
    {% set dataset = h.getLangLabel(pkg.name, pkg.title) %}
    {% if pkg.organization %}
      {% set organization = h.getLangLabel(pkg.organization.name,pkg.organization.title) %}
      <li>{% link_for _('Organizations'), controller='organization', action='index' %}</li>
      <li>{% link_for organization|truncate(30), controller='organization', action='read', id=pkg.organization.name %}</li>
    {% else %}
      <li>{% link_for _('Datasets'), controller='package', action='search' %}</li>
    {% endif %}
    <li{{ self.breadcrumb_content_selected() }}>{% link_for dataset|truncate(30), controller='package', action='read', id=pkg.name %}</li>
  {% else %}
    <li>{% link_for _('Datasets'), controller='package', action='search' %}</li>
    <li class="active"><a href="">{{ _('Create Dataset') }}</a></li>
  {% endif %}
{% endblock %}
```




