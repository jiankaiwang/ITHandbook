# 修改 organization 呈現清單

<script type="text/javascript" src="../js/general.js"></script>

### 主要修改路徑
---

```bash

```

### 修改組織頁面下清單
---



```bash
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