# 擴充
* DataStore 是一個內建於 CKAN 的擴充套件 (extension)，透過一獨立資料庫儲存上傳至 CKAN 之結構資料內容（CSV 或 XLS 檔案，無論為上傳至本機的檔案或僅有連結）。

* DataPusher 是一個 CKAN 的擴充套件 (extnsion)，用以於新增前述的結構資料至 CKAN 時，自動上傳資料內容至 DataStore 資料庫。

###功能簡介

---

* DataStore
    * 上傳至資料庫的資料內容，可提供資料預覽外掛使用。
    * 提供 [DataStore API](http://docs.ckan.org/en/latest/maintaining/datastore.html#the-datastore-api) 可供開發者以 RESTful API 取得 JSON 格式資料。


* DataPusher
    * 自動上傳資料內容至 DataStore 資料庫。
    * 可自資料編輯頁面之「DataStore」頁籤確認上傳狀態或手動上傳資料至 DataStore 資料庫。


###系統需求
* CKAN (>=2.1)
* PostgreSQL (>=9.0)

| 註解 |
| -- |
| 若依照本文件的教學安裝 CKAN，你應該已經滿足所有套件需求 |





