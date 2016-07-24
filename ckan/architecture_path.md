# 主路徑架構

<script type="text/javascript" src="../js/general.js"></script>

###佈署設定檔
---

* 進行虛擬環境

```bash
. /usr/lib/ckan/default/bin/activate
```

* 測試與正式佈署組態檔案 (.ini)

```bash
/etc/ckan/default/
  |- development.ini  # 測試環境
  |- production.ini  # 正式環境
```

* 執行測試環境 (需要注意已進入虛擬環境)

```bash
# 以測試組態檔來開啟新的 server 進行測試 (可以透過 http://xxx.xxx.xxx:5000/ 進入測試環境)
paster serve /etc/ckan/default/development.ini
```

###架構路徑
---

```bash
/usr/lib/ckan/
  |- default/
    |- src/
      |- ckan/
        |- ckan/
          |- lib/
            |- helpers.py  # 主要定義 helper python 函式
```


