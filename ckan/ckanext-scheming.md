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
| fee | fee | selector | 收費標準 |
| Version | version | text | 顯示資料版本 |
| Author | author | text | 顯示資料集作者 |
| Author Email | author_email | "display_snippet" 為 "email.html" | 作者電子郵件 |
| Published Date | pub_time | "form_snippet" 為 "date.html" | 發布時間 |
| Updated Frequency | updated_freq | selector | 更新頻率 |

新定義的 json 內容如下：

```javascript
{
  "scheming_version": 1,
  "dataset_type": "dataset",
  "about": "A reimplementation of the default CKAN dataset schema",
  "about_url": "http://github.com/ckan/ckanext-scheming",
  "dataset_fields": [
    {
      "field_name": "title",
      "label": "website",
      "preset": "title",
      "form_placeholder": "eg. A descriptive title"
    },
    {
      "field_name": "c_title",
      "label": "Title in Chinese",
      "form_placeholder": "eg. 登革熱",
      "validators": "ignore_missing unicode package_version_validator"
    },
    {
      "field_name": "e_title",
      "label": "Title in English",
      "form_placeholder": "eg. Dengue",
      "validators": "ignore_missing unicode package_version_validator"
    },
    {
      "field_name": "name",
      "label": "URL",
      "preset": "dataset_slug",
      "form_placeholder": "eg. my-dataset"
    },
    {
      "field_name": "cd_notes",
      "label": "Description in Chinese",
      "preset": "note_meta",
      "form_placeholder": "eg. 2003年起各地區、各年齡層、性別之病例數統計表"
    },
    {
      "field_name": "ed_notes",
      "label": "Description in English",
      "preset": "note_meta",
      "form_placeholder": "eg. The statistical data to determined cases on the age group and gender in Taiwan since 2003."
    },
    {
      "field_name": "cm_notes",
      "label": "Metadata in Chinese",
      "preset": "note_meta",
      "form_placeholder": "eg. 主要欄位有「確定病名」、「發病年份」、「發病月份」、「縣市」、「性別」、「年齡層」、「確定病例數」"
    },
    {
      "field_name": "em_notes",
      "label": "Metadata in English",
      "preset": "note_meta",
      "form_placeholder": "eg. Columns include disease name, year of onset, month of onset, county name, gender, age group and determined number of cases."
    },
    {
      "field_name": "tag_string",
      "label": "Tags",
      "preset": "tag_string_autocomplete",
      "form_placeholder": "eg. economy, mental health, government"
    },
    {
      "field_name": "license_id",
      "label": "License",
      "form_snippet": "license.html",
      "help_text": "License definitions and additional information can be found at http://opendefinition.org/"
    },
    {
      "field_name": "owner_org",
      "label": "Organization",
      "preset": "dataset_organization"
    },
    {
      "field_name": "url",
      "label": "Source",
      "form_placeholder": "http://example.com/dataset.json",
      "display_property": "foaf:homepage",
      "display_snippet": "link.html"
    },
    {
      "field_name": "fee",
      "label": "fee",
      "choices": [
	{ "value": "toll", "label": "toll" },
        { "value": "free", "label": "free" }
      ],
      "form_snippet": "select.html",
      "display_snippet": "select.html"
    },
    {
      "field_name": "version",
      "label": "Version",
      "validators": "ignore_missing unicode package_version_validator",
      "form_placeholder": "1.0"
    },
    {
      "field_name": "author",
      "label": "Author",
      "form_placeholder": "Joe Bloggs",
      "display_property": "dc:creator"
    },
    {
      "field_name": "author_email",
      "label": "Author Email",
      "form_placeholder": "joe@example.com",
      "display_property": "dc:creator",
      "display_snippet": "email.html",
      "display_email_name_field": "author"
    },
    {
      "field_name": "pub_time",
      "label": "Published Date",
      "form_snippet": "date.html",
      "form_placeholder": "eg. 2016/07/20"
    },
    {
      "field_name": "updated_freq",
      "label": "Updated Frequency",
      "choices": [
        { "value": "year", "label": "year" },
        { "value": "month", "label": "month" },
        { "value": "day", "label": "day" },
        { "value": "once", "label": "once" },
        { "value": "non-scheduled", "label": "non-scheduled" }
      ],
      "form_snippet": "select.html",
      "display_snippet": "select.html"
    }
  ],
  "resource_fields": [
    {
      "field_name": "url",
      "label": "URL",
      "preset": "resource_url_upload"
    },
    {
      "field_name": "name",
      "label": "Name",
      "form_placeholder": "eg. January 2011 Gold Prices"
    },
    {
      "field_name": "description",
      "label": "Description",
      "form_snippet": "markdown.html",
      "form_placeholder": "Some useful notes about the data"
    },
    {
      "field_name": "format",
      "label": "Format",
      "preset": "resource_format_autocomplete"
    }
  ]
}
```

* 設定新參考定義 (preset.json) : 在上述的欄位定義也可以透過 preset 進行設置

```javascript
{
  "scheming_presets_version": 1,
  "about": "these are the default scheming field presets",
  "about_url": "http://github.com/ckan/ckanext-scheming#preset",
  "presets": [
    {
      "preset_name": "title",
      "values": {
        "validators": "if_empty_same_as(name) unicode",
        "form_snippet": "large_text.html",
        "form_attrs": {
          "data-module": "slug-preview-target"
        }
      }
    },
    {
      "preset_name": "note_meta",
      "values": {
        "validators": "if_empty_same_as(name) unicode",
        "form_snippet": "markdown.html"
      }
    },
    {
      "preset_name": "dataset_slug",
      "values": {
        "validators": "not_empty unicode name_validator package_name_validator",
        "form_snippet": "slug.html"
      }
    },
    {
      "preset_name": "tag_string_autocomplete",
      "values": {
        "validators": "ignore_missing tag_string_convert",
        "form_attrs": {
          "data-module": "autocomplete",
          "data-module-tags": "",
          "data-module-source": "/api/2/util/tag/autocomplete?incomplete=?"
        }
      }
    },
    {
      "preset_name": "dataset_organization",
      "values": {
        "validators": "owner_org_validator unicode",
        "form_snippet": "organization.html"
      }
    },
    {
      "preset_name": "resource_url_upload",
      "values": {
        "validators": "not_empty unicode remove_whitespace",
        "form_snippet": "upload.html",
        "form_placeholder": "http://example.com/my-data.csv",
        "upload_field": "upload",
        "upload_clear": "clear_upload",
        "upload_label": "File"
      }
    },
    {
      "preset_name": "resource_format_autocomplete",
      "values": {
        "validators": "if_empty_guess_format ignore_missing clean_format unicode",
        "form_placeholder": "eg. CSV, XML or JSON",
        "form_attrs": {
          "data-module": "autocomplete",
          "data-module-source": "/api/2/util/resource/format_autocomplete?incomplete=?"
        }
      }
    },
    {
      "preset_name": "select",
      "values": {
        "form_snippet": "select.html",
        "display_snippet": "select.html",
        "validators": "scheming_required scheming_choices"
      }
    },
    {
      "preset_name": "multiple_checkbox",
      "values": {
        "form_snippet": "multiple_checkbox.html",
        "display_snippet": "multiple_choice.html",
        "validators": "scheming_multiple_choice",
        "output_validators": "scheming_multiple_choice_output"
      }
    },
    {
      "preset_name": "multiple_select",
      "values": {
        "form_snippet": "multiple_select.html",
        "display_snippet": "multiple_choice.html",
        "validators": "scheming_multiple_choice",
        "output_validators": "scheming_multiple_choice_output"
      }
    },
    {
      "preset_name": "date",
      "values": {
        "form_snippet": "date.html",
        "display_snippet": "date.html",
        "validators": "scheming_required isodate convert_to_json_if_date"
      }
    },
    {
      "preset_name": "datetime",
      "values": {
        "form_snippet": "datetime.html",
        "display_snippet": "datetime.html",
        "validators": "scheming_isodatetime convert_to_json_if_datetime"
      }
    },
    {
      "preset_name": "datetime_tz",
      "values": {
        "form_snippet": "datetime_tz.html",
        "display_snippet": "datetime_tz.html",
        "validators": "scheming_isodatetime_tz convert_to_json_if_datetime"
      }
    }
  ]
}
```

* 設定組態檔案 (以 development.ini 為例)

```bash
# 編輯 development.ini
vim /etc/ckan/default/development.ini

# 



```

###




















