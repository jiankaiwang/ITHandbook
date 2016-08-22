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
  |- snippet/
    |- group_item.html             # 主要顯示頁面
  |- group/
    |- snippets/
      |- group_list.html           # group 網頁底下的顯示畫面，呼叫 group/snippet/group_item.html
      |- group_item.html           # group 顯示畫面內容
      |- info.html                 # 各 group 的頁面內容
    |- read_base.html              # group 頁面內容框架, 呼叫 info.html 與 feeds.html
    
```

* 依目前群組數顯示群組 (** home/snippets/featured_group.html  **)

```html
{% set groups = h.get_featured_groups(count=h.getLen(groups)) %}

{% for group in groups %}
    <div class="span4 hp-category hp-category-mb">
        {# ... #}
```

### 修改首頁中的 group 清單
---

* 修改 home/layout1.html 如下

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

* 修改 home/snippets/featured_group.html 如下

```html
{% set groups = h.get_featured_groups(count=5) %}

{% for group in groups %}

    <div class="span4 hp-category hp-category-mb">
            {% snippet 'snippets/group_item.html', group=group, truncate=15, truncate_title=35 %}
    </div>

{% endfor %}
```

* 客製化 snippet/group_item.html 如下

```html
{% block group_item %}
  <section class="group-list module module-narrow module-shallow">
    {% block group_item_header %}
      <header class="module-heading">
        {% set truncate=truncate or 0 %}
        {% set truncate_title = truncate_title or 0 %}
        {% set title = group.title or group.name %}
        
        {# customized : image source #}
        {# original : img src is group.image_display_url ; use chanext plugins : img src is group.url #}
        {% block group_item_header_image %}
          <a class="module-image" href="{{ h.url_for(controller='group', action='read', id=group.name) }}">
            <img src="{{ group.url or h.url_for_static('/base/images/placeholder-group.png') }}" alt="{{ group.name }}" />
          </a>
        {% endblock %}

        {# customized : group title #}
        {% block group_item_header_title %}
          <h3 class="media-heading"><a href="{{ h.url_for(controller='group', action='read', id=group.name) }}">{{ group.title or group.name }}</a></h3>
        {% endblock %}

        {# customized : group description #}
        {# original : description is group.description ; use chanext plugins : description is group.notes #}
        {% block group_item_header_description %}
          {% if group.notes %}
            {% if truncate == 0 %}
              <p>{{ h.markdown_extract(group.notes)|urlize }}</p>
            {% else %}
              <p>{{ h.markdown_extract(group.notes, truncate)|urlize }}</p>
            {% endif %}
          {% endif %}
        {% endblock %}
        
      </header>
    {% endblock %}
  </section>
{% endblock %}
```

### 修改群組頁面 (group/) 下的清單
---

* 修改 ** group/snippets/group_list.html ** 如下 (注意需要修正成底下內容，移除群組功能才會正確)

```html
{% block group_list %}
<ul class="media-grid" data-module="media-grid">
  {% block group_list_inner %}

  {# customized : use h.get_featured_groups() instead of groups #}
  {# notice : count must be modified #}
  {% for group in h.get_featured_groups(count=200) %}
    {% for item in groups %}
      {% if item.id == group.id %}
      {% snippet "group/snippets/group_item.html", group=group, position=loop.index %}
      {% endif %}
    {% endfor %}
  {% endfor %}
  {% endblock %}
</ul>
{% endblock %}
```

* 修改 ** group/snippets/group_item.html ** 如下

```html
{% set type = group.type or 'group' %}
{% set group = group %}
{% set url = h.url_for(type ~ '_read', action='read', id=group.name) %}

{% block item %}
<li class="media-item">
  {% block item_inner %}

  {# customized : original is group.image_display_url, use plugins is group.url #}
  {% block image %}
    <img src="{{ group.url or h.url_for_static('/base/images/placeholder-group.png') }}" alt="{{ group.name }}" class="media-image">
  {% endblock %}
  {% block title %}
    <h3 class="media-heading">{{ group.title }}</h3>
  {% endblock %}

  {% block description %}
    {% if group.notes %}
      <p>{{ h.markdown_extract(group.notes, extract_length=40) }}</p>
    {% endif %}
  {% endblock %}
  
  {# customized : show the count of datasets #}
  {% block datasets %}
    {% if group.packages %}
      {# customzied : get total dataset count in the current group #}
      <strong class="count">{{ _('{num} Datasets').format(num=h.getLen(group.packages)) }}</strong>
    {% elif group.packages == 0 %}
      <span class="count">{{ _('0 Datasets') }}</span>
    {% endif %}
  {% endblock %}
  
  {% block link %}
  <a href="{{ url }}" title="{{ _('View {name}').format(name=group.display_name) }}" class="media-view">
    <span>{{ _('View {name}').format(name=group.display_name) }}</span>
  </a>
  {% endblock %}
  {# customized : only system administrator could delete the groups #}
  {% if c.userobj.sysadmin %}
    <input name="group_remove.{{ group.id }}" value="{{ _('Remove') }}" type="submit" class="btn btn-danger btn-small media-edit" title="{{ _('Remove dataset from this group') }}"/>
  {% endif %}
  {% endblock %}
</li>
{% endblock %}
{% if position is divisibleby 3 %}
  <li class="clearfix js-hide"></li>
{% endif %}
```

### 修改各 group 頁面的內容
---

* 修改 group/snippet/info.html 內容如下

```html
{% block info %}
<div class="module context-info">
  <section class="module-content">
    {% block inner %}
    {% block image %}
    <div class="image">
      <a href="{{ group.url }}">
        {# customized : original - img src is group.image_display_url, use plugins - group.url #}
        <img src="{{ group.url or h.url_for_static('/base/images/placeholder-group.png') }}" width="190" height="118" alt="{{ group.name }}" />
      </a>
    </div>
    {% endblock %}
    {% block heading %}
    <h1 class="heading">
      {{ group.display_name }}
      {% if group.state == 'deleted' %}
        [{{ _('Deleted') }}]
      {% endif %}
    </h1>
    {% endblock %}
    {# customized : original - description is group.description, use plugins - group.notes #}
    {% block description %}
    {% if group.notes %}
      <p>
        {{ h.markdown_extract(group.notes, 180) }}
        {% link_for _('read more'), controller='group', action='about', id=group.name %}
      </p>
    {% endif %}
    {% endblock %}
    {% if show_nums %}
      {% block nums %}
      <div class="nums">
        <dl>
          <dt>{{ _('Followers') }}</dt>
          <dd>{{ h.SI_number_span(group.num_followers) }}</dd>
        </dl>
        <dl>
          <dt>{{ _('Datasets') }}</dt>
          <dd>{{ h.SI_number_span(group.package_count) }}</dd>
        </dl>
      </div>
      {% endblock %}
      {% block follow %}
      <div class="follow_button">
        {{ h.follow_button('group', group.id) }}
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

* 透過 data.extras  修改 ** group/snippets/group_form.html ** 檔案

```html
  {# ... #}

  {# notice : save as stack structure, first in, last out #}
  {# Use data.extras list to save English title #}
  {{ form.input('extras__1__key', value='ename', id='field-extras-1', classes=['hidden']) }}
  {% if data.extras %}
    {% set extra1value = data.extras[1].value %}
  {% else %}
    {% set extra1value = '' %}
  {% endif %}
  {{ form.input('extras__1__value', label=_('English Name'), id='field-extras-1', placeholder=_('Group in English'), value=extra1value, error=errors.title, classes=['control-full'], attrs=attrs) }}

  {# ... #}

  {# notice : save as stack structure, first in, last out #}
  {# use data.extras list to save English description #}
  {{ form.input('extras__0__key', value='edesc', id='field-extras-0', classes=['hidden']) }}
  {% if data.extras %}
    {% set extra0value = data.extras[0].value %}
  {% else %}
    {% set extra0value = '' %}
  {% endif %}
  {{ form.markdown('extras__0__value', label=_('English Description'), id='field-extras-0', placeholder='A little information about group...', value=extra0value) }}
  
  {# ... #}
```

* 各 group 頁面底下語言切換，修改 ** group/snippet/info.html **

```html
    {# ... #}
    
    {% block heading %}
    <h1 class="heading">
      {# customized #}
      {{ h.getLangLabel(group.extras[1].value, group.display_name) }}
      {% if group.state == 'deleted' %}
        [{{ _('Deleted') }}]
      {% endif %}
    </h1>
    {% endblock %}
    {% block description %}
    {% if group.description %}
      <p>
        {# customized #}
        {{ h.markdown_extract(h.getLangLabel(group.extras[0].value, group.description), 180) }}
        {% link_for _('read more'), controller='group', action='about', id=group.name %}
      </p>
    {% endif %}
    {% endblock %}
    
    {# ... #}
```

* 修改群組頁面 (group/) 下的清單語言切換，修改 ** group/snippets/group_item.html **

```html

{# ... #}

{% block image %}
    <img src="{{ group.image_display_url or h.url_for_static('/base/images/placeholder-group.png') }}" alt="{{ group.name }}" class="media-image">
  {% endblock %}
  {% block title %}
    {# customized : notice group must be in function h.get_featured_groups() #}
    <h3 class="media-heading">{{ h.getLangLabel(group.extras[1].value, group.display_name) }}</h3>
  {% endblock %}
  {% block description %}
    {% if group.description %}
      {# customized : notice group must be in function h.get_featured_groups() #}
      <p>{{ h.markdown_extract(h.getLangLabel(group.extras[0].value, group.description), extract_length=80) }}</p>
    {% endif %}
  {% endblock %}
  
{# ... #}
```

* 修改首頁底下的群組清單語言切換，修改 ** snippets/group_item.html **

```html
        {# ... #}

        {% block group_item_header_title %}
          {# customized #}
          <h3 class="media-heading"><a href="{{ h.url_for(controller='group', action='read', id=group.name) }}">{{ h.getLangLabel(group.extras[1].value, group.title) }}</a></h3>
        {% endblock %}
        {% block group_item_header_description %}
          {% if group.description %}
            {# customized #}
            {% if truncate == 0 %}
              <p>{{ h.markdown_extract(h.getLangLabel(group.extras[0].value, group.description))|urlize }}</p>
            {% else %}
              <p>{{ h.markdown_extract(h.getLangLabel(group.extras[0].value, group.description), truncate)|urlize }}</p>
            {% endif %}
          {% endif %}
        {% endblock %}

        {# ... #}
```

* 修改 sitemap 的路徑語言切換，修改 ** group/read_base.html **

```html
{# ... #}

{% block breadcrumb_content %}
  <li>{% link_for _('Groups'), controller='group', action='index' %}</li>
  {# customized #}
  <li class="active">{% link_for h.getLangLabel(c.group_dict.extras[1].value, c.group_dict.display_name)|truncate(35), controller='group', action='read', id=c.group_dict.name %}</li>
{% endblock %}

{# ... #}
```



