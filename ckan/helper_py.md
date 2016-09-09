# helper.py 設定

<script type="text/javascript" src="../js/general.js"></script>

### 背景
---

* 因 ckan 為 python 為基底作為伺服器處理的核心語言，大部分於 jinja 等內執行的網頁，皆須透過 helper 進行處裡來取得內容。

* 主要 helper.py 位置 (plugin 也可以進行擴增)

```Bash
/usr/lib/ckan/default/src/ckan/ckan/lib/helpers.py
```

### 依目前使用的語言回傳該語言的字串
---

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

### 回傳 List 內的元素總數
---

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

### 取代子自串
---

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

### 對各 organization 頁面底下的標籤進型語言切換
---

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

### 修正 Licenses 語言切換
---

```python
# ...

# customized function
# desc : get chinese and english title
# return : specific title in chinese and english
def getLicenseLabel(getLicense, getColumn):
    register = model.Package.get_license_register()
    sorted_licenses = sorted(register.values(), key=lambda x: x.title)
    getTitle = ""
    for i in range(0, len(sorted_licenses), 1):
        if sorted_licenses[i].title == getLicense[getColumn]:
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

### 偵測中文標籤
---

```python
# ...

#
# desc : detect chinese or not
# usage : in dataset page
#
def checkChineseTag(getStr):
    for i in range(0,len(getStr),1):
        if u'\u4e00' <= getStr[i] <= u'\u9fff':
            return True
    return False
    
#
# desc : show the tags in the same lang environment
# usage : in dataset page
#
def checkLangTag(getStr):
    if lang() == "en" and not checkChineseTag(getStr):
        return True
    elif lang() == "zh_TW" and checkChineseTag(getStr):
        return True
    else:
        return False    
    
# ...

__allowed_functions__ = [
    
    # ...
    
    'getGroupStr',
    'getOrganizationStr',
    'getGroupOrOrganizationLangStr',
    'getLicenseLabel',
    'checkChineseTag',
    'checkLangTag',

```

### 取得 request (POST, GET) 的參數與値
---

```python
#
# desc : parse request body
# retn : dict as key => value (&key=value in URL)
#
def parsePostRequestBodyAsList(getStr):
    bodyDict = {}
    parsePair = []
    for pair in getStr.split("&"):
        parsePair = pair.split("=")
        bodyDict.setdefault(parsePair[0],parsePair[1])
    return bodyDict

#
# desc : get value of key in request body
#
def getPostRequestParamValue(getStr, getParaKey):
    getDict = parsePostRequestBodyAsList(getStr)
    if getParaKey in getDict.keys():
        return getDict[getParaKey]
    else:
        return ''
        
# ...

__allowed_functions__ = [
    
    # ...
    
    'getGroupStr',
    'getOrganizationStr',
    'getGroupOrOrganizationLangStr',
    'getLicenseLabel',
    'checkChineseTag',
    'checkLangTag',
    'parsePostRequestBodyAsList',
    'getPostRequestParamValue',
```

### 加入新欄位於註冊選單中
---

```python
import psycopg2
from py2psql import *

# ...

#
# desc : get user list for requesting to organization
# retn : list contains tuple
#
def getReq2OrgList(getOrg, getCrtUser):
    p2l = py2psql("127.0.0.1","5432","ckan_default","public.user","ckan_default","ckan")
    data = p2l.select({"organ":getOrg["name"]},["id","name","fullname","email"],asdict=True)

    if len(data) < 1:
        return []
    else:
        retList = []
        crtList = [item[0] for item in getCrtUser]
        for item in data:
            if item["id"] not in crtList:
                tmpTuple = (item["name"], item["fullname"], item["email"])
                retList.append(tmpTuple)
        return retList

#
# desc : get current user state
#
def getUserState(getID):
    p2l = py2psql("127.0.0.1","5432","ckan_default","public.user","ckan_default","ckan")
    data = p2l.select({"id":getID},["state"],asdict=True)
    return data[0]["state"]

#
# desc : set current user state
#
def setUserState(getID,setState):
    p2l = py2psql("127.0.0.1","5432","ckan_default","public.user","ckan_default","ckan")
    return p2l.update({"state":setState},{"id":getID})

#
# desc : get user organ
#
def getUserOrgan(getID):
    p2l = py2psql("127.0.0.1","5432","ckan_default","public.user","ckan_default","ckan")
    data = p2l.select({"id":getID},["organ"],asdict=True)
    return data[0]["organ"]

# ...

__allowed_functions__ = [
    
    # ...
    
    'getGroupStr',
    'getOrganizationStr',
    'getGroupOrOrganizationLangStr',
    'getLicenseLabel',
    'checkChineseTag',
    'checkLangTag',
    'parsePostRequestBodyAsList',
    'getPostRequestParamValue',    
    'getReq2OrgList',
    'getUserState',
    'setUserState',
    'getUserOrgan',
    
```

### 註冊完後的顯示畫面 (以 logout 為主要處理模式)
---

* 修改 ** templates/user/logout.html **

```html
 <!-- -->
 
    <div class="module-content">
      <h1 class="page-heading">
        {% block page_heading %}{{ _('Logged Out') }}{% endblock %}
      </h1>
      <p>{% trans %}You are now logged out.{% endtrans %}</p>
      <hr />
      <h1 class="page-heading">
        {{ h.getLangLabel("Platform Registering Complete","平台註冊完成") }}
      </h1>
      <p>{{ h.getLangLabel("After registering, please download the document, fill and send it to Information Management Office.","若您為第一次註冊，帳戶將暫時關閉，請您至底下連結下載表單填寫後交給資訊室，審核後方可啟用
。") }}</p>
      <a href="#">{{ h.getLangLabel("Document Download","文件下載") }}</a>
    </div>
 
 <!-- -->
```
