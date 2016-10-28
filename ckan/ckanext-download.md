# ckanext-download

<script type="text/javascript" src="../js/general.js"></script>

### 安裝 plugin
---


### 修正 template 以搭配其他 plugins
---

* 修正 plugin 中 **ckanext/download/templates/snippets/package_item.html**，以便可以與 plugin ckanext-scheming 共同使用。

```html

{# ... #}

{# customized : modify titles on dataset list under page dataset/ #}
{# {% set title = package.title or package.name %} #}
{% set title = h.markdown_extract(h.getLangLabel(package.e_title, package.c_title), extract_length=80) %}

{# customized : modify descriptions on dataset list under page dataset/ #}
{% set notes = h.markdown_extract(h.getLangLabel(package.ed_notes, package.cd_notes), extract_length=100) %}

{# ... #}

```

* 修正增加「排序依照」中的選項 ** templates/package/search.html **

```html
{# ... #}

      {% block form %}
        {% set facets = {
          'fields': c.fields_grouped,
          'search': c.search_facets,
          'titles': c.facet_titles,
          'translated_fields': c.translated_fields,
          'remove_field': c.remove_field }
        %}
        {% set sorting = [
          (_('Relevance'), 'score desc, metadata_modified desc'),
          (_('Name Ascending'), 'title_string asc'),
          (_('Name Descending'), 'title_string desc'),
          (_('Last Modified'), 'metadata_modified desc'),
          ( h.getLangLabel('Recently Popular','近期熱門'), 'views_recent desc') if g.tracking_enabled else (false, false),
          ( h.getLangLabel('Popular','熱門'), 'views_total desc') if g.tracking_enabled else (false, false) ]
        %}
        {% snippet 'snippets/search_form.html', form_id='dataset-search-form', type='dataset', query=c.q, sorting=sorting, sorting_selected=c.sort_by_selected, count=c.page.item_count, facets=facets, show_empty=request.params, error=c.query_error, fields=c.fields %}
      {% endblock %}

{# ... #}
```

* 修改首頁的「熱門資料」標籤，**templates/home/snippets/customized_popular.html**

```html
{% set intro = g.site_intro_text %}

<div class="box" style="padding-bottom: 20px;">
  <header class="hp-header-bg">
    {% if intro %}
      {{ h.render_markdown(intro) }}
    {% else %}
      <h3 class="page-heading module-content">
      {{ h.getLangLabel("Recently Popular Data","近期熱門資料") }}
      </h3>
    {% endif %}
  </header>

  {# customized #}
  {% block home_image %}
  {% snippet 'snippets/popular_data.html' %}
  {% endblock %}

</div>
```


