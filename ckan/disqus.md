# Disqus



### 安裝路徑
---

* 路徑

```bash
/usr/lib/ckan/default/src/ckan/ckan/templates/
  |- snippets/
    |- disqus.html
```

### 內容
---

* 將於 disqus.com 下載的內容寫入 disqus.html 中

```
<div id="disqus_thread"></div>
<script>

/**
 *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
 *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables */
/*
var disqus_config = function () {
    this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
};
*/
(function() { // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = '//xxx.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
})();
</script>
```

### 加入 ckan
---

* 透過 snippet 方式加入即可

```
{% snippet "snippets/disqus.html" %}
```

