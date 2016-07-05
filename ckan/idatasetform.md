# 使用 idatasetform 客製化資料說明欄位

<script type="text/javascript" src="../js/general.js"></script>

* 客製化欄位需要透過 plugin 方式來完成，故底下說明將先新增一個 idatasetform plugin，並安裝於 ckan 中，後透過組態檔將此新模組開啟。

###新增一個 plugin 模組
---

透過 ckan 虛擬機創建模組的模版，如下：

```Bash
# 先進入虛擬機環境
. /usr/lib/ckan/default/bin/activate

# 移動到要放置模組的資料夾
cd /usr/lib/ckan/default/src/ckan/ckanext

# 創建一個模組
# ckanext-<模組名稱> : CKAN 模組名稱需要以 ckanext- 為開頭
# paster --plugin=ckan create -t ckanext ckanext-<模組名稱>
# 假設 plugin 名稱為 ExampleIDatasetForm
paster --plugin=ckan create -t ckanext ckanext-ExampleIDatasetForm
```

創建後會有許多的資訊需要輸入，如下：

```text
# 一行描述此 plugin
Enter description (a one-line description of the extension, for example: "A simple blog extension for CKAN") ['']

# 此 plugin 開發者
Enter author (for example: "Guybrush Threepwood") ['']:

# 此開發者 e-mail
Enter author_email (for example: "guybrush@meleeisland.com") ['']:

# plugin 關鍵字
Enter keywords (a space-separated list of keywords, for example: "CKAN blog") ['']: 

# plugin 的 github 儲存庫資訊
Enter github_user_name (your GitHub user or organization name, for example: "guybrush" or "ckan") ['']:
```

創建完後，於此位置便有 plugin 相關安裝等預設內容：

```text
/usr/lib/ckan/default/src/ckan/ckanext/ckanext-ExampleIDatasetForm/
```

  1. ** ckanext_iauthfunctions.egg_info ** : 自動產生的專案 metadata，一般而言不需要特別處理
  2. ** setup.py ** : 安裝 plugin 所需的 script
  3. ** ckanext/ExampleIDatasetForm/ ** : plugin 使用的所有 source code 放置的位置

###建立新增欄位模組
---

* 於 CKAN 2.5.1 版本中，於 ** /usr/lib/ckan/default/src/ckan/ckanext/ ** 資料夾下，已有 idatasetform 範例模組，稱為「example_idatasetform」。

| 註解 |
| -- |
| 可以透過 http://URL/api/util/status 方式來查看 CKAN 版本 |

* 可以將此資料夾下的內容複製到新產生的 plugin 資料夾中

```Bash
# 移動到 ckanext 資料夾下
cd /usr/lib/ckan/default/src/ckan/ckanext/

# 將 example_idatasetform 底下的 plugin.py 與資料夾 templates 整個複製到新建立模組資料夾中放置原始碼的資料夾中
cp -r ./example_idatasetform/plugin.py ./example_idatasetform/templates ./ckanext-ExampleIDatasetForm/ckanext/ExampleIDatasetForm/
```


