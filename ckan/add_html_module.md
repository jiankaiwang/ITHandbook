# 加入客製化 html 模組

<script type="text/javascript" src="../js/general.js"></script>

作為一個網路平台的伺服器，CKAN 當然也支援開發者設計視覺化網頁內容，一般而言可以透過兩種方式來達成，一是直接設計新的完整頁面，二是設計區塊內容，並透過 ** snippet ** 函式將其注入 html 文件中的某一區塊 (因為 CKAN 已內建多種 javascript library，如 bootstrap.js 等，對於 RWD 的支援也是相當完整)。

###透過 snippet 方式將自訂網頁模組加入主 html 架構中
---

底下幾一個範例，在 layout1.html (預設包含 Introductory area, search, featured group and featured organization) 中加入兩自訂網頁模組。

相關 html 文件路徑如下；

```Bash
templates
    |-home
        |-layout1.html                   # html 主架構頁面
        |-snippets                       # 客製化網頁模組的位置
            |-customized-all.html        # 引用的客製化網業模組
            |-customized-1.html          # 引用的客製化網頁模組 (左欄或上方)
            |-customized-2.html          # 引用的客製化網頁模組 (右欄或下方)
```

在 html 主架構中，可以透過 snippet 函式將自定義模組加入已定義好的區塊中，如下；

```Html
<!-- -->

<div role="main">
	{#
		自定義一個位於 layout1 中的顯示區塊
		html code here 並無 RWD 的設計
	#}
	<div class="container">
		<div class="row row1 section-topic general-font-family">
			(區塊主題)
		</div>
		<div class="row row1">
			{# 列 (row) 設計，不分左或右欄 #}
			{% block customized-all %}
				{% snippet 'home/snippets/customized-all.html' %}
			{% endblock %}
		</div>
		<div class="row row1">
			<div class="span6 col1">
				{# 位於左側欄 #}
				{% block customized-1 %}
					{% snippet 'home/snippets/customized-1.html' %}
				{% endblock %}
			</div>
			<div class="span6 col2">
				{# 位於右側欄 #}
				{% block customized-2 %}
					{% snippet 'home/snippets/customized-2.html' %}
				{% endblock %}
			</div>
		</div>
	</div>
</div>

<!-- -->
```









