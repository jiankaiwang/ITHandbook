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

### 同步至 NDC
---

* 透過 threading 方式及 lock 處理與國發會同步

```python
# 加入函式庫

from py2psql import *
from REQUESTMETHOD2 import *
import thread
import threading
import time
import datetime
import urllib2
import json

#
# desc : system current time
# retn : return time string
#
def getSysTime(option):
    if option == "date":
        return str(datetime.datetime.now())[0:10]
    elif option == "minute":
        return str(datetime.datetime.now())[11:19]
    else:
        return str(datetime.datetime.now())[0:19]

#
# desc : transform time format
# retn : return time string
#
def transTime(option, getDatetime):
    if option == "date":
        return str(getDatetime)[0:10]
    elif option == "minute":
        return str(getDatetime)[11:19]
    else:
        return str(getDatetime)[0:19]


#
# desc : get corresponding action for front html btn and also current state of each action
# retn : { "show" : "" , "clicking" : "", "note" : "" }
# |- show : before clicking, text is note
# |- clicking : after clicking, text is note
#
def syncNDCState(dbHost, dbPort, dbDB, dbTB, dbUser, dbPwd, pkg):
    # connect to postgresql
    p2l = py2psql(dbHost, dbPort, dbDB, dbTB, dbUser, dbPwd)
    
    # select conditions
    data = p2l.select({"cdcid":pkg[u"id"]},["state","operation","beginning","progress"],asdict=True)

    # set operation
    retState = {"show" : "" , "clicking" : "", "note" : ""}

    # state = {"none"|"existing"}
    # none : not in ndc databases
    # existing : already in ndc databases
    # len(data) < 1 : not in postgresql dataset (untracking)
    if len(data) < 1 or data[0]["state"] == "none":
        # cond : not existing in ndc, and it is not submitted to NDC yet
        # clicking action : post (create)
        # len(data) < 1 : not in postgresql dataset (untracking)
        if len(data) < 1 or data[0]["operation"] == "none":
            retState["show"] = "submit"
            retState["clicking"] = "post"
            retState["note"] = "First Submit"
        # cond : not existing in ndc, clicking to sync and a success sync
        #        this cond would be transformed to { state : "existing", clicking : "success", note : "" }
        # clicking action : put (update)
        elif data[0]["operation"] == "success":
            retState["show"] = "success"
            retState["clicking"] = "put"
            retState["note"] = "Success in " + transTime("date", data[0]["beginning"])
        # cond : not existing in ndc, clicking to sync and a failure sync, this cond would be more action
        # clicking action : post (create)
        elif data[0]["operation"] == "failure":
            retState["show"] = "failure"
            retState["clicking"] = "post"
            retState["note"] = "Failure in " + transTime("date", data[0]["beginning"])
        # cond : not existing in ndc, clicking to sync and is still in syncing
        # clicking action : no action
        elif data[0]["operation"] == "syncing":
            retState["show"] = "sync"
            retState["clicking"] = "sync"
            retState["note"] = "Syncing (" + data[0]["progress"] + ") "
    elif data[0]["state"] == "existing":
        # cond : existing in ndc, clicking to sync and a success sync
        # clicking action : put (update)
        if data[0]["operation"] == "success":
            retState["show"] = "success"
            retState["clicking"] = "put"
            retState["note"] = "Success in " + transTime("date", data[0]["beginning"])
        # cond : existing in ndc, clicking to sync and a failure sync
        # clicking action : put (update)
        elif data[0]["operation"] == "failure":
            retState["show"] = "failure"
            retState["clicking"] = "put"
            retState["note"] = "Failure in " + transTime("date", data[0]["beginning"])
        # cond : existing in ndc, clicking to sync and is still in syncing
        # clicking action : no action
        elif data[0]["operation"] == "syncing":
            retState["show"] = "sync"
            retState["clicking"] = "sync"
            retState["note"] = "Syncing (" + data[0]["progress"] + ") "
        # cond : existing in ndc, but not submitted first in the local postgresql yet
        elif data[0]["operation"] == "none":
            retState["show"] = "success"
            retState["clicking"] = "put"
            retState["note"] = "Success in " + transTime("date", data[0]["beginning"])
    elif data[0]["state"] == "deleted":
        # cond : re-POST after deleting dataset from NDC
        # clicking action : no action
        if data[0]["operation"] == "syncing":
            retState["show"] = "sync"
            retState["clicking"] = "sync"
            retState["note"] = "Syncing (" + data[0]["progress"] + ") "
        # cond : after doing deleting from NDC
        # clicking action : re-POST
        else:
            retState["show"] = "deleted"
            retState["clicking"] = "post"
            retState["note"] = "Deleted on " + transTime("date", data[0]["beginning"])

    return retState
      

#
# def : multithreading POST/PUT/DELETE
#

class ASSEMBLEDATA:

    # -------------------------------------------------------
    # private
    # -------------------------------------------------------
    __pkg = ""
    __categoryCode = "B00"
    __publisherOrgCode = "A21010000I"
    __publisherOID = "2.16.886.101.20003.20065.20021"
    __organization = u'衛生福利部'
    __publisher = u'衛生福利部疾病管制署'
    __license = u'政府資料開放平臺資料使用規範'
    __licenseURL = 'http://data.gov.tw/?q=principle'
    __spatial = u'臺灣'
    __dbID = ''

    #
    # desc : translate content
    #
    def __getLangContent(self, option, value):
        if option == "cost":
            if value == u"free":
                return u'免費'
            else:
                return u'付費'
        elif option == "freq":
            if value == u"day":
                return u'日'
            elif value == u"month":
                return u'月'
            elif value == u"year":
                return u'年'
            elif value == u"once":
                return u'一次性'
            elif value == u"non-scheduled":
                return u'不定期'

    #
    # desc : transform datetime
    #
    def __transformTime(self, option, getStr):
        if option == "issued":
            return datetime.datetime((int)(getStr[0:4]), (int)(getStr[5:7]), (int)(getStr[8:10]))
        elif option == "modified":
            return datetime.datetime((int)(getStr[0:4]), (int)(getStr[5:7]), (int)(getStr[8:10]), (int)(getStr[11:13]), (int)(getStr[14:16]), (int)(getStr[17:19]))

    #
    # desc : find modified or created time from resources
    #
    def __findModifiedTime(self):
        lastModified = ""
        tmpTime = ""
        for items in self.__pkg[u'resources']:
            tmpTime = items['last_modified'] or items['created']
            if tmpTime > lastModified:
                lastModified = tmpTime
        return lastModified

    #
    # desc : prepare tags
    #
    def __prepareTags(self):
        allKeyList = []
        for item in self.__pkg[u'tags']:
            if item[u'display_name'] not in allKeyList:
                allKeyList.append(item[u'display_name'])
        return allKeyList

    #
    # desc : prepare resources
    #
    def __prepareRSC(self):
        allResourceList = []
        tmpRSC = {}
        # for count resources
        index = 1
        for item in self.__pkg[u'resources']:
            # prepare count string YYY
            tmpIndex = str(index)
            for count in range(len(str(index)),3,1):
                tmpIndex = '0' + tmpIndex
            tmpRSC = {\
                    "resourceID": self.__publisherOrgCode + "-" + self.__dbID + "-" + tmpIndex,\
                    "resourceDescription": item[u'description'],\
                    "format": item[u'format'],\
                    "resourceModified": str(self.__transformTime("modified",item[u'last_modified'] or item[u'created'])),\
                    "downloadURL": item[u'url'],\
                    "metadataSourceOfData": "",\
                    "characterSetCode": "UTF-8"
                    }
            allResourceList.append(tmpRSC)
            index += 1
                
        return allResourceList

    #
    # desc : get id of the package for the identifier
    #
    def __getPKGID(self, dbHost, dbPort, dbDB, dbTB, dbUser, dbPwd):
        # connect to postgresql
        p2l = py2psql(dbHost, dbPort, dbDB, dbTB, dbUser, dbPwd)
    
        # select conditions
        data = p2l.select({"cdcid":self.__pkg[u"id"]},["id"],asdict=True)

        # set id
        tmpID = str(data[0]["id"])

        # prepare package id string to XXXXXX
        for index in range(len(str(data[0]["id"])),6,1):
            if index == 5:
                tmpID = '9' + tmpID
                continue
            tmpID = '0' + tmpID

        return tmpID
    
    # -------------------------------------------------------
    # public
    # -------------------------------------------------------
    
    # constructor
    def __init__(self, dbHost, dbPort, dbDB, dbTB, dbUser, dbPwd, getPKG):
        # constant
        self.__categoryCode = "B00"
        self.__publisherOrgCode = "A21010000I"
        self.__publisherOID = "2.16.886.101.20003.20065.20021"
        self.__organization = u'衛生福利部'
        self.__publisher = u'衛生福利部疾病管制署'
        self.__license = u'政府資料開放平臺資料使用規範'
        self.__licenseURL = 'http://data.gov.tw/?q=principle'
        self.__spatial = u'臺灣'

        # outer resource
        self.__pkg = getPKG

        # database id, must be after self.__pkg = getPKG
        self.__dbID = self.__getPKGID(dbHost, dbPort, dbDB, dbTB, dbUser, dbPwd)

    # assemble POST or PUT data
    def assemblePOSTOrPUTData(self):       
        postOrPUTData = {}
        postOrPUTData = {\
            "categoryCode": self.__categoryCode,\
            "identifier": self.__publisherOrgCode + "-" + self.__dbID,\
            "title": self.__pkg[u'c_title'],\
            "description": self.__pkg[u'cd_notes'],\
            "fieldDescription": self.__pkg[u'cm_notes'],\
            "type": self.__pkg[u'data_type'],\
            "license": self.__license,\
            "licenseURL": self.__licenseURL,\
            "cost": self.__getLangContent("cost",self.__pkg[u'fee']),\
            "costURL": "",\
            "costLaw": "",\
            "organization": self.__organization,\
            "organizationContactName": self.__pkg[u'author'],\
            "organizationContactPhone": self.__pkg[u'author_phone'],\
            "organizationContactEmail": self.__pkg[u'author_email'],\
            "publisher": self.__publisher,\
            "publisherContactName": self.__pkg[u'author'],\
            "publisherContactPhone": self.__pkg[u'author_phone'],\
            "publisherContactEmail": self.__pkg[u'author_email'],\
            "publisherOID": self.__publisherOID,\
            "publisherOrgCode": self.__publisherOrgCode,\
            "accrualPeriodicity": self.__getLangContent("freq",self.__pkg[u'updated_freq']),\
            "temporalCoverageFrom": "",\
            "temporalCoverageTo": "",\
            "issued": str(self.__transformTime("issued", self.__pkg[u'pub_time'])),\
            "modified": str(self.__transformTime("modified", self.__findModifiedTime())),\
            "spatial": self.__spatial,\
            "language": "",\
            "landingPage": "",\
            "keyword": self.__prepareTags(),\
            "numberOfData": "",\
            "notes": "",\
            "distribution": self.__prepareRSC()\
        }
        return postOrPUTData

        
#
# desc : check dataset existing in the postgresql server
# retn : 0 (failure) or 1 (success : already existing or creating one)
#
def syncNDCInitDataset(dbHost, dbPort, dbDB, dbTB, dbUser, dbPwd, pkg):
    # connect to postgresql
    p2l = py2psql(dbHost, dbPort, dbDB, dbTB, dbUser, dbPwd)
    
    # select conditions
    data = p2l.select({"cdcid":pkg[u"id"]},[],asdict=True)

    if len(data) > 0:
        # already exisiting in the local postgresql database
        return 1
    else:
        # not in local postgresql database
        return p2l.insert({ "cdcid" : pkg[u"id"], "state": u"none", "operation": u"none", "beginning": datetime.datetime.now() })
    
                                                
# -----------------------------------------------------------------------------------
# html context
# show = {"success"|"failure"|"sync"|"submit"} would be button style in html page
# clicking =  { "post"|"put"|"sync" }, means the action taken for the next step
#
# POST (create)
#   |- http://data.gov.tw/api/v1/rest/dataset
#   |- Method=POST
#
# PUT (update)
#   |- http://data.gov.tw/api/v1/rest/dataset/{identifier}
#   |- Method=PUT
#   |- example : http://data.gov.tw/api/v1/rest/dataset/A41000000G-000001
#
# DELETE (delete)
#   |- http://data.gov.tw/api/v1/rest/dataset/{identifier}
#   |- Method=DELETE
#   |- example : http://data.gov.tw/api/v1/rest/dataset/A41000000G-000001
#
# postgresql database
# TABLE ndcsync schema
# state = {"none"|"existing"|"deleted"} stands for ndc database
# operation = {"none"|"success"|"failure"|"syncing"} means current updating status
# -----------------------------------------------------------------------------------           

#
# desc : define in helper function
# getStatus = SYNCNDC("127.0.0.1", "5432", "ckan_default", "public.ndcsync", "ckan_default", "ckan", pkg, "http://data.gov.tw/api/v1/rest/dataset", "check")
# retn :
#  |- retState = {"show" : "failure" , "clicking" : "", "note" : ""}
#    |- show : button show (not clicking)
#    |- clicking : button show (after clicking)
#    |- note : text on the button
# multiprocessing method:
#  |- { "post"|"put"|"sync"|"deleted" }
#
def SYNCNDC(dbHost, dbPort, dbDB, dbTB, dbUser, dbPwd, getPKG, tgtSrc, tgtMtd, *args):
    
    # dbHost : postgresql server host
    # dbPort : postgresql server port
    # dbDB : postgresql server database
    # dbTB : postgresql server table
    # dbUser : postgresql server user
    # dbPwd : postgresql server password
    # getPKG : source package
    # tgtSrc : target source url
    # tgtMtd : target operaiton method, {"check", "delete"}
    # |- check : auto-check
    # |- delete : delete operation

    # first of all : initialize postgresql database
    status = syncNDCInitDataset(dbHost, dbPort, dbDB, dbTB, dbUser, dbPwd, getPKG)
    if status == 0:
        # initial database went error, this would be preferred to do another try in the next time
        return;

    # POST Data preparation
    if tgtMtd == "delete":

        try:

            # object to record each steps for syncing with NDC
            p2l = py2psql(dbHost, dbPort, dbDB, dbTB, dbUser, dbPwd)
                
            # write current state to NDC table in postgresql db server
            p2l.update({\
                "operation" : u"syncing".lower(), \
                "progress" : u"50%", \
                u"beginning" : datetime.datetime.now()\
                },{"cdcid" : getPKG[u'id']})
        
            # start delete from NDC            
            ndcid = p2l.select({"cdcid": getPKG[u'id']},["ndcid"],asdict=True)
            delFromNDC = SENDREQUEST(\
                tgtSrc + "/" + ndcid[0][u'ndcid'], \
                {"Authorization" : "api-key"}, \
                {},\
                "DELETE"\
            )
            #time.sleep(60)
        
            if json.loads(delFromNDC.response()["response"])['success']:
            #if True:
                # success POST                
                # write state to postgresql db server
                p2l.update({\
                    "operation" : u"success".lower(), \
                    "state" : u"deleted", \
                    "code" : str(delFromNDC.response()["response"]), \
                    "progress" : u"100%", \
                    u"ending" : datetime.datetime.now()\
                    },{"cdcid" : getPKG[u'id'], "ndcid" : ndcid[0][u'ndcid']})
            
            else:
                # failure POST
                p2l.update({\
                    "operation" : u"failure".lower(), \
                    "code" : str(delFromNDC.response()["response"]), \
                    "progress" : u"100%", \
                    u"ending" : datetime.datetime.now()\
                    },{"cdcid" : getPKG[u'id'], "ndcid" : ndcid[0][u'ndcid']})           

        except:
            p2l.update({\
                "operation" : u"failure".lower(), \
                "code" : u'unexcepted failure in delete', \
                "progress" : u"100%", \
                u"ending" : datetime.datetime.now()\
                },{"cdcid" : getPKG[u'id'], "ndcid" : ndcid[0][u'ndcid']})
        
    elif tgtMtd == "check":
        
        # get current state
        getStatue = syncNDCState(dbHost, dbPort, dbDB, dbTB, dbUser, dbPwd, getPKG)
        
        # object to record each steps for syncing with NDC
        p2l = py2psql(dbHost, dbPort, dbDB, dbTB, dbUser, dbPwd)
        
        # take action based on clicking
        if getStatue["clicking"] == "post":

            try:
            
                # get post json data
                postData = ASSEMBLEDATA(dbHost, dbPort, dbDB, dbTB, dbUser, dbPwd, getPKG)
            
                # write current state to NDC table in postgresql db server
                p2l.update({\
                    "operation" : u"syncing".lower(), \
                    "progress" : u"50%", \
                    u"beginning" : datetime.datetime.now()\
                    },{"cdcid" : getPKG[u'id']})
            
                # start post to NDC
                post2NDC = SENDREQUEST(\
                    tgtSrc, \
                    {"Authorization" : "api-key"}, \
                    postData.assemblePOSTOrPUTData(),\
                    "POST"\
                )
                #time.sleep(3)
            
                #if u'error' not in json.loads(post2NDC.response()["response"]) or u'錯誤' not in json.loads(post2NDC.response()["response"]) or json.loads(post2NDC.response()["response"])['success']:
                if json.loads(post2NDC.response()["response"])['success']:
                    # success POST                
                    # write state to postgresql db server
                    p2l.update({\
                        "operation" : u"success".lower(), \
                        "ndcid" : postData.assemblePOSTOrPUTData()["identifier"], \
                        "state" : u"existing", \
                        "code" : str(post2NDC.response()["response"]), \
                        "progress" : u"100%", \
                        u"ending" : datetime.datetime.now()\
                        },{"cdcid" : getPKG[u'id']})
                
                else:
                    # failure POST
                    p2l.update({\
                        "operation" : u"failure".lower(), \
                        "ndcid" : postData.assemblePOSTOrPUTData()["identifier"], \
                        "code" : str(post2NDC.response()['response']), \
                        "progress" : u"100%", \
                        u"ending" : datetime.datetime.now()\
                        },{"cdcid" : getPKG[u'id']})   
            except:
                # failure POST
                p2l.update({\
                    "operation" : u"failure".lower(), \
                    "ndcid" : postData.assemblePOSTOrPUTData()["identifier"], \
                    "code" : u'unexcepted failure in POST', \
                    "progress" : u"100%", \
                    u"ending" : datetime.datetime.now()\
                    },{"cdcid" : getPKG[u'id']})
            
        elif getStatue["clicking"] == "put":


            try:
                # get put json data
                putData = ASSEMBLEDATA(dbHost, dbPort, dbDB, dbTB, dbUser, dbPwd, getPKG)

                # write current state to NDC table in postgresql db server
                p2l.update({\
                    "operation" : u"syncing".lower(), \
                    "progress" : u"50%", \
                    u"beginning" : datetime.datetime.now()\
                    },{"cdcid" : getPKG[u'id']})

                # start put to NDC
                ndcid = p2l.select({"cdcid": getPKG[u'id']},["ndcid"],asdict=True)
                p2l.update({\
                    "operation" : u"syncing".lower(), \
                    "code" : u'prepare to NDC', \
                    "progress" : u"100%", \
                    u"ending" : datetime.datetime.now()\
                    },{"cdcid" : getPKG[u'id'], "ndcid" : ndcid[0][u'ndcid']})

                put2NDC = SENDREQUEST(\
                    tgtSrc + "/" + ndcid[0][u'ndcid'], \
                    {"Authorization" : "api-key"}, \
                    putData.assemblePOSTOrPUTData(),\
                    "PUT"\
                )
                #time.sleep(60)
                p2l.update({\
                    "operation" : u"syncing".lower(), \
                    "code" : u'syncing finishs execution, ready to write state', \
                    "progress" : u"100%", \
                    u"ending" : datetime.datetime.now()\
                    },{"cdcid" : getPKG[u'id'], "ndcid" : ndcid[0][u'ndcid']})

                if json.loads(put2NDC.response()["response"])['success']:
                #if True:
                    # success PUT
                    # write state to postgresql db server
                    p2l.update({\
                        "operation" : u"success".lower(), \
                        "state" : u"existing", \
                        "code" : str(put2NDC.response()["response"]), \
                        "progress" : u"100%", \
                        "ending" : datetime.datetime.now()\
                        },{"cdcid" : getPKG[u'id'], "ndcid" : ndcid[0][u'ndcid']})
                else:
                    # failure PUT
                    p2l.update({\
                        "operation" : u"failure".lower(), \
                        "code" : str(put2NDC.response()["response"]), \
                        "progress" : u"100%", \
                        "ending" : datetime.datetime.now()\
                        },{"cdcid" : getPKG[u'id'], "ndcid" : ndcid[0][u'ndcid']})

            except:
                # failure PUT
                p2l.update({\
                    "operation" : u"failure".lower(), \
                    "code" : u'PUT uncepted error', \
                    "progress" : u"100%", \
                    u"ending" : datetime.datetime.now()\
                    },{"cdcid" : getPKG[u'id'], "ndcid" : ndcid[0][u'ndcid']})            
        else:
            # getStatue["clicking"] == "sync"
            # this state is in syncing
            # there is not necessary to take any further actions
            return
        
    # remove from locked object
    link.acquire()
    execThread.remove(getPKG[u'id'])
    link.release()    

#
# desc : activate syncing to NDC by clicking
# clicking beginning from here
# exam : actSYNC2NDC("127.0.0.1", "5432", "ckan_default", "public.ndcsync", "ckan_default", "ckan", pkg, "http://data.gov.tw/api/v1/rest/dataset", "check")
#
execThread = []
link = threading.Lock()
def actSYNC2NDC(dbHost, dbPort, dbDB, dbTB, dbUser, dbPwd, getPKG, tgtSrc, tgtMtd):
    #thread.start_new_thread(SYNCNDC, (dbHost, dbPort, dbDB, dbTB, dbUser, dbPwd, getPKG, tgtSrc, tgtMtd))
    #SYNCNDC(dbHost, dbPort, dbDB, dbTB, dbUser, dbPwd, getPKG, tgtSrc, tgtMtd)

    link.acquire()
    
    if getPKG['id'] not in execThread:
        execThread.append(getPKG['id'])
        t = threading.Thread(target=SYNCNDC, args=(dbHost, dbPort, dbDB, dbTB, dbUser, dbPwd, getPKG, tgtSrc, tgtMtd))
        t.start()

    link.release()


# ...

__allowed_functions__ = [

    # ...

    'setUserState',
    'getUserOrgan',
    'getSysTime',
    'transTime',
    'syncNDCState',
    'syncNDCInitDataset',
    'SYNCNDC',
    'actSYNC2NDC',

```

### 帳號申請與變更表單
---

```python
#
# desc : get account info for account application
#
def getAccInfo(option, getReq):
    if option == "fullName":
        p2l = py2psql("127.0.0.1","5432","ckan_default","public.user","ckan_default","ckan")
        data = p2l.select({"name" : getPostRequestParamValue(getReq, "name")}, ["fullname"], asdict=True)
        return unicode(data[0]["fullname"], 'utf-8')
    elif option == "getDate":
        return str(datetime.datetime.now())[0:10]
    elif option == "email":
        p2l = py2psql("127.0.0.1","5432","ckan_default","public.user","ckan_default","ckan")
        data = p2l.select({"name" : getPostRequestParamValue(getReq, "name")}, ["email"], asdict=True)
        return unicode(data[0]["email"], 'utf-8')
    elif option == "org":
        p2l = py2psql("127.0.0.1","5432","ckan_default","public.group","ckan_default","ckan")
        data = p2l.select({"name": getPostRequestParamValue(getReq, "organ")},["title"],asdict=True)
        return unicode(data[0]["title"], 'utf-8')
        
        
__allowed_functions__ = [

    'getAccInfo',

]
```












