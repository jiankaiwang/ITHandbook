# 修改 tags 呈現

<script type="text/javascript" src="../js/general.js"></script>

### 修改路徑
---

```bash
/usr/lib/ckan/default/src/ckan/ckan/
  |- templates/    
    |- package/
      |- read.html                   # 呼叫來源，呼叫 package/snippets/tags.html 
      |- snippets/
        |- tags.html                 # 呼叫 snippets/tag_list.html 呈現每一個 tag
    |- snippets/
      |- tag_list.html               # 呈現 tag 主體
```


