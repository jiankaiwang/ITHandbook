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

* 修正 sitemap 路徑 ** package/base.html **

```html
{% block breadcrumb_content %}
  {% if pkg %}
    {# customizec #}
    {% set dataset = h.getLangLabel(pkg.e_title, pkg.c_title) %}
    {% if pkg.organization %}
      {% set organization = h.getLangLabel(pkg.organization.name, pkg.organization.title) %}
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

### 修正 dataset 頁面左側 filters (可加速 dataset 讀取速度)
---

* 修正路徑

```bash
/usr/lib/ckan/default/src/ckan/ckan/templates/
  |- package/
    |- search.html        # 呼叫 ../snippets/facet_list.html
  |- snippets/
    |- facet_list.html    # 實際 filter 位置
```

* 修正 ** search.html ** : 僅顯示 "Formats", "格式", "Tags", "標籤"

```html

{# ... #}

{% block secondary_content %}
<div class="filters">
  <div>
    {% for facet in c.facet_titles %}
      {# customized : origin is {Organizations, Groups, Tags, Formats, Licenses} #}
      {% if c.facet_titles[facet] in ["Formats", "格式", "Tags", "標籤"] %}
      {{ h.snippet('snippets/facet_list.html', title=c.facet_titles[facet], name=facet) }}
      {% endif %}
    {% endfor %}
  </div>
  <a class="close no-text hide-filters"><i class="icon-remove-sign"></i><span class="text">close</span></a>
</div>
{% endblock %}

```

* 修正 ** facet_list.html ** 內容

```html
  {# ... #}

  <nav>
    <ul class="{{ nav_class or 'unstyled nav nav-simple nav-facet' }}">
      {% for item in items %}
        {% set href = h.remove_url_param(name, item.name, extras=extras, alternative_url=alternative_url) if item.active else h.add_url_param(new_params={name: item.name}, extras=extras, alternative_url=alternative_url) %}
        {% set label = label_function(item) if label_function else item.display_name %}
        {% set label_truncated = h.truncate(label, 22) if not label_function else label %}
        {% set count = count_label(item['count']) if count_label else ('(%d)' % item['count']) %}
          <li class="{{ nav_item_class or 'nav-item' }}{% if item.active %} active{% endif %}">
            <a href="{{ href }}" title="{{ label if label != label_truncated else '' }}">
                {# customized #}
                {% set newLabel = h.truncate(h.getGroupOrOrganizationLangStr(title, item), 22) %}
                {% if newLabel != 'N' %}
                  <span>{{ newLabel }} {{ count }}</span>
                {% else %}
                  {% if title == 'Licenses' %}
                    <span>{{ h.getLicenseLabel(item,"display_name") }} {{ count }}</span>
                  {% else %}
                    <span>{{ label_truncated }} {{ count }}</span>
                  {% endif %}
                {% endif %}
            </a>
          </li>
      {% endfor %}
    </ul>
  </nav>
  
  {# ... #}
```






















