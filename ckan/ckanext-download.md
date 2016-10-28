# ckanext-download

<script type="text/javascript" src="../js/general.js"></script>

### 安裝 plugin
---


### 修正 template 以搭配其他 plugins
---

* 修正 plugin 中 **templates/snippets/package_item.html**



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

* 修改首頁的「熱門資料」標籤


