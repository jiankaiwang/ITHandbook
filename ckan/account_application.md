# 帳號審核清單

<script type="text/javascript" src="../js/general.js"></script>

### 使用時機
---

* 當該組織需有效性管理帳號時，可以透過申請單方式進行

### 透過前端 javascript 建立列印表單
---

* 於 javascript library 中建立要呈現的表單格式

```bash
(default) $ vim /usr/lib/ckan/default/src/ckan/ckan/public/base/javascript/custom/general.js
```

* 函式內容如下

```js
/*
* desc : print the desired content of html
* param@appType : 新增/變更
* param@acc : 帳號 (英文數字)
* param@fullName : UTF-8 格式字串
* param@getDate : yyyy-MM-DD
* param@org : 要加入的組織
* param@email : 使用的 email
*/
function printDiv(
  appType,
  acc,
  fullName,
  getDate,
  org,
  email
) {
  // get the inner content
  var oldPage = document.body.innerHTML;
  var oldTitle = document.title;

  // reset the content for printing
  var content = "";
  content += "<html><head><title>帳號開通變更申請單</title></head><body>";
  content += '<h1 style="font-weight: bold; text-align: center;">組織名稱</h1>';
  content += '<h3 style="font-weight: bold; text-align: center;">開放資料平台帳號申請/異動單</h3>';
  content += '<table class="table table-header table-hover table-bordered text-center" style="width: 100%;">';
  content += '<col width="30" /><col width="70" />';
  content += '<thead>';
  content += '<tr ><th scope="col">項目</th><th scope="col">內容</th></tr>';
  content += '</thead>';
  content += '<tbody>';
  content += '<tr><th scope="col" >類型</th><th scope="col">' + appType + '</th></tr>';
  content += '<tr><th scope="col" >帳號</th><th scope="col">' + acc + '</th></tr>';
  content += '<tr><th scope="col" >全名</th><th scope="col">' + fullName + '</th></tr>';
  content += '<tr><th scope="col" >日期</th><th scope="col">' + getDate + '</th></tr>';
  content += '<tr><th scope="col" >單位</th><th scope="col">' + org + '</th></tr>';
  content += '<tr><th scope="col" >郵件</th><th scope="col">' + email + '</th></tr>';
  content += '<tr><th scope="col" >申請人簽章</th><th scope="col"></th></tr>';
  content += '<tr><th scope="col" >系統權責審核</th><th scope="col"></th></tr>';
  content += '<tr><th scope="col" >資訊室權限設定</th> <th scope="col"></th></tr>';
  content += '</tbody>';
  content += '</table>';
  content += '<hr />';
  content += '<table class="table table-header table-hover table-bordered text-center" style="width: 100%;">';
  content += '<col width="30" /><col width="70" />';
  content += '<thead>';
  content += '<tr><th scope="col">項目</th><th scope="col">內容</th></tr>';
  content += '</thead>';
  content += '<tbody>';
  content += '<tr><th scope="col">帳號開通</th><th scope="col" style="text-align: left;">資訊室負責人</th></tr>';
  content += '<tr><th scope="col">業務</th><th scope="col" style="text-align: left;">業務負責</th></tr>';
  content += '</tbody>';
  content += '</table>';
  content += '<h5 style="text-align: right;">開放資料平台帳號申請/異動單 Ver.1.0</h5>';
  content += "</body></html>";
  document.body.innerHTML = content;
  document.title = '開放資料帳號申請/變更單 - ' + fullName;

  // print Page
  window.print();

  // restore the content for showing
  document.body.innerHTML = oldPage;
  document.title = oldTitle;
}
```

| 註解 |
| -- |
| 需注意此 general.js 函式庫已定義在 resource.config 中 |

### 定義 helpers.py 函式
---

* 伺服器用來取得資料庫內容

```bash
(default) $ vim /usr/lib/ckan/default/src/ckan/ckan/lib/helpers.py
```

* 可以參考 helpers.py 定義與設定

### 加入註冊頁面中
---

* 列印選項

```bash
(default) $ vim /usr/lib/ckan/default/src/ckan/ckan/templates/user/register_complete.html
```

* 內容 (需配合上述 javascript)

```html
      <!-- -->
      
      <a href="#" onclick="javascript:printDiv('新增帳號','{{ h.getPostRequestParamValue(request.body, 'name') }}','{{ h.getAccInfo('fullName', request.body) }}', '{{ h.getAccInfo('getDate', request.body) }}', '{{ h.getAccInfo('org', request.body) }}', '{{ h.getAccInfo('email', request.body) }}' );">{{ h.getLangLabel("Document Download","帳號審核文件下載") }}</a>
      <hr />
       <h3 class="page-heading">{{ h.getLangLabel("Trouble Shooting","困難排除") }}</h3>
      
      <!-- -->
```





