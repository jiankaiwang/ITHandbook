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

* 主動式 FTP 流程
  1. FTP 伺服器啟動 Port 21 接受外部任意通訊埠的連線要求 (由用戶端要求建立連線)
  2. FTP 伺服器使用 Port 21 回應用戶端的任一大於 1023 命令埠
  3. FTP 伺服器使用 Port 20 主動建立資料連線到用戶端任一大於 1023 通訊埠
  4. FTP 伺服器使用 Port 20 接受來自用戶端任一大於 1023 通訊埠的回覆伺服器資料連線。

### 被動式 (PASV) 連線
---


