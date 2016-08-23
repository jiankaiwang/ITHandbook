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

* 依目前使用的語言回傳該語言的字串

```python
# customized function
# desc : return a string based on current language selected, english or chinese
# para : a english string and a chinese string
def getLangLabel(en,tw):
    if lang() == "en":
        return en
    elif lang() == "zh_TW":
        return tw
        
# 因為可能由網頁進行讀取，須放置在 ** __allowed_functions__ ** 中
__allowed_functions__ = [
    ...
    'time_ago_from_timestamp',
    'get_organization',
    'has_more_facets',
    'getLangLabel'
    ...
]
```

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

* 取代子自串

```python
# customized function
# desc : return a replaced string
# para : a string content, a target substring, a replaced string for target substring
def strReplace(getStr,getTarget,getReplace):
    return getStr.replace(getTarget,getReplace)
    
# 因為可能由網頁進行讀取，須放置在 ** __allowed_functions__ ** 中
__allowed_functions__ = [
    ...
    'time_ago_from_timestamp',
    'get_organization',
    'has_more_facets',
    'getLangLabel',
    'getLen',
    'strReplace',
    ...
]
```

* 對各 organization 頁面底下的標籤進型語言切換

先針對 help.py 進行設定，並加入 ** allowed_functions ** 中

```Python
# ...

# customized function
# desc : get organization or group title
# ret : return English or Chinese title
def getGroupStr(getItem):
    check = ""
    for group in get_featured_groups(200):
        if group["title"] == getItem["display_name"]:
            check = getLangLabel(group["etitle"],group["title"])
            break
    return check

def getOrganizationStr(getItem):
    check = ""
    for org in get_featured_organizations(count=200):
        if org["title"] == getItem["display_name"]:
            check = getLangLabel(org["etitle"],org["title"])
            break
    return check

def getGroupOrOrganizationLangStr(getTitle, getItem):
    check = ""
    if getTitle == "Organizations" or getTitle == u"組織":
        check = getOrganizationStr(getItem)
    elif getTitle == "Groups" or getTitle == u"群組":
        check = getGroupStr(getItem)
    else:
        check = "N"
    return check
    
# ...

__allowed_functions__ = [
  
  # ...
  
    'list_dict_filter',
    'new_activities',
    'time_ago_from_timestamp',
    'get_organization',
    'has_more_facets',
    'getLangLabel',
    'getLen',
    'strReplace',
    'retGroupList',
    'getGroupStr',
    'getOrganizationStr',
    'getGroupOrOrganizationLangStr',
    # imported into ckan.lib.helpers
  
  # ...

```

* 修正 Licenses 語言切換

```python
# ...

# customized function
# desc : get chinese and english title
# return : specific title in chinese and english
def getLicenseLabel(getLicense):
    register = model.Package.get_license_register()
    sorted_licenses = sorted(register.values(), key=lambda x: x.title)
    getTitle = ""
    for i in range(0, len(sorted_licenses), 1):
        if sorted_licenses[i].title == getLicense["display_name"]:
            getTitle = getLangLabel(sorted_licenses[i].etitle, sorted_licenses[i].title)
            break
    return getTitle

# ...

__allowed_functions__ = [
  
  # ...
  
    'list_dict_filter',
    'new_activities',
    'time_ago_from_timestamp',
    'get_organization',
    'has_more_facets',
    'getLangLabel',
    'getLen',
    'strReplace',
    'retGroupList',
    'getGroupStr',
    'getOrganizationStr',
    'getGroupOrOrganizationLangStr',
    'getLicenseLabel',
    # imported into ckan.lib.helpers
  
  # ...
```








