# ckanext-basiccharts

<script type="text/javascript" src="../js/general.js"></script>

* 提供包含 linechart, barchart, piechart 與 basicgrid 等功能。

### 安裝與設定組態
---

* 自 Github 上透過 https 進行安裝

```bash
# 進入虛擬機
. /usr/lib/ckan/default/bin/activate

# 移動至 plugins 資料夾
cd /usr/lib/ckan/default/src/ckan/ckanext

# 下載 plugins
git clone https://github.com/ckan/ckanext-basiccharts.git

# 進行安裝
cd ./ckanext-basiccharts
python ./setup.py install
```

* 設定組態

```bash
# 正式機組態
vim /etc/ckan/default/production.ini

# 加入 plugins
ckan.plugins = linechart barchart piechart basicgrid
```

* 重新啟動服務即可

```bash
$ sudo restart ckan
```

### 客製化此模組
---

* 修改路徑如下

```bash
ckanext-basiccharts/ckanext/basiccharts/theme/public/
  |- vendor/jquery.flot.js                 # 主要設計各種圖表預設値
  |- vendor/jquery.flot.pie.js
  |- vendor/jquery.flot.time.js
  |- vendor/jquery.flot.categories.js
  |- vendor/jquery.flot.tooltip.js
  |- vendor/jquery.flot.resize.js
  |- vendor/queryStringToJSON.js
  |- vendor/backend.ckan.js
  |- basiccharts.js
  |- basiccharts_view.js
  |- basiccharts.css
```

* 修正內容

```javascript
...

xaxis: {
    
    ...
    
    reserveSpace: null, // whether to reserve space even if axis isn't shown
    tickLength: 0, // size in pixels of ticks, or "full" for whole line, no grid line
    alignTicksWithAxis: null, // axis number or null for no sync
    tickDecimals: 0, // no. of decimals, null means auto, to make sure no float number
    tickSize: null, // number or [number, "unit"]
    minTickSize: 1 // number or [number, "unit"], to make sure axis is integer, not float
},

...
```


* 重新安裝並重新啟動

```bash
# 移動至 plugin 資料夾
$ cd /usr/lib/ckan/default/src/ckan/ckanext/ckanext-basiccharts

# 進行安裝
$ python ./setup.py install

# 重啟服務
$ sudo restart ckan
```














