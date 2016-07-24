# ckanext-pages

<script type="text/javascript" src="../js/general.js"></script>

* ckanext-pages source 
  * 原 ckan 模組 : [https://github.com/ckan/ckanext-pages](https://github.com/ckan/ckanext-pages) 
  * 自製模組 (by forking) : [https://github.com/jiankaiwang/ckanext-pages](https://github.com/jiankaiwang/ckanext-pages)

### 下載並安裝
---

* 透過 github 直接安裝於 ckan 中

```bash
# 進入虛擬環境
. /usr/lib/ckan/default/bin/activate

# 透過 pip 進行安裝
pip install -e 'git+https://github.com/ckan/ckanext-pages.git#egg=ckanext-pages'

# 安裝完後會置於底下環境
/usr/lib/ckan/default/src/ckanext-pages/
  |- ckanext/pages/
    |- theme/
      |- templates_main/
        |- header.html	# 登入後的編輯窗格
        |- ckanext_pages/
          |- page.html  # page 的網站地圖(注意 plugin 中的 after_map 定義), 主呈現頁面
          |- blog.html  # blog 的網站地圖, 注意 plugin 中的 after_map 定義
          |- blog.list  # blog 
            |- snippets/pages_list.html # blog 與 pages 的列表
          |- base_form.html  # 修改 page 或 blog 的編輯表格
    |- plugin.py : 修改主選單
```

### 使用 pages plugin
---

```bash
# 於組態檔中使用此 plugin
vim /etc/ckan/default/production.ini

# 並於 ckan.plugins 中加入 pages
ckan.plugins = pages

# ckeanext-pages settings : 使用不同的 editor
ckanext.pages.editor = ckeditor
```









