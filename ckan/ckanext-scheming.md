# ckanext-scheming

<script type="text/javascript" src="../js/general.js"></script>

* ckanext-scheming source 
  * 原 ckan 模組 : [https://github.com/ckan/ckanext-scheming](https://github.com/ckan/ckanext-scheming) 
  * 自製模組 (by forking) : [https://github.com/jiankaiwang/ckanext-scheming](https://github.com/jiankaiwang/ckanext-scheming)

### 安裝
---

* 預先安裝必要 package : ckantoolkit, ckanapi

```bash
# 必須確認進入虛擬環境 (因 ckan 執行為 sandbox-based 環境)
. /usr/lib/ckan/default/bin/activate

# 透過 pip 進行安裝
pip2 install ckantoolkit
pip2 install ckanapi

# 檢查是否安裝成功
pip2 list
```

* 自 github 安裝 by http protocol

```
# 放置在 ckan 預設放置 plugin 路徑
$ cd /usr/lib/ckan/default/src/ckan/ckanext

# 取得原 plugin 模組的 http url
$ git clone https://github.com/ckan/ckanext-scheming.git

# clone 後的內容會放置在
$ cd /usr/lib/ckan/default/src/ckan/ckanext/ckanext-scheming/
```

### 設定必要組態檔
---

* 設定新 data schema 列表，此 plugin 透過 json 來設定 schema，底下舉例為 customized_schema.json

```bash
# 存放 schema.json 位置
cd /usr/lib/ckan/default/src/ckan/ckanext/ckanext-scheming/ckanext/scheming/
vim ./customized_schema.json
```

假設底下為要新增的欄位 (preset 參考下方新定義)

| 欄位名稱 | shema | 資料形態或參考表格 | 說明 |
| -- | -- | -- | -- |
| website | title | "preset" 為 "title" | 顯示網址 |
| Title in Chinese | c_title | text | 中文標題，於中文網頁顯示 |
| Title in English | e_title | text | 英文標題，於英文網頁顯示 |
| URL | name | "preset" 為 "dataset_slug" | 儲存網址 |
| Description in Chinese | cd_notes | "preset" 為 "note_meta" | 資料集中文描述 |
| Description in English | ed_notes | "preset" 為 "note_meta" | 資料集英文描述 |
| Metadata in Chinese | cm_notes | "preset" 為 "note_meta" | 資料集中文欄位說明 |
| Metadata in English | em_notes | "preset" 為 "note_meta" | 資料集英文欄位說明 |
| Tags | tag_string | "preset" 為 "tag_string_autocomplete" | 資料集的標籤 |
| License | license_id | "form_snippet" 為 "license.html" | 資料集授選 |
| Organization | owner_org | "preset" 為 "dataset_organization" | 資料集釋出的組織 |
| Source | url | "display_snippet" 為 "link.html" | 資料說明頁面 |
| fee | fee | 含有 choices, form_snippet 與 display_snippet | 收費標準 |
| Version | version | text | 顯示資料版本 |
| Author | author | text | 顯示資料集作者 |
| | | | |
| | | | |
| | | | |

* 設定新參考定義 (preset.json)



* 設定組態檔案 (以 development.ini 為例)

```bash

```

###
