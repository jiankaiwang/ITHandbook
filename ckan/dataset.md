# 修改 dataset 頁面

<script type="text/javascript" src="../js/general.js"></script>

### 修改路徑
---

```bash
/usr/lib/ckan/default/src/ckan/ckan/templates/
  |- snippets/
    |- package_list.html           # 引用 package_item.html
    |- package_item.html           # 修改各資料集下的右側主要資訊頁面 
  |- package/
    |- resources.html              # dataset 框架，引用 package/snippets/resource_item.html
    |- snippets/
      |- resource_item.html
```

