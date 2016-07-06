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

###修改模組
---

* 透過修改 plugin.py 的 schemas 便可以新增額外的欄位，可以複寫下列五項函式來達成：

| 函式 | 說明 |
| -- | -- |
| create_package_schema() | Return the schema for validating new dataset dicts. |
| update_package_schema() | Return the schema for validating updated dataset dicts. |
| show_package_schema() | Return a schema to validate datasets before they’re shown to the user. |
| is_fallback() | Return True if this plugin is the fallback plugin. |
| package_types() | Return an iterable of package types that this plugin handles. |

* 創建 plugin.py 類別

創建一個名為 ExampleIDatasetFormPlugins 的類別於 plugin.py 中，此類別實作 IDatasetform 介面並繼承 SingletonPlugin 與 DefaultDatasetForm。

```Python
# encoding: utf-8

import ckan.plugins as p
import ckan.plugins.toolkit as tk

class ExampleIDatasetFormPlugin(p.SingletonPlugin, tk.DefaultDatasetForm):
    p.implements(p.IDatasetForm)
```

* 創建 CKAN 資料表綱目

```Python
def create_package_schema(self):
    schema = super(ExampleIDatasetFormPlugin, self).create_package_schema()
    schema = self._modify_package_schema(schema)
    
    # add custom field
    schema.update({
        'custom_text': [tk.get_validator('ignore_missing'),tk.get_converter('convert_to_extras')]
    })
    return schema
```

* 更新 CKAN 資料表綱目

```Python
def update_package_schema(self):
    schema = super(ExampleIDatasetFormPlugin, self).update_package_schema()
    schema = self._modify_package_schema(schema)
    
    # add custom field
    schema.update({
        'custom_text':  [tk.get_validator('ignore_missing'),tk.get_converter('convert_to_extras')]
    })
    return schema
```

* 修改呈現資料表綱目

```Python
def show_package_schema(self):
    schema = super(ExampleIDatasetFormPlugin, self).show_package_schema()

    # Don't show vocab tags mixed in with normal 'free' tags
    # (e.g. on dataset pages, or on the search page)
    schema['tags']['__extras'].append(tk.get_converter('free_tags_only'))

    # Add our custom_text field to the dataset schema.
    # add custom field
    schema.update({
        'custom_text': [tk.get_converter('convert_from_extras'),
                tk.get_validator('ignore_missing')]
        })

    schema['resources'].update({
            'custom_resource_text' : [ tk.get_validator('ignore_missing') ]
    })
    return schema
```

* 資料集型態

```Python
def is_fallback(self):
    # Return True to register this plugin as the default handler for
    # package types not handled by any other IDatasetForm plugin.
    return True

def package_types(self):
    # This plugin doesn't handle any special package types, it just
    # registers itself as the default (above).
    return []
```

* 更新 templates

```Python
class ExampleIDatasetFormPlugin(plugins.SingletonPlugin, tk.DefaultDatasetForm):
    '''An example IDatasetForm CKAN plugin.
    Uses a tag vocabulary to add a custom metadata field to datasets.
    '''
    
    # add custom fields
    plugins.implements(plugins.IConfigurer, inherit=False)

    plugins.implements(plugins.IDatasetForm, inherit=False)
    plugins.implements(plugins.ITemplateHelpers, inherit=False)
```

* 更新組態

```Python
def update_config(self, config):
    # Add this plugin's templates dir to CKAN's extra_template_paths, so
    # that CKAN will use this plugin's custom templates.
    tk.add_template_directory(config, 'templates')

```

* 建立一個 package_metadata_fields.html

  1. 於 package/snippets/package_metadata_fields.html 加入底下內容

```Bash
vim /usr/lib/ckan/default/src/ckan/ckanext/ckanext-ExampleIDatasetForm/ckanext/ExampleIDatasetForm/templates/package/snippets/package_metadata_fields.html
```

```html
{% ckan_extends %}

{# You could remove 'free extras' from the package form like this, but we keep them for this example's tests.
  {% block custom_fields %}
  {% endblock %}
#}

{% block package_metadata_fields %}

  <div class="control-group">
    <label class="control-label" for="field-country_code">{{ _("Country Code") }}</label>
    <div class="controls">
      <select id="field-country_code" name="country_code" data-module="autocomplete">
        {% for country_code in h.country_codes()  %}
          <option value="{{ country_code }}" {% if country_code in data.get('country_code', []) %}selected="selected"{% endif %}>{{ country_code }}</option>
        {% endfor %}
      </select>
    </div>
  </div>

  {{ super() }}

{% endblock %}
```

* 修改 package_basic_fields.html

```Bash
vim /usr/lib/ckan/default/src/ckan/ckanext/ckanext-ExampleIDatasetForm/ckanext/ExampleIDatasetForm/templates/package/snippets/package_basic_fields.html
```

```html
{% ckan_extends %}

{% block package_basic_fields_custom %}
  {{ form.input('custom_text', label=_('Custom Text'), id='field-custom_text', placeholder=_('custom text'), value=data.custom_text, error=errors.custom_text, classes=['control-medium']) }}
{% endblock %}
```

* 修改 additional_info.html

```Bash
vim /usr/lib/ckan/default/src/ckan/ckanext/ckanext-ExampleIDatasetForm/ckanext/ExampleIDatasetForm/templates/package/snippets/package_basic_fields.html
```

此 html 中所列的 "Custom Text" 為顯示在畫面上的內容，若此內容無對應其他語言，則會以此 html 內容為主。

```html
{% ckan_extends %}

{% block extras %}
  {% if pkg_dict.custom_text %}
    <tr>
      <th scope="row" class="dataset-label">{{ _("Custom Text") }}</th>
      <td class="dataset-details">{{ pkg_dict.custom_text }}</td>
    </tr>
  {% endif %}
{% endblock %}
```

###將此 plugin 加入 setup.py
---

* 準備 setup.py 檔案

```Bash
vim /usr/lib/ckan/default/src/ckan/ckanext/ckanext-ExampleIDatasetForm/setup.py
```

```Python
# 「ExampleIDatasetForm=ckanext...」中 ExampleIDatasetForm 為之後加入 CKAN 使用的 plugin 名稱
# 「plugin:ExampleIDatasetFormPlugin」中 ExampleIDatasetFormPlugin 為 plugin 的類別名稱
entry_points='''
    [ckan.plugins]
    ExampleIDatasetForm=ckanext.ExampleIDatasetForm.plugin:ExampleIDatasetFormPlugin
    [babel.extractors]
    ckan = ckan.lib.extract:extract_ckan
''',
```

* 安裝此 plugin

```Bash
# 先進入虛擬機
. /usr/lib/ckan/default/bin/activate

# 進入該 plugin 所在路徑
cd /usr/lib/ckan/default/src/ckan/ckanext/ckanext-ExampleIDatasetForm

# 開始安裝於測試階段，此時先安裝為 develop
python setup.py develop
```

* 使用此 plugin : 以開發環境為優先

```Bash
vim /etc/ckan/default/development.ini
```

並於 ckan.plugins 後加入 ExampleIDatasetForm，如下

```Bash
ckan.plugins = stats text_view image_view recline_view ExampleIDatasetForm
```

###開始測試
---

因選擇 development 進行使用此 plugin，故執行 develop 環境來進行測試

```Bash
# 先進入虛擬機環境
. /usr/lib/ckan/default/bin/activate

# 以測試組態檔來開啟新的 server 進行測試
$ paster serve /etc/ckan/default/development.ini

Starting server in PID 13961.
serving on 0.0.0.0:5000 view at http://127.0.0.1:5000
```







