# Jenkins 整合 SourceMonitor 工具

<script type="text/javascript" src="../js/general.js"></script>

* SourceMonitor 為一分析程式碼複雜度的工具。

###報表內容準備
---

* 於安裝 SourceMonitor 資料夾下準備 **sample_commands.xml** 設定組態檔。

```bash
# 一般而言，是位於安裝路徑下
C:\Program Files (x86)\SourceMonitor\Samples\sample_commands.xml
```

* 準備於 Jenkins 中呈現報表使用的檔案

因 SourceMonitor 沒有自身開發的顯示頁面，故主要是透過 ** HTML Publisher Plugin ** 來顯示於 Jenkins 的專案畫面上。而為了使用此 plugin，需要有兩個專屬 SourceMonitor 使用的 xsl 模版， ** SourceMonitor.xsl ** 及** SourceMonitorSummaryGeneration.xsl **。

###安裝與設定 HTML Publisher Plugin
---

* 於 Jenkins Server 系統頁面，選擇左側「管理 Jenkins」中「管理外掛程式」，選擇「HTML Publisher plugin」，並進行安裝即可。

* 開啟 SourceMonitor，並確定允許編碼 UTF-8 掃描的選項為開啟。

```text
「File」 > 「Options」 > 「Allow parsing of UTF-8 files」
```

* 安裝完後，進入要使用此 plugin 的專案，選擇左側的


