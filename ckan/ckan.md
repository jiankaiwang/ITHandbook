# CKAN

<script type="text/javascript" src="../js/general.js"></script>

CKAN 是著名的開放原始碼資料入口平台（Data Portal Platform），由非營利的 [CKAN Association](http://ckan.org/about/association/)
支持發展。

他的功能非常多，除了 data repository 外，還支援 visualization、search、tag、revision、share、organization...，更有許多的 plugins 可以強化其功能。

使用 CKAN 最有名的專案，係[英國政府開放資料平台](data.gov.uk) 。

CKAN 使用 Pylons 網頁框架開發，template 使用 jinja2，多國語言採用 Babel ，資料庫使用 PostgreSQL，ORM 是 Pylons 推薦的 SQLAlchemy，搜尋功能則採用 Apache Solr。

這篇教學文將說明如何從無到有安裝一個 CKAN2 網站。環境為 Ubuntu 14.04 LTS，大致按照官方文件 Install from Source 的方式。其他相關的使用心得也會一併公布於此。

## Resources

* CKAN 官方說明文件 ([http://docs.ckan.org/en/latest/contents.html](http://docs.ckan.org/en/latest/contents.html))
    * 撰寫模組文件 ([http://docs.ckan.org/en/latest/extensions/tutorial.html](http://docs.ckan.org/en/latest/extensions/tutorial.html))
    * 透過 IDatasetForm 客製化資料集欄位 ([http://docs.ckan.org/en/latest/extensions/adding-custom-fields.html](http://docs.ckan.org/en/latest/extensions/adding-custom-fields.html))

* Plugins :
    * ckanext-scheming ([原 ckan 模組](https://github.com/ckan/ckanext-scheming), [自製模組](https://github.com/jiankaiwang/ckanext-scheming))
    * ckanext-pages ([原 ckan 模組](https://github.com/ckan/ckanext-pages), [自製模組](https://github.com/jiankaiwang/ckanext-pages))
    * [Disqus](https://disqus.com/)
    * ckanext-basiccharts ([原 ckan 模組](https://github.com/ckan/ckanext-basiccharts), [自製模組](https://github.com/jiankaiwang/ckanext-basiccharts))

* Syntaxhighlighter ([Official](http://alexgorbatchev.com/SyntaxHighlighter/))
