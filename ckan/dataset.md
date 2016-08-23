# 修改 dataset 頁面

<script type="text/javascript" src="../js/general.js"></script>

### 修改路徑
---

```bash
/usr/lib/ckan/default/src/ckan/ckan/
  |- templates/
    |- snippets/
      |- package_list.html           # 引用 package_item.html
      |- package_item.html           # 修改各資料集下的右側主要資訊頁面 
    |- package/
      |- read.html                 # 主要顯示頁面，修正標題處與描述，包含資源與標籤引用
      |- read_base.html            # dataset 框架
    |- snippets/
      |- license.html                # dataset 的 license 框架
```

### 修正語言
---

* 修正 license 語言 ** snippets/license.html **

```html
  {# ... #}
  
  {% if 'license_url' in pkg_dict %}
    {# customized #}
    <a href="{{ pkg_dict.license_url }}" rel="dc:rights">{{ h.getLicenseLabel(pkg_dict, "license_title") }}</a>
  {% else %}
    <span property="dc:rights">{{ pkg_dict.license_title }}</span>
  {% endif %}
  
  {# ... #}
```

