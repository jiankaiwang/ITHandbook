# 在 chanext-pages 中加入 developer 程式碼區塊

<script type="text/javascript" src="../js/general.js"></script>

### 使用 syntaxhighlighter
---

* 底下以 3.0.83 為例

* 將解壓縮後必要資源 ** scripts/shCore.js **, ** scripts/shBrushPython.js ** 與 ** scripts/shBrushPython.js ** 置於伺服器 ** public/base/javascript/syntaxhighlighter ** 底下

* 將解壓縮後必要資源 ** styles/shCoreDefault.css ** 置於伺服器 ** public/base/css ** 底下

* 將 css 加入 ** base.html 中來引用

```bash
. /usr/lib/ckan/default/bin/activate
vim /usr/lib/ckan/default/src/ckan/ckan/templates/base.html
```

透過 link 方式加入

```html
<link rel="stylesheet" href="/base/css/shCoreDefault.css" />
```

* 將 js 加入 ** resource.config ** 中

```bash
. /usr/lib/ckan/default/bin/activate
vim /usr/lib/ckan/default/src/ckan/ckan/public/base/javascript/resource.config
```

加入 main 底下

```bash
main =

    ...

    syntaxhighlighter/shCore.js
    syntaxhighlighter/shBrushJScript.js
    syntaxhighlighter/shBrushPython.js
```

