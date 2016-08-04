# ckanext-geoview

<script type="text/javascript" src="../js/general.js"></script>

###功能簡介
---
* OpenLayers Viewer
    * 此功能可以地圖方式呈現 WMS、WFS、GeoJSON、GML、KML、Google Fusion Tables 等地理資料/服務涵括的地理範圍。
    * 欲使用此功能，請在 ckan.plugins 加入 resource_proxy 與 geo_view (2.2 含以下版本則為 geo_preview)。
    * 若僅想預覽部分格式，可在 CKAN 設定檔加入 ckanext.geoview.ol_viewer.formats 變數，詳細設定方式可參考 [擴充套件的說明](https://github.com/ckan/ckanext-geoview#openlayers-viewer) 。

* Leaflet GeoJSON Viewer
    * 以地圖檢視 GeoJSON 檔案。支援 geojson 與 gjson 兩種檔案格式名稱定義。
    * 欲使用此功能，請在 ckan.plugins 加入 resource_proxy 與 geojson_view (2.2 含以下版本則為 geojson_preview)。

* Leaflet WMTS Viewer
    * 以地圖檢視 WMTS 服務圖層。支援 wmts 格式名稱定義。
    * 欲使用此功能，請在 ckan.plugins 加入 resource_proxy 與 wmts_view (2.2 含以下版本則為 wmts_preview)。

### 安裝
---

* 自 github ckeckout source 並安裝：

```Bash
$ cd /usr/lib/ckan/default/src
$ git clone https://github.com/ckan/ckanext-geoview.git
$ cd ckanext-geoview
(pyenv) $ pip install -e .
```

### 組態設定
---

* 因此 plugin 預設使用 MapQuest-OSM 作為底圖，並不需要 API Key 作為讀取底圖的內容，但此政策已經被修改，因此自 2016/7/11 起，已不在支援無 key 的底圖讀取。

* 建議改用 Mapbox 作為底圖，可以透過修改 production.ini 來達成

* **底下使用 ckanext-geoview 的 OpenLayers Viewer 功能**

```bash
# 於 ckan plugin 中加入 resource_proxy geo_view
ckan.plugins = resource_proxy geo_view

# 並於下方加入地圖組態
ckanext.spatial.common_map.type = mapbox
ckanext.spatial.common_map.mapbox.map_id = project-id
ckanext.spatial.common_map.mapbox.access_token = pk.xxxx
```

### 客製化地圖 : geo_view plugin
---

* 修改路徑，如下 (定義在 ** public/resource.config ** 中)

```bash
/usr/lib/ckan/default/src/ckan/ckanext/
  |- ckanext-geoview/ckanext/geoview/public/
    |- css/ol_preview.css
    |- js/vendor/underscore/underscore.js
    |- js/vendor/openlayers2/OpenLayers.js
    |- js/vendor/openlayers2/theme/default/style.css    # 定義地圖 css
    |- js/vendor/ol-helpers/EsriGeoJSON.js
    |- js/vendor/ol-helpers/ol-helpers.js               # 定義 node 樣式
    |- js/ol2_preview.js                                # openlayers 主框架
```

* 修改 geojson 的 style 為 ** /js/vendor/ol-helpers/ol-helpers.js **

```javascript

    ...

    OL_HELPERS.createGeoJSONLayer = function (url) {

        var geojson = new OpenLayers.Layer.Vector(
            "GeoJSON",
            {
                projection: EPSG4326,
                strategies: [new OpenLayers.Strategy.Fixed()],
                protocol: new OpenLayers.Protocol.HTTP({
                    url: url,
                    format: new OpenLayers.Format.GeoJSON()
                }),
                styleMap: new OpenLayers.StyleMap({'default':{
                    /*
                    * add text to layers
                    strokeColor: "#00FF00",
                    strokeOpacity: 1,
                    strokeWidth: 1,
                    fillColor: "#FF5500",
                    fillOpacity: 0.5,
                    label : "123",
                    fontSize: "8px",
                    fontFamily: "Courier New, monospace",
                    labelXOffset: "0.5",
                    labelYOffset: "0.5"
                    */
                    
                    /*
                    * add circle
                    strokeColor: "rgba(100,100,100,1)",
                    fillColor: "rgba(255,127,39,0.5)",
                    strokeOpacity: 1,
                    fillOpacity: 0.5,
                    strokeWidth: 1,
                    pointRadius: 5,
                    graphicName: "circle"
                    */
                }})
            }
        );

        //TODO add styles

        return geojson
    }
    
    ...
    
```











