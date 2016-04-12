# 客製化頁面

<script type="text/javascript" src="gitbook/app.js"></script>
<script type="text/javascript" src="js/general.js"></script>

ckan2 透過 Jinja 模板來建立頁面。而 Jinja 是一個以 Python 為基底的網頁模板引擎。其建構頁面方式與主流的 JSP、PHP、ASPX 等網頁語言雷同，透過 inline-based 語法，將指令碼嵌入 html 文件中。

###頁面實體路徑
---

* 主要頁面實體位置

```Bash
$ cd /usr/lib/ckan/default/src/ckan/ckan/templates/
```

* 引用資源實體位置，包含 CSS、Javascript、image 等

```Bash
$ cd /usr/lib/ckan/default/src/ckan/ckan/public/base/
```

* 初始頁面

```Bash
$ vim /usr/lib/ckan/default/src/ckan/ckan/templates/home/index.html
```

* 各主要資源路徑

```Bash
templates/
  |-base.html      # A base template with just core HTML structure
  |-page.html      # A base template with default page layout
  |-header.html    # The site header.
  |-footer.html    # The site footer.
  |-snippets/      # A folder of generic sitewide snippets
  |-home/
      |-index.html   # Template for the index action of the home controller
      |-snippets/    # Snippets for the home controller
  |-user/

    ...

public/base/
  |-css/           # main style designment
  |-images/	     # main image location
  |-javascript/	 # main javascript libraries
```

* 頁面實際引用架構
---

```Bash
templates/home/index.html
  |-templates/page.html
      |-templates/base.html # 從這裡開始
      |-templates/header.html
      |-templates/footer.html
          |-templates/home/snippets/language_selector.html
  |-templates/home/layout1.html # 主要客製化位置
      |-templates/home/snippets/promoted.html
      |-templates/home/snippets/search.html
      |-templates/home/snippets/featured_group.html
      |-templates/home/snippets/featured_organization.html
```

* 頁面設計說明

1. 主要客製化頁面 layout，共有 3 份，即 layout1.html、layout2.html 與 layout3.html。此 3 個頁面分別對應到系統「設置」中 (唯有系統管理員能調整) 的首頁樣式。

2. Ckan 採用 Jinja 設計頁面方式，透過嵌入 html 頁面 (即 .html 檔案) 方式進行模組式頁面開發與設計。預設環境下有 4 個主要子頁面模組 (皆位於 templates/home/snippets) ，即 promoted.html、search.html、featured_group.html 與 featured_organization.html。

3. 頁面 featured_group.html 定義了「群組」顯示的頁面，而 featured_organization.html 則定義了「組織」顯示的頁面。兩頁面除了主題外，亦包含其子資料集的清單。





