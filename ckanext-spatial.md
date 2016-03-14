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


其使用方式與一般 CKAN harvester 相同，請參考 [ckanext-harvest](http://jkwpro.no-ip.info:8080/ckan2/index.html#document-ckanext-harvest)
* TGOS（國土資訊圖資服務平台）CSW source harvesting 經驗：
    * 嘗試將 TGOS 提供之 [CSW 服務](http://tgos.nat.gov.tw/tgos/Web/TGOS_Home.aspx) ，透過 spatial harvester 匯入 CKAN，結果會發生 list out of range exception。
    \* 原因是 spatial harvester 使用的 OWSLib 這個 python library 判斷 csw source 的 xml tag gmd:identificationInfo 時，認定其下只有一個子 tag MD_DataIdentification ， 但 TGOS 有部份的資料卻有兩個 MD_DataIdentification （ 如此例 ） ，因此造成 python 錯誤。
    * 原先懷疑是 TGOS 不符合 ISO19139 規範，但基本上 ISO 應無要求 tag 的數量只能有一個。
    * 所以 TGOS 匯入 CSW 失敗，既不是 ckanext-spatial 套件本身的問題，也不是 TGOS csw 不符合 ISO19139 規範，其實是 OWSLib 的問題。此問題可以藉由簡單修改 OWSLib 原始碼解決。<br>
打開 /usr/lib/ckan/default/local/lib/python2.7/site-packages/owslib/iso.py ，搜尋 'gmd:identificationInfo' ，將：
```Python
for idinfo in md.findall(util.nspath_eval('gmd:identificationInfo', namespaces)):
```
修改為：
```Python
for idinfo in list(md.findall(util.nspath_eval('gmd:identificationInfo', namespaces)))[0]:
```
即可，促使他擷取第一筆資料。<br>
由於 ISO19139 對資料格式的規範並不是非常的嚴謹，今後匯入 CSW 時，仍需 case by case 作調整。<br>
PS. TGOS 有 36,000 個資料集，一次性抓下來需要一天

###系統需求
---
* CKAN (>=1.8)
* solr (>=3.1) 或 PostGIS (>=1.3)
* 若欲使用外掛 [Spatial Harvesters](http://jkwpro.no-ip.info:8080/ckan2/index.html#spatial-harvesters) 則需要安裝擴充套件 [ckanext-harvest](http://jkwpro.no-ip.info:8080/ckan2/index.html#ckanext-harvest)

| 註解 |
| -- |
| \* 若依照本文件的教學安裝 CKAN，你應該已經擁有 PostGIS 外之所有套件<br> \* Dataset Extent Map 與 Spatial Search Widget 兩個 snippets 需要 CKAN>=2.0 |

###安裝
---
* 安裝 PostGIS
請直接參考 [官方的安裝說明](http://docs.ckan.org/projects/ckanext-spatial/en/latest/install.html#install-postgis-and-system-packages) （注意此處會因 PostgreSQL 版本而有些許差異）。

* 安裝 ckanext-spatial 套件
```Bash
(pyenv) $ pip install -e "git+https://github.com/ckan/ckanext-spatial.git#egg=ckanext-spatial"
```

* 修改 ckanext-spatial 套件：
因目前 ckanext-spatial 尚未對應 solr 5.x，必須做一些修改。<br>
打開 /usr/lib/ckan/default/src/ckanext-spatial/ckanext/spatial/plugin.py，修改以下這段：<br>
```Bash
search_params['fq_list'].append('+spatial_geom:"Intersects({minx} {miny} {maxx} {maxy})"'.format(minx=bbox['minx'],miny=bbox['miny'],maxx=bbox['maxx'],maxy=bbox['maxy']))
```
為
```Bash
search_params['fq_list'].append('+spatial_geom:"Intersects(ENVELOPE({minx}, {maxx}, {maxy}, {miny}))"'.format(minx=bbox['minx'],miny=bbox['miny'],maxx=bbox['maxx'],maxy=bbox['maxy']))
```

| 註解 |
| -- |
| 修改後請記得重新啟動 CKAN |

* 安裝其他需要的 Python 套件：
```Bash
(pyenv) $ pip install -r pip-requirements.txt
```

* 下載 [JTS 1.13 或以上版本](http://search.maven.org/#search%7Cgav%7C1%7Cg%3A%22com.vividsolutions%22%20AND%20a%3A%22jts%22) 並複製 jar 檔案至 solr 目錄：
```Bash
$ sudo -u solr cp jts-1.13.jar /opt/solr/server/solr-webapp/webapp/WEB-INF/lib/.
```

* 修改 CKAN 設定檔：
打開 CKAN 設定檔（一般位於 /etc/ckan/default/），並加入：<br>
```Bash
ckanext.spatial.search_backend = solr-spatial-field
```
並修改 ckan.plugins 參數，增加需要的外掛（參見上文介紹）。

* 修改 solr schema：
打開 solr schema（一般位於 /usr/lib/ckan/default/src/ckan/ckan/config/solr/schema.xml），找到 &lt;fields&gt; 區段，加上：
```xml
<fields>
    <!-- ... -->
    <field name="spatial_geom"  type="location_rpt" indexed="true" stored="true" multiValued="true"/>
</fields>
```
找到 &lt;types&gt; 區段，加上：
```xml
<types>
    <!-- ... -->
    <fieldType name="location_rpt" class="solr.SpatialRecursivePrefixTreeFieldType"
        spatialContextFactory="com.spatial4j.core.context.jts.JtsSpatialContextFactory"
        autoIndex="true"
        distErrPct="0.025"
        maxDistErr="0.000009"
        distanceUnits="degrees"/>
</types>
```

* 重新建立 solr 搜尋索引：
```Bash
$ (pyenv) paster --plugin=ckan search-index rebuild -c /etc/ckan/default/development.ini
```

* 新增 Spatial Search Widget：<br>
打開 CKAN source 目錄下的 ./ckan/templates/package/search.html，在 % block secondary_content % 段落中加入<br>
```Python
% snippet "spatial/snippets/spatial_query.html" %
```

* 新增 Dataset Extent Map (widget)：<br>
打開 CKAN source 目錄下的 ./ckan/templates/package/read.html，在最後加入<br>
```Python

```





