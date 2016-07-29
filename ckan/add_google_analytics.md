# 加入 Google Analytics

<script type="text/javascript" src="../js/general.js"></script>

### 直接透過加入 Script 完成
---

* 先於 ** public/base/javascript/ ** 位置下加入 Google analytics 的 script 

```bash
# 放置 GA 的位置
$ vim /usr/lib/ckan/default/src/ckan/ckan/public/base/javascript/google-analytics.js
```

```javascript
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', '...', 'auto');
  ga('send', 'pageview');
```

* 透過 resource.config 加入即可

```bash
# 編輯資源檔
vim /usr/lib/ckan/default/src/ckan/ckan/public/base/javascript/resource.config

# main group 底下加入要引用的 javascript 檔案及其相對路徑
main = 

    ...

    i18n.js
    main.js
    
    google-analytics.js
    
    ...
```

* 重啟服務

```bash
$ sudo restart ckan
```

