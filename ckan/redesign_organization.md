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
    |- read_base.html            # organization 頁面框架，呼叫 feeds.html 與 organization.html
  |- snippets/
    |- organization.html         # 各 organization 主要顯示框架
```

### 修改組織頁面下清單
---

* 修改 organization/snippets/organization_list.html 內容

```html
{% block organization_list %}
<ul class="media-grid" data-module="media-grid">
  {% block organization_list_inner %}

  {# customized : use h.get_featured_organizations() instead of organizations #}
  {# use cutomizedized function getLen() to show all organizations #}
  {# 200 is the self-defined number, assume maxium organization count is 200 #}
  {% for organization in h.get_featured_organizations(count=200) %}
    {% for item in organizations %}
      {% if item.id == organization.id %}
      {% snippet "organization/snippets/organization_item.html", organization=organization, position=loop.index %}
      {% endif %}
    {% endfor %}
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
  {# show maxium 40 words #}
  {% block description %}
    {% if organization.notes %}
      <p>{{ h.markdown_extract(organization.notes, extract_length=40) }}</p>
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

* 修改 snippets/organization.html 內容如下：

```html
{% set truncate = truncate or 0 %}
{% set url = h.url_for(controller='organization', action='read', id=organization.name) %}

  {% block info %}
  <div class="module module-narrow module-shallow context-info">
    {% if has_context_title %}
      <h2 class="module-heading"><i class="icon-building"></i> {{ _('Organization') }}</h2>
    {% endif %}
    <section class="module-content">
      {% block inner %}

      {# customized : img src is organization.url to replace organization.image_display_url #}
      {% block image %}
        <div class="image">
          <a href="{{ url }}">
            <img src="{{ organization.url or h.url_for_static('/base/images/placeholder-organization.png') }}" width="200" alt="{{ organization.name }}" />
          </a>
        </div>
      {% endblock %}
      {% block heading %}
      <h1 class="heading">{{ organization.title or organization.name }}
        {% if organization.state == 'deleted' %}
          [{{ _('Deleted') }}]
        {% endif %}
      </h1>
      {% endblock %}


      {# customized : description is organization.notes to replace organization.description #}
      {% block description %}
      {% if organization.notes %}
        <p>
          {{ h.markdown_extract(organization.notes, 180) }}
          {% link_for _('read more'), controller='organization', action='about', id=organization.name %}
        </p>
      {% else %}
        <p class="empty">{{ _('There is no description for this organization') }}</p>
      {% endif %}
      {% endblock %}


      {% if show_nums %}
        {% block nums %}
        <div class="nums">
          <dl>
            <dt>{{ _('Followers') }}</dt>
            <dd>{{ h.SI_number_span(organization.num_followers) }}</dd>
          </dl>
          <dl>
            <dt>{{ _('Datasets') }}</dt>
            <dd>{{ h.SI_number_span(organization.package_count) }}</dd>
          </dl>
        </div>
        {% endblock %}
        {% block follow %}
        <div class="follow_button">
          {{ h.follow_button('group', organization.id) }}
        </div>
        {% endblock %}
      {% endif %}
      {% endblock %}
    </section>
  </div>
  {% endblock %}
```

### 增加英文標題與英文說明欄位
---

* 透過 data.extras  修改 ** organization/snippets/organization_form.html ** 檔案

```html
 {# ... #}

 {# notice : save as stack structure, first in, last out #}
 {# Use data.extras list to save English title #}
 {{ form.input('extras__1__key', value='etitle', id='field-extras-1', classes=['hidden']) }}
 {% if data.extras %}
     {% set extra1value = data.extras[1].value %}
 {% else %}
     {% set extra1value = '' %}
 {% endif %}
 {{ form.input('extras__1__value', label=_('English Name'), id='field-extras-1', placeholder=_('My Organization in English'), value=extra1value, error=errors.title, classes=['control-full'], attrs=attrs) }}

 {# ... #}

 {# notice : save as stack structure, first in, last out #}
 {# use data.extras list to save English description #}
 {{ form.input('extras__0__key', value='edesc', id='field-extras-0', classes=['hidden']) }}
 {% if data.extras %}
     {% set extra0value = data.extras[0].value %}
 {% else %}
     {% set extra0value = '' %}
 {% endif %}
 {{ form.markdown('extras__0__value', label=_('English Description'), id='field-extras-0', placeholder='A little information about my organization...', value=extra0value) }}

```

* 語言切換，修改 ** snippets/organization.html **

```html
      {# ... #}

      {# customized : show english or chinese #}
      <h1 class="heading">{{ h.getLangLabel(organization.extras[1].value,organization.title) }}
        {% if organization.state == 'deleted' %}
          [{{ _('Deleted') }}]
        {% endif %}
      </h1>
      {% endblock %}
      {% block description %}
      {% if organization.description %}
        <p>
          {# customized : show english or chinese #}
          {{ h.markdown_extract(h.getLangLabel(organization.extras[0].value,organization.description), 180) }}
          {% link_for _('read more'), controller='organization', action='about', id=organization.name %}
        </p>
      {% else %}
      
      {# ... #}
```

* 修改組織頁面 (organization/) 底下清單語言切換，修改 ** organization/snippets/organization_item.html **

```html
  {# ... #}

  {% block title %}
    {# customized : notice must use h.get_featured_organizations() to fetch all information #}
    <h3 class="media-heading">{{ h.getLangLabel(organization.extras[1].value, organization.display_name) }}</h3>
  {% endblock %}
  {% block description %}
    {# customized : notice must use h.get_featured_organizations() to fetch all information #}
    {% if organization.description %}
      <p>{{ h.markdown_extract( h.getLangLabel(organization.extras[0].value, organization.description), extract_length=80) }}</p>
    {% endif %}
  {% endblock %}
  
  {# ... #}
```

* 修改首頁底下清單語言切換，修改 ** snippets/organization_item.html **

```
       {# ... #}

        {% block organization_item_header_title %}
          {# customized #}
          <h3 class="media-heading"><a href={{ url }}>{{ h.getLangLabel(organization.extras[1].value,organization.name) }}</a></h3>
        {% endblock %}
        {% block organization_item_header_description %}
          {# customized #}
          {% if organization.description %}
            {% if truncate == 0 %}
              <p>{{ h.markdown_extract( h.getLangLabel(organization.extras[0].value, organization.description))|urlize }}</p>
            {% else %}
              <p>{{ h.markdown_extract( h.getLangLabel(organization.extras[0].value, organization.description), truncate)|urlize }}</p>
            {% endif %}
          {% endif %}
        {% endblock %}
        
        {# ... #}
```





