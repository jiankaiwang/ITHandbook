# helper.py 設定

<script type="text/javascript" src="../js/general.js"></script>

### 背景
---

* 因 ckan 為 python 為基底作為伺服器處理的核心語言，大部分於 jinja 等內執行的網頁，皆須透過 helper 進行處裡來取得內容。

* 主要 helper.py 位置 (plugin 也可以進行擴增)

```Bash
/usr/lib/ckan/default/src/ckan/ckan/lib/helpers.py
```

### 新增功能
---

* 回傳 List 內的元素總數

```python
# customized function
# desc : return the length of a list
# para : a list
def getLen(getObj):
    return len(getObj)
    
# 因為可能由網頁進行讀取，須放置在 ** __allowed_functions__ ** 中
__allowed_functions__ = [
  ...
  'time_ago_from_timestamp',
  'get_organization',
  'has_more_facets',
  'getLangLabel',
  'getLen',
  ...
]
```


