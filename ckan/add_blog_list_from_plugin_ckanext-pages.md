# 加入 ckanext-pages 中 blog 清單 (最新消息為例)

<script type="text/javascript" src="../js/general.js"></script>

###原模組
---

* 此統計模組為原 layout2.html 的 snippet 模組，原相依位置為

```bash
# 位於 template 底下，為 homepage 中顯示的一部分
/usr/lib/ckan/default/src/ckan/ckan/templates/
  |- home/
    |- layout2.html                         # 於此呼叫 promoted.html 內容
      |- snippets/customized_promoted.html  # 顯示框架
      |- snippets/latest_item.html          # 顯示項目
```

* 將此取出，並假設以 **layout1.html** 為主模版開發

```bash
# 複製一份 promoted.html 內容為 customized_promoted.html 並準備引用
cd /usr/lib/ckan/default/src/ckan/ckan/templates
cp ./home/snippets/promoted.html ./home/snippets/customized_promoted.html

# 位於 template 底下，為 homepage 中顯示的一部分
/usr/lib/ckan/default/src/ckan/ckan/templates/
  |- home/
    |- layout1.html  # 以此為模版，並於此頁面下加入客製化統計頁面
```

###客製化模組
---

* 假設使用 ** layout1.html ** 作為主要顯示的模組，此需要管理員登入後於「設置」中「首頁」項目中亦選擇「Introductory area, search, ... 」選項才是以 layout1.html 為模組。

* 將剛複製出的 ** customized_promoted.html ** 加入 ** layout1.html **，並放置於主畫面牆之下。

```html
<div role="main" class="homepage-data-section">
  <div class="container">
    <div class="row row1 section-topic general-font-family">
     {# 重新設定區塊主題，getLangLabel 為自定義函式 (位於 helper.py 中) #}
     {{ h.getLangLabel("Browser more topics and data.", "瀏覽更多的資料與內容") }}
    </div>
    <div class="row row2">
      <div class="span6 col1">
        {% block stats %}
          {% snippet 'home/snippets/customized_promoted.html' %}
        {% endblock %}
      </div>
      <div class="span6 col2">

      </div>
    </div>
  </div>
</div>
```

* ** customized_promoted.html ** 內容為顯示最新消息的清單

```html
{% set intro = g.site_intro_text %}

<div class="box" style="padding-bottom: 20px;">
  <header class="hp-header-bg">
    {% if intro %}
      {{ h.render_markdown(intro) }}
    {% else %}
      <h3 class="page-heading module-content">
      {{ h.getLangLabel("Latest News","最新消息") }}
      </h3>
    {% endif %}
  </header>

  {# cdc #} 
  {% block home_image %}
  {% snippet 'snippets/latest_item.html' %}
  {% endblock %}
  
</div>
```

* ** latest_item.html ** 內容為顯示最新消息的3則清單

```html
{% set posts = h.get_recent_blog_posts(number=3) %}

{% for post in posts %}
    <div class="blog-title dataset-item module-content">
        <h3 class="dataset-heading">
            <i class="icon-pushpin"></i> &nbsp;&nbsp;
            <a href="{{ h.url_for(controller='ckanext.pages.controller:PagesController', action='blog_show', page='/' + post.name) }}">{{ h.getLangLabel(post.ename,post.cname) }}</a>
            <br>
            {% if post.publish_date %}
                <small> {{ h.render_datetime(post.publish_date) }} </small>
            {% endif %}
        </h3>
        {{ h.markdown_extract(h.getLangLabel(post.econtent, post.content))| truncate(50) }}
           <br>
    </div>
{% endfor %}
```


