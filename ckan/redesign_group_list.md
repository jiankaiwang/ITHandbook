# 修改 group 呈現清單

<script type="text/javascript" src="../js/general.js"></script>

### 以三欄為一列方式呈現，並移除組織清單
---

* 修改路徑

```bash
/usr/lib/ckan/default/src/ckan/ckan/templates
  |- home/
    |- layout1.html
    |- snippets/
      |- featured_group.html       # entry point, 呼叫 snippet/group_item.html
  |- snippet/group_item.html       # 主要顯示頁面
```

* 修改 layout1.html 如下

```html
<div role="main" class="homepage-data-section">
  <div class="container">
    ...
  </div>
  <div class="row row1 section-topic general-font-family"> <!-- hr --> </div>
  <div class="container">
    <div class="span12 col1 hp-category-margin hp-category-margin-mb" style="margin-left: 6px;">
        {# Note: this featured_group block is used as an example in the theming
           tutorial in the docs! If you change this code, be sure to check
           whether you need to update the docs. #}
        {# Start template block example. #}
        {% block featured_group %}
          {% snippet 'home/snippets/featured_group.html' %}
        {% endblock %}
        {# End template block example. #}
    </div>
  </div>
</div>
```

* 修改 featured_group.html 如下

```html
{% set groups = h.get_featured_groups(count=5) %}

{% set colNum = 0 %}
{% for group in groups %}

    <div class="span4 hp-category hp-category-mb">
            {% snippet 'snippets/group_item.html', group=group, truncate=50, truncate_title=35 %}
    </div>

{% endfor %}
```

* 修改 group_item.html 如下

```html
{% block group_item %}
  <section class="group-list module module-narrow module-shallow">
    {% block group_item_header %}
      <header class="module-heading">
        {% set truncate=truncate or 0 %}
        {% set truncate_title = truncate_title or 0 %}
        {% set title = group.title or group.name %}
        {% block group_item_header_image %}
          <a class="module-image" href="{{ h.url_for(controller='group', action='read', id=group.name) }}">
          <img src="{{ group.image_display_url or h.url_for_static('/base/images/placeholder-group.png') }}" alt="{{ group.name }}" />

          </a>
        {% endblock %}
        {% block group_item_header_title %}
          <h3 class="media-heading"><a href="{{ h.url_for(controller='group', action='read', id=group.name) }}">{{ group.title or group.name }}</a></h3>
        {% endblock %}
        {% block group_item_header_description %}
          {% if group.description %}
            {% if truncate == 0 %}
              <p>{{ h.markdown_extract(group.description)|urlize }}</p>
            {% else %}
              <p>{{ h.markdown_extract(group.description, truncate)|urlize }}</p>
            {% endif %}
          {% endif %}
        {% endblock %}
      </header>
    {% endblock %}
  </section>
{% endblock %}
```