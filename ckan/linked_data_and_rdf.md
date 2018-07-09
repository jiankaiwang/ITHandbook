# Linked Data and RDF



ckan 自 1.7 版後開始內建支援 RDF 格式輸出，使用非常容易。

###使用方法
---
以下兩種方式均可獲得特定資料集的 RDF 格式描述：

* 方法一
```Bash
curl -L -H "Accept: application/rdf+xml" http://thedatahub.org/dataset/gold-prices
```

* 方法二
```Bash
curl -L http://thedatahub.org/dataset/gold-prices.rdf
```


