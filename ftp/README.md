# FTP



### 背景介紹
* FTP 與其他通訊協定不同於，FTP 傳輸非僅由一條連線，一的步連接埠就能完成。
* FTP 連線需要由兩條連線，兩個連接埠完成，如下：
  1. FTP 命令通訊埠 : 一般而言為 Port 21。
  2. FTP 資料通訊埠 : 早期為 Port 20，已被修正。
* 依透過 Data Port 與 FTP Server 進行連線的方式，而又區分成 active (PORT) 與 passive (PASV) 模式。



### 主動式 (PORT) 連線
* 主動式連線為 FTP 伺服器會主動通過資料埠 (Port 20) 向用戶端建立資料連線。
* 主動式連線過程 :
  1. 用戶端假設使用 port 1025 與 FTP 伺服器建立連線，並同時提供 port 1026 作為資料傳輸的資訊給伺服器。
  2. 伺服器會於命令埠中取得資訊，並回應用戶端的連線。
  3. 伺服器會主動式透過 port 20 與用戶端的 port 1026 建立資料連線。
  4. 用戶端會接續透過 port 1026 與伺服器進行溝通。

![](../images/active_ftp.png)

### 被動式 (PASV) 連線
* 被動式連線為 FTP 伺服器會等待用戶端先傳入建立資料連線請求，為被動式等待建立連線。
* 被動式連線過程 :
  1. 假設用戶端使用 port 1025 與伺服器建立命令通道連線，並同時發出 PASV 的要求。
  2. 伺服器回應用戶端連線後，並通知用戶端假設已開啟 port 1030 等待建立資料連線。
  3. 用戶端收到命令後，便假設使用 port 1026 與伺服器的 port 1030 建立連線。
  4. 伺服器接到資料連線後而建立雙向資料通道。

![](../images/passive_ftp.png)



## Content

- [vsftpd on ubuntu](ftp/vsftpd_in_ubuntu.md)
- [vsftpd on centos](ftp/ftp_server.md)