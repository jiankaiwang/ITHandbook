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
  |- vendor/jquery.flot.pie.js             # 修改 pie chart 主要設定
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

* 修正 basiccharts 嵌入時發生 get() 未定義問題 (** basiccharts_view.js **)

```javascript
function setupFilters(defaultFilters) {
  //var routeFilters = ckan.views.filters.get();
  
  // not to get any filters in the beginning
  var routeFilters = {};

  return $.extend({}, defaultFilters, routeFilters);
}
```

* 修正 barcharts 內容 (更改 ** jquery.flot.js ** 內容)

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

yaxis: {
    autoscaleMargin: 0.02,
    position: "left", // or "right"
    // y axis format
    tickFormatter: function(val, axis) {
        if(val >= 1000) { return ("&nbsp;" + (val/1000) + "K" + "&nbsp;"); }
        else { return val; }
    }
},

// ...

series: {
    points: {
        show: false,
        radius: 3,
        lineWidth: 2, // in pixels
        fill: true,
        fillColor: "#ffffff",
        symbol: "circle" // or callback
    },
    lines: {
        // we don't put in show: false so we can see
        // whether lines were actively disabled
        lineWidth: 2, // in pixels
        fill: false,
        fillColor: null,
        steps: false
        // Omit 'zero', so we can later default its value to
        // match that of the 'fill' option.
    },
    bars: {
        show: false,
        lineWidth: 0, // in pixels
        barWidth: 0, // in units of the x axis
        fill: true,
        fillColor: "rgba(255,127,39,0.5)",
        align: "left", // "left", "right", or "center"
        horizontal: false,
        zero: true
    },
    
    ...
},
...
```

* 修正 piechart 內容 (更改 ** jquery.flot.pie.js ** 內容)

```javascript
                // Count the number of slices with percentages below the combine
                // threshold; if it turns out to be just one, we won't combine.

                for (var i = 0; i < data.length; ++i) {
                        var value = data[i].data[0][1];
                        if (value / total <= options.series.pie.combine.threshold) {
                                combined += value;
                                numCombined++;
                                if (!color) {
                                        // color for combined categories
                                        color = data[i].color;
                                }
                        }
                }
                
                // show colors
                var colorsPalette = ["#ff9966","#ff7733","#ff9933","#cc6600","#cc9900","#b38600"];

                for (var i = 0; i < data.length; ++i) {
                        var value = data[i].data[0][1];
                        if (numCombined < 2 || value / total > options.series.pie.combine.threshold) {
                                newdata.push({
                                        data: [[1, value]],
                                        // color for each categories not in the combined
                                        //color: data[i].color,
                                        color: colorsPalette[i % colorsPalette.length],
                                        label: data[i].label,
                                        angle: value * Math.PI * 2 / total,
                                        percent: value / (total / 100)
                                });
                        }
                }

                //...
pie: {
                show: false,
                radius: "auto", // actual radius of the visible pie (based on full calculated radius if <=1, or hard pixel value)
                innerRadius: 0, /* for donut */
                startAngle: 5/4,
                tilt: 1,
                shadow: {
                        left: 5,        // shadow left offset
                        top: 15,        // shadow top offset
                        alpha: 0.02     // shadow alpha
                },
                offset: {
                        top: 0,
                        left: "auto"
                },
                stroke: {
                        color: "#fff",
                        width: 1
                },
                label: {
                        show: "auto",
                        formatter: function(label, slice) {
                                return "<div style='font-size:x-small;text-align:center;padding:2px;color:" + slice.color + ";'>" + label + "<br/>" + Math.round(slice.percent) + "%</div>";
                        },      
                        // formatter function
                        // radius at which to place the labels (based on full calculated radius if <=1, or hard pixel value)
                        radius: 1,      
                        background: {
                                color: null,
                                opacity: 0
                        },
                        // percentage at which to hide the label (i.e. the slice is too narrow)
                        threshold: 0    
                },
                combine: {
                        // percentage at which to combine little slices into one larger slice
                        // under 0.1 : combine to one category
                        threshold: 0.1, 
                        // color to give the new slice (auto-generated if null)
                        color: null,    
                        // label to give the new slice
                        label: "Other"  
                },
                highlight: {
                        // will add this functionality once parseColor is available
                        //color: "#fff",                
                        opacity: 0.5
                }
        }
}

// ...

        ,
        // allow interactive
        grid: {
            hoverable: true,
            clickable: true
        }
};

$.plot.plugins.push({
        init: init,
        options: options,
        name: "pie",
        version: "1.1"
});

// ...
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














