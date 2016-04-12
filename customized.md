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

* 初始畫面

```Bash
$ vim /usr/lib/ckan/default/src/ckan/ckan/templates/home/index.html
```




