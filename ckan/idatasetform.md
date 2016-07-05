# 使用 idatasetform 客製化資料說明欄位

<script type="text/javascript" src="../js/general.js"></script>

* 客製化欄位需要透過 plugin 方式來完成，故底下說明將先新增一個 idatasetform plugin，並安裝於 ckan 中，後透過組態檔將此新模組開啟。

###


```Bash
$ cd /usr/lib/ckan/default/src/ckan/ckanext
$ cp -r ./example_idatasetform ./cdc_idatasetform
```

