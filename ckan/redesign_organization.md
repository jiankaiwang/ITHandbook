# 修改 organization 呈現清單

<script type="text/javascript" src="../js/general.js"></script>

### 主要修改路徑
---

```bash
/usr/lib/ckan/default/src/ckan/ckan/templates
  |- organization/
    |- snippets/
      |- organization_list.html  # main entry to call organization_item.html
      |- organization_item.html  # 顯示 organization 清單
      |- info.html               # 各 organization 頁面內容框架 
    |- read_base.html            # organization 頁面框架，呼叫 info.html
```

### 修改組織頁面下清單
---

* 修改 organization/snippets/organization_list.html 內容

```html
{% block organization_list %}
<ul class="media-grid" data-module="media-grid">
  {% block organization_list_inner %}

  {# customized : use h.get_featured_organizations() instead of organizations #}
  {% for organization in h.get_featured_organizations(count=5) %}
    {% snippet "organization/snippets/organization_item.html", organization=organization, position=loop.index %}
  {% endfor %}
   {% endblock %}
</ul>
{% endblock %}
```

* 修改 organization/snippets/organization_item.html 內容

```html
{% set url = h.url_for(organization.type ~ '_read', action='read', id=organization.name) %}
{% block item %}
<li class="media-item">
  {% block item_inner %}

  {# customized : original is organization.image_display_url, use plugins is organization.url #}
  {% block image %}
    <img src="{{ organization.url or h.url_for_static('/base/images/placeholder-organization.png') }}" alt="{{ organization.name }}" class="media-image">
  {% endblock %}

  {% block title %}
    <h3 class="media-heading">{{ organization.display_name }}</h3>
  {% endblock %}

  {# customized : original is organization.description, use plugins is organization.notes #}
  {% block description %}
    {% if organization.notes %}
      <p>{{ h.markdown_extract(organization.notes, extract_length=80) }}</p>
    {% endif %}
  {% endblock %}

  {% block datasets %}
    {% if organization.package_count %}
      <strong class="count">{{ ungettext('{num} Dataset', '{num} Datasets', organization.package_count).format(num=organization.package_count) }}</strong>
    {% else %}
      <span class="count">{{ _('0 Datasets') }}</span>
    {% endif %}
  {% endblock %}

  {% block link %}
  <a href="{{ url }}" title="{{ _('View {organization_name}').format(organization_name=organization.display_name) }}" class="media-view">
    <span>{{ _('View {organization_name}').format(organization_name=organization.display_name) }}</span>
  </a>
  {% endblock %}
  {% endblock %}
</li>
{% endblock %}
{% if position is divisibleby 3 %}
  <li class="clearfix js-hide"></li>
{% endif %}
```

### 修改各 organization 頁面的內容
---




