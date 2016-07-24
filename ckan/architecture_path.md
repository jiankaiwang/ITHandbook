# 主路徑架構

<script type="text/javascript" src="../js/general.js"></script>

* 若檔案為 customized 開頭，則為自定義檔案。

###佈署設定檔
---

* 進行虛擬環境

```bash
. /usr/lib/ckan/default/bin/activate
```

* 測試與正式佈署組態檔案 (.ini)

```bash
/etc/ckan/default/
  |- development.ini  # 測試環境
  |- production.ini  # 正式環境
```

* 執行測試環境 (需要注意已進入虛擬環境)

```bash
# 以測試組態檔來開啟新的 server 進行測試 (可以透過 http://xxx.xxx.xxx:5000/ 進入測試環境)
paster serve /etc/ckan/default/development.ini
```

###架構路徑
---

* 主模版架構路徑

```bash
# 細部頁面說明
/usr/lib/ckan/
  |- default/
    |- src/
      |- ckan/
        |- ckan/
          |- lib/
            |- helpers.py                   # 主要定義 helper python 函式
          |- templates/                     # ckan 網站網頁主要使用位置
            |- base.html                    # ckan 網站框架, css 匯入區域之一
            |- organization/
            |- home/
              |- layout1.html               # 主要顯示內容模版 (配合管理者登入畫面選擇)
              |- layout2.html               # 原呼叫 stats.html 內容
                |- snippets/
                  |- stats.html             # 統計値顯示主要內容
```

* plugin 架構路徑

```bash
/usr/lib/ckan/
  |- default/
    |- src/
      |- ckanext/
        |- ckanext-scheming                 # 完全自定義的 schema plugin    
          |- setup.py                       # 安裝於 production 與 develop
          |- ckanext/scheming/
            |- customized_shema.json        # 新欄位設定檔案
            |- presets.json                 # 預定欄位設定檔
      |- ckanext-pages/
        |- ckanext/pages/
          |- actions.py # schema, __page_list, _page_update
          |- controller.py # org_edit, group_edit
          |- db.py # init_db x 2 (sql 指令, 有新增要加上 DROP TABLE ckanext_pages; 無則刪除此行)
          |- plugin.py (TextBoxView,, build_pages_nav_main x 2)  # 同時也是修改 page 與 blog 主選單
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

