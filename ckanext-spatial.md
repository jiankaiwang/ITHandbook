# ckanext-spatial
###功能簡介
---
* Spatial Metadata
建立地理空間資訊之索引。

* Spatial Search Widget
    * 按地圖搜尋資料集 “spatial” 欄位的地理空間資訊。安裝完成後，即可在資料集清單顯示頁面的左下角看到 “Filter by location” 的區塊，此區塊並可放大後，依照使用者選取的地理區域篩選出符合的資料集。
    * 欲使用此功能，請在 ckan.plugins 加入 spatial_metadata 與 spatial_query。

* Dataset Extent Map
    * 以地圖顯示資料集 “spatial” 欄位所述之地理空間資訊 (僅支援 geojson 格式)。如下圖所示，在「額外的資訊」中填寫的 spatial geojson 資訊，將顯示在左下角的 Dataset extent 中。
    * 欲使用此功能，請在 ckan.plugins 加入 spatial_metadata。

![](extentMap.png)

* CSW Server
    * 提供 CSW 服務介面。

* Spatial Harvesters
    * 提供地理空間相關的 harvesters，可以將 CSW, WAF, spatial metadata document 等資料目錄來源的後設資料擷取下來並匯入 CKAN 之中，資料本身仍位於原資料目錄之網站。
    * 此 harvester 係實作 ckanext-harvest 套件之 harvester interface。
    * 欲使用此功能，請安裝 [ckanext-harvest 外掛](https://github.com/okfn/ckanext-harvest) 並在 ckan.plugins 加入 csw_harvester, doc_harvester 與 waf_harvester。

| 註解 |
| -- |
| \* 若您有成功安裝 ckanext-spatial 套件並啟用上述三個 plugins，應該可以看到 “CKAN, CSW Server, Web Accessible Folder (WAF), Single spatial metadata document” 四種 source 類別。<br> \* ckanext-spatial 提供的 havester 現階段 (0.2) 並不穩定，匯入大量資料很緩慢（實測 11,400 筆左右需時 3 小時），且容易因 source 缺少某些欄位值或 source 資料格式與 harvester（及其相依的 python library）不符而引發 python exception。<br> \* 實測結果，CSW 可能會有問題（見下方說明）、WAF 可以運作（但資料需符合 ISO 19139 規範）。 |





