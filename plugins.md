# 擴充
* DataStore 是一個內建於 CKAN 的擴充套件 (extension)，透過一獨立資料庫儲存上傳至 CKAN 之結構資料內容（CSV 或 XLS 檔案，無論為上傳至本機的檔案或僅有連結）。

* DataPusher 是一個 CKAN 的擴充套件 (extnsion)，用以於新增前述的結構資料至 CKAN 時，自動上傳資料內容至 DataStore 資料庫。

* ckanext-spatial 是一個 CKAN 的擴充套件 (extension)，提供地理資訊相關功能。<br>
詳細介紹可以參考 [ckanext-spatial 的官方文件](http://docs.ckan.org/projects/ckanext-spatial/en/latest/)。

* ckanext-geoview 是一個 CKAN 的擴充套件 (extension)，提供地理資料預覽功能。<br>
詳細介紹可以參考 [ckanext-geoview 的 github 頁面](https://github.com/ckan/ckanext-geoview) 。

* ckanext-harvest 是一個 CKAN 的擴充套件（extension），提供一可自訂之介面（interface），以擷取其他網站（或服務）之 metadata，並匯入為 CKAN 資料集。harvest 的運作大致可分為三步驟（同時也是設計 harvesting interface 的主要結構）:
    * gather: 取得 harvest source 的 id, 數量等基本資訊。
    * fetch: 取得 source 中每個 object（物件，或稱資料集）之 metadata。
    * import: 將上一階段取得的 metadata 轉換並建立為 CKAN package（資料集）。







