# Change Language Selector

<script type="text/javascript" src="../js/general.js"></script>

### 透過隱藏其他語言選擇列方式
---

* 路徑

```bash
/usr/lib/ckan/default/src/ckan/ckan/templates
  |- snippets/
    |- language_selector.html	# 修改語言
    |- customized_language_selector.html # 自製化語言列且放在頁面頂
```

* ** customized_language_selector.html ** 內容為

```html
{% set current_url = request.environ.CKAN_CURRENT_URL %}
{% set current_lang = request.environ.CKAN_LANG %}

{# customized : show only English and Chinese and put on the top of page #}
{% set locale_option = ["en","zh_TW"] %}
{% for locale in h.get_available_locales() %}
  {% if locale in locale_option %}
<li><a href="{% url_for current_url, locale=locale %}">{{ locale.display_name or locale.english_name }}</a></li>
  {% endif %}
{% endfor %}
```