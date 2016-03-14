# ckanext-harvest
###架構
---
* harvest 的運作大致可分為三步驟（同時也是設計 harvesting interface 的主要結構）:
    * gather: 取得 harvest source 的 id, 數量等基本資訊。
    * fetch: 取得 source 中每個 object（物件，或稱資料集）之 metadata。
    * import: 將上一階段取得的 metadata 轉換並建立為 CKAN package（資料集）。

###功能簡介與使用
---
* 新增 harvest source: <br>
使用瀏覽器開啟 SITE_URL/harvest，選取右上之 “Add Harvest source”，依照畫面輸入 source 網址及選取 source 類別。

* 執行 harvest 工作（手動）
    * 進入 virtualenv，執行 gather 與 fetch handler：
```Bash
(pyenv) $ paster --plugin=ckanext-harvest harvester gather_consumer -c /etc/ckan/default/production.ini
(pyenv) $ paster --plugin=ckanext-harvest harvester fetch_consumer -c /etc/ckan/default/production.ini
```

| 註解 |
| -- |
| 請勿關閉這兩個 handler |

    * 使用瀏覽器開啟 SITE_URL/harvest，進入剛才建立的 harvest source，選擇右上的「管理者」按鈕，在接下來的頁面選取 Reharvest ，將此 harvest 工作送入排程。

    * 最後進入 virtualenv，執行 run handler：
```Bash
(pyenv) $ paster --plugin=ckanext-harvest harvester run -c /etc/ckan/default/production.ini
```




