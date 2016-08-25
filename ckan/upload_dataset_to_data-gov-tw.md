# 透過 API 上傳至國發會

<script type="text/javascript" src="../js/general.js"></script>

### 加入上傳 icon
---

* 修改 ** templates/package/read_base.html ** 頁面

```html

{# ... #}

{% block content_action %}
  {% if h.check_access('package_update', {'id':pkg.id }) %}
    {# customized : upload to data.gov.tw #}
    {% link_for h.getLangLabel("Submit to Data.gov.tw","上傳國發會"), controller='package', action='edit', id=pkg.name, class_='btn', icon='cloud-upload' %}
    {% link_for _('Manage'), controller='package', action='edit', id=pkg.name, class_='btn', icon='wrench' %}
  {% endif %}
{% endblock %}

{# ... #}

```



