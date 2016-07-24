# 使用 CSS

<script type="text/javascript" src="../js/general.js"></script>

CKAN 的網頁模板是透過 Python Template Engine, Jinja 來設計，但仍是透過 inline-code 方式嵌入 html page 的方式作呈現，因此可以直接透過連結方法在 CKAN 的 page 中使用 CSS。

###直接導入 CSS link
---

此方法與一般 html 文件使用 CSS 樣式設計相同，即在需要加入 css 的 jinja 頁面中加入 CSS link，而在 jinja 模板中也有標示可以直接透過 link 方式將 CSS 直接導入，如在 ** templates/base.html ** 中，

```Html
{# 在 jinja 中註解的使用方式為一個 { 與 # 的結合。 #}

{#
The styles block allows you to add additonal stylesheets to the page in
the same way as the meta block. Use super() to include the default
stylesheets before or after your own.

Example:

  {% block styles %}
    {{ super() }}
    <link rel="stylesheet" href="/base/css/custom.css" />
  {% endblock %}
#}
```

一般而言，建議在預設路徑下加入自定義的 css，以 general.css 放置於 /base/css/general.css 為例，可以直接在 ** base.html ** 中加入 css link；

```Html
{# ... #}
    <link rel="stylesheet" href="/base/css/custom.css" />
  {% endblock %}
#}

{# 加入自定義的 CSS #}
<link rel="stylesheet" href="/base/css/general.css" />

{# ... #}
```
