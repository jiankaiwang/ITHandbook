# FTP

<script type="text/javascript" src="../js/general.js"></script>

### 背景介紹
---

* FTP 與其他通訊協定不同於，FTP 傳輸非僅由一條連線，一的步連接埠就能完成。
* FTP 連線需要由兩條連線，兩個連接埠完成，如下：
  1. FTP 命令通訊埠 : 一般而言為 Port 21。
  2. FTP 資料通訊埠 : 早期為 Port 20，已被修正。
* 依透過 Data Port 與 FTP Server 進行連線的方式，而又區分成 active (PORT) 與 passive (PASV) 模式。

### 主動式 (PORT) 連線
---

* 主動式連線為 FTP 伺服器會主動通過資料埠 (Port 20) 向用戶端建立資料連線。

### 被動式 (PASV) 連線
---

* 被動式連線為 FTP 伺服器會等待用戶端先傳入建立資料連線請求，為被動式等待建立連線。
