# 佈署

由於 CKAN 使用 pylons 開發，只要使用任何支援 WSGI 標準的網頁伺服器 (及相關套件) 即可佈署 CKAN。 官方文件 提供多種佈署方式，此教學使用 nginx + uwsgi 方式，較官方示範之 Apache + modwsgi + nginx 單純。

###新增 production.ini 設定檔
---
