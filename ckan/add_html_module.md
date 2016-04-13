# 加入客製化 html 模組

<script type="text/javascript" src="../gitbook/app.js"></script>
<script type="text/javascript" src="../js/general.js"></script>

作為一個網路平台的伺服器，CKAN 當然也支援開發者設計視覺化網頁內容，一般而言可以透過兩種方式來達成，一是直接設計新的完整頁面，二是設計區塊內容，並透過 ** snippet ** 函式將其注入 html 文件中的某一區塊 (因為 CKAN 已內建多種 javascript library，如 bootstrap.js 等，對於 RWD 的支援也是相當完整)。

###透過 snippet 方式將自訂網頁模組加入主 html 架構中
---


