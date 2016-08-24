# 在 chanext-pages 中加入 developer 程式碼區塊

<script type="text/javascript" src="../js/general.js"></script>

### 使用 syntaxhighlighter
---

* 底下以 3.0.83 為例

* 將解壓縮後必要資源 ** scripts/shCore.js **, ** scripts/shBrushPython.js ** 與 ** scripts/shBrushJScript.js ** 置於伺服器 ** public/base/javascript/syntaxhighlighter ** 底下

* 將解壓縮後必要資源 ** styles/shCoreDefault.css ** 置於伺服器 ** public/base/css ** 底下

* 將 css 加入 ** base.html 中來引用

```bash
. /usr/lib/ckan/default/bin/activate
vim /usr/lib/ckan/default/src/ckan/ckan/templates/base.html
```

透過 link 方式加入

```html
<link rel="stylesheet" href="/base/css/shCoreDefault.css" />
```

* 將 js 加入 ** resource.config ** 中

```bash
. /usr/lib/ckan/default/bin/activate
vim /usr/lib/ckan/default/src/ckan/ckan/public/base/javascript/resource.config
```

加入 main 底下

```bash
main =

    ...

    syntaxhighlighter/shCore.js
    syntaxhighlighter/shBrushJScript.js
    syntaxhighlighter/shBrushPython.js
```

後重啟服務即可

```bash
sudo restart ckan
```

### 設計程式碼區塊
---

* 設計 templates/snippets/developer.html

```html
<div class="row">
<div class="col-lg-12" id="developerContainer">
  <ul id="developerTab" class="nav nav-tabs nav-justified">
    <li class="active">
      <a href="#service-one" data-toggle="tab">
        <h3><i class="icon-cloud-download"></i> {{ h.getLangLabel("Access Data","取得資料") }}</h3>
      </a>
    </li>
    <li class="">
      <a href="#service-two" data-toggle="tab">
        <h3><i class="icon-info-sign"></i> {{ h.getLangLabel("Data Schema","取得綱目") }}</h3>
      </a>
    </li>
    <li class="">
      {#
      <a href="#service-three" data-toggle="tab">
        <h3><i class="icon-external-link"></i> {{ h.getLangLabel("option3","選項3") }}</h3>
      </a>
      #}
    </li>
    <li class="">
      {#
      <a href="#service-four" data-toggle="tab">
        <h3><i class="icon-external-link"></i> {{ h.getLangLabel("option4","選項4") }}</h3>
      </a>
      #}
    </li>
    <li class="">
      {#
      <a href="#service-five" data-toggle="tab">
        <h3><i class="icon-external-link"></i> {{ h.getLangLabel("option5","選項5") }}</h3>
      </a>
      #}
    </li>
  </ul>

  <div id="myTabContent" class="tab-content-2">
    <!-- o1 start -->
    <div class="tab-pane fade active in" id="service-one">

    <pre class="brush: python; gutter: false;">

# use library
import urllib

# query string
url = 'http://data.cdc.gov.tw/api/action/datastore_search?resource_id=fed8ae7f-e420-4f80-9824-62698b2236b6&limit=5&q=title:jones'

# start to fetch data
fileobj = urllib.urlopen(url)

# print data content
print fileobj.read()

    </pre>


    </div>
    <!-- o1 end -->

    <!-- o2 start -->
    <div class="tab-pane fade" id="service-two">

    </div>
    <!-- o2 end -->

    <!-- o3 start -->
    <div class="tab-pane fade" id="service-three">

    </div>
    <!-- o3 end -->

    <!-- o4 start -->
    <div class="tab-pane fade" id="service-four">

    </div>
    <!-- o4 end -->

    <!-- o5 start -->
    <div class="tab-pane fade" id="service-five">

    </div>
    <!-- o5 end -->

  </div>

</div>
</div>		
```

* 設計 css

編輯 general.css 檔案

```bash
vim /usr/lib/ckan/default/src/ckan/ckan/public/base/css/general.css
```

填入底下內容

```css
/*
* developer.html
*/
.tab-content-2 > .tab-pane {
  display: none;
}
.tab-content-2 > .active {
  display: block;
}
#developerContainer {
  margin-top: 50px;
  margin-bottom: 20px;
  padding-left: 2%;
  padding-right: 2%;
}
#developerTab li {
  width: 20%;
  text-align: center;
}

@media only screen and (max-width: 767px) {
  /*
  * developer.html
  */
  #developerContainer {
    padding-left: 0px;
    padding-right: 0px;
  }
  #developerTab li {
    width: 100%;
    text-align: center;
  }
}
```

* 設計 javascript

編輯 general.js 檔案

```bash
vim /usr/lib/ckan/default/src/ckan/ckan/public/base/javascript/custom/general.js
```

填入底下內容，需要注意配合上方的 id

```javascript
/*
* desc set SyntaxHighlighter
*/
function setSyntaxHighlighter() {
  if(window.jQuery && $('#developerContainer').length) {
    SyntaxHighlighter.all();
  }
}

/*
* desc : initialize homepage
*/
$(function () {
  
  // ...
  
  setSyntaxHighlighter();

  // ...

});
```

* 加入 developer 頁面中

```bash
vim /usr/lib/ckan/default/src/ckanext-pages/ckanext/pages/theme/templates_main/ckanext_pages/page.html
```

```html

  {# ... #}
  
      <div class="ckanext-pages-content">
        {% set editor = h.get_wysiwyg_editor() %}
        {% if editor %}
          <div>
              {{c.page.content|safe}}
          </div>
        {% else %}
          {# customized #}
          {{ h.getLangLabel(h.render_content(c.page.econtent),h.render_content(c.page.content)) }}
          {% if c.page.ename == "Suggestion" %}
              {% snippet "snippets/disqus.html" %}
          {% elif c.page.ename == "Developer" %}
              {% snippet "snippets/developer.html" %}
          {% endif %}
        {% endif %}
      </div>
  
  {# ... #}


```

* 重新安裝並重啟服務即可

```bash
# 透過 setup.py 安裝
cd /usr/lib/ckan/default/src/ckanext-pages/
python ./setup.py install

# 重啟服務
sudo restart ckan
```



