# 擴充

<script type="text/javascript" src="../js/general.js"></script>

* DataStore 是一個內建於 CKAN 的擴充套件 (extension)，透過一獨立資料庫儲存上傳至 CKAN 之結構資料內容（CSV 或 XLS 檔案，無論為上傳至本機的檔案或僅有連結）。

* DataPusher 是一個 CKAN 的擴充套件 (extnsion)，用以於新增前述的結構資料至 CKAN 時，自動上傳資料內容至 DataStore 資料庫。

* ckanext-spatial 是一個 CKAN 的擴充套件 (extension)，提供地理資訊相關功能。<br>
詳細介紹可以參考 [ckanext-spatial 的官方文件](http://docs.ckan.org/projects/ckanext-spatial/en/latest/)。

* ckanext-geoview 是一個 CKAN 的擴充套件 (extension)，提供地理資料預覽功能。<br>
詳細介紹可以參考 [ckanext-geoview 的 github 頁面](https://github.com/ckan/ckanext-geoview) 。

* ckanext-harvest 是一個 CKAN 的擴充套件（extension），提供一可自訂之介面（interface），以擷取其他網站（或服務）之 metadata，並匯入為 CKAN 資料集。

* 資源描述架構（Resource Description Framework）及 RDF Schema 係由 W3C 制定，用來解決資源描述問題的規範，利用階層式的概念及屬性描述資料的 metadata。

* Schema Mapping， ckan 資料集的所有欄位都可以自 RDF 取得，其對應請參見官方說明 [Schema Mapping](http://docs.ckan.org/en/ckan-2.0.2/linked-data-and-rdf.html#schema-mapping)。

* idatasetform : 可用來客製化 **額外** 資料欄位的 plugin，此說明為 **自製** 模組。

* ckanext-scheming : 可用於客製化完整資料欄位的 plugin。

* ckanext-pages : 可用來新增頁面 (pages) 與文章 (blog) 的 plugin。

* Disqus : 用來紀錄 comment 的工具