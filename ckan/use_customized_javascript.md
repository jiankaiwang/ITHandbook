# 使用 Javascript



以 DOM 為主的 Javascript library 創造出多樣化的網頁視覺效果，在 CKAN 中亦可加入外部 Javascript library 或是自定義的函式庫來使用，但 ** 因 Javascript 使用有載入資源先後而出現找不到資源等問題 (如 CKAN 已引用 jQuery，但是在 html 文件載入後期導入，造成透過 &lt;script&gt; 等方式引用需要依賴 jQuery 的函式庫會較早 jQuery 載入而出現錯誤)**，且 ** CKAN 會將多個 javascript 函式庫進行封裝後統一引用 (因此官方建議引用的 javascript library 不要以 min.js 型式引用，CKAN 會將之壓縮整合後統一引用)**，故在 CKAN 中建議以 ** resource.config ** 中定義使用資源的方式為佳。

###透過 resource.config 定義引用 Javascript 函式庫
---

定義引用 Javascript 函式庫的設定檔為 ** resource.config ** ( /usr/lib/ckan/default/src/ckan/ckan/public/base/javascript/resource.config )

設定檔案內部定義了 javascript 引用的方式，如下；

```Bash
[main]

dont_bundle = tracking.js

[depends]

main = vendor/vendor
ckan = vendor/bootstrap
tracking.js = vendor/jquery.js

[custom render order]

apply_html_class = 1

[inline scripts]

apply_html_class =
    document.getElementsByTagName('html')[0].className += ' js';

[groups]

ckan =
    modules/select-switch.js
    modules/slug-preview.js
    modules/basic-form.js
    modules/confirm-action.js
    modules/api-info.js
    modules/autocomplete.js
    modules/custom-fields.js
    
    #...
    
main =
    apply_html_class
    plugins/jquery.inherit.js
    plugins/jquery.proxy-all.js
    plugins/jquery.url-helpers.js
    plugins/jquery.date-helpers.js
    
    # ...
```

在 CKAN 中可以透過 groups 來定義不同的 html 文件使用不同的 javascript 函式庫以提升系統效能，但若是多個 html 頁面皆會使用或是一些通用的自訂函式，則可以直接列於 main 的 group 中，底下說明引用的方法；

| 註解 |
| -- |
| ** 假設引用位於 /usr/lib/ckan/default/src/ckan/ckan/public/base/javascript/custom/ 底下的 highcharts.src.js, plotly.js, general.js 等來自不同第三方與自定義函式庫 **，則因此函式庫在多個頁面皆會用到，因此定義在 ** main ** group 底下。 |

於 main group 底下加入要引用的 javascript 檔案及其相對路徑 (相對於 ** /usr/lib/ckan/default/src/ckan/ckan/public/base/javascript/ **  的路徑)；

```Bash
main =
    apply_html_class
    plugins/jquery.inherit.js
    plugins/jquery.proxy-all.js
    plugins/jquery.url-helpers.js
    plugins/jquery.date-helpers.js
    plugins/jquery.slug.js
    plugins/jquery.slug-preview.js
    plugins/jquery.truncator.js
    plugins/jquery.masonry.js
    plugins/jquery.form-warning.js

    sandbox.js
    module.js
    pubsub.js
    client.js
    notify.js
    i18n.js
    main.js

    # 加上自定義或第三方函式庫於 main group 的方法
    custom/highcharts.src.js
    custom/plotly.js
    custom/general.js
```

加入後，重新啟動 CKAN 即可。








