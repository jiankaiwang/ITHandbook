# ckanext-download

<script type="text/javascript" src="../js/general.js"></script>

### 安裝 plugin 至開發測試版
---

* 安裝

```bash
. /usr/lib/ckan/default/bin/activate
cd /usr/lib/ckan/default/src/ckan/ckanext
git clone https://github.com/jiankaiwang/ckanext-download.git
cd ./ckanext-download
python ./setup.py develop
```

* 組態設定，假設開發版使用組態檔為 **/etc/ckan/default/development.ini**

```bash
$ vim /etc/ckan/default/development.ini
```

並加入底下組態

```ini
ckan.plugins = download
ckan.download.psqlUrl = postgresql://(dbuser):(dbpass)@(dbhost)/(dbname)
```

若要加入 template snippet 檢視

```ini
ckan.download.template = true
```

若有 view_tracking (參考 [http://docs.ckan.org/en/latest/maintaining/tracking.html](http://docs.ckan.org/en/latest/maintaining/tracking.html) 設定)

```
[app:main]
ckan.tracking_enabled = true
```

* 透過 **paster serve** 開始開發版

```bash
$ paster serve /etc/ckan/default/development.ini
```

* 透過瀏覽器並檢視 port 5000 即可

### 安裝 plugin 至正式版
---

* 安裝

```bash
. /usr/lib/ckan/default/bin/activate
cd /usr/lib/ckan/default/src/ckan/ckanext
git clone https://github.com/jiankaiwang/ckanext-download.git
cd ./ckanext-download
python ./setup.py install
```

* 組態設定，假設開發版使用組態檔為 **/etc/ckan/default/production.ini**

```bash
$ vim /etc/ckan/default/production.ini
```

並加入底下組態

```ini
ckan.plugins = download
ckan.download.psqlUrl = postgresql://(dbuser):(dbpass)@(dbhost)/(dbname)
```

若要加入 template snippet 檢視

```ini
ckan.download.template = true
```

若有 view_tracking (參考 [http://docs.ckan.org/en/latest/maintaining/tracking.html](http://docs.ckan.org/en/latest/maintaining/tracking.html) 設定)

```
[app:main]
ckan.tracking_enabled = true
```

* 重啟服務即可，假設建置在 nginx 伺服器之上

```bash
sudo service ckan restart
sudo service nginx restart
```

* 透過瀏覽器並檢視 port 5000 即可

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


