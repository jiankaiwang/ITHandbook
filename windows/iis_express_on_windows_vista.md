# IIS Express On Windows Vista



###於 windows vista 下創立一個簡單的伺服器
---

* 先於 [控制台] -> [開啟或關閉 Windows 功能] (所有內建 IIS 相關模組關閉)

* 於 windows 官網中下載 iis express

* 也可於 [iis express GUI](https://iisexpressgui.codeplex.com/) 官網中下載 GUI 介面

* 用 cmd 移到 iis express 預設資料夾 C:\Program Files\IIS Express\ 下

* 鍵入底下 cmd

```Bash
iisexpress.exe "/path=C:\Users\jkw\Documents\My Web Sites\JKW" /port=80
```
表示開啟 port 80 (http) 並將引導至 C:\Users\jkw\Documents\My Web Sites\JKW 下，如此一來，便可以完成直接導向的功能，為簡易伺服器的產生，可以直接用瀏覽器開啟 http://localhost:80/ 來測試。

* 若是上列 cmd 出現錯誤，可以使用底下的 cmd (將引號拿掉，將 = 改成 :)

```Bash
iisexpress /path:c:\Users\jkw\Dropbox\Public\JianKaiWang\ /port:80
```

* 或是更直接利用 .config 紀錄的 website 名稱 (參考底下 applicationhost.config 檔案)，鍵入底下 cmd

```Bash
iisexpress /site:Personal
```

* 若使用 iis express GUI 介面，則安裝 IIS 則需要完全採用預設路徑，其作用與 cmd 幾乎類似

* 而若要想在多個 IP 位置允許連入，則需要改 IIS express 的指定為 IP 及 port，修改預設路徑 C:\User\Documents\jkw\文件\IISExpress\config\applicationhost.config，利用 Ctrl+F 尋找 bindings，便可以看出 Windows 利用類似 xml 格式紀錄每一個 site，於 binding information 下新增所有相關的 IP，如下：

```Bash
binding protocol="http" bindingInformation=":80:localhost"
binding protocol="http" bindingInformation=":80:127.0.0.1"
binding protocol="http" bindingInformation=":80:10.0.2.15"
```

* 設定完畢後，便進行 firewall 的設定，將傳入規則中 port 80,8080 等開啟，可以利用小紅傘來設定

* 之後可以再利用底下 cmd

```Bash
iisexpress.exe "/path=C:\Users\jkw\Documents\My Web Sites\JKW" /port=80 進行重啟
```

* 若是開不起來，可以開啟 cmd 鍵入底下指令來嘗試修改 http.sys 檔案，如下

```Bash
netsh http add urlacl url=http://localhost:80/ user=everyone
netsh http add urlacl url=http://127.0.0.1:80/ user=everyone
netsh http add urlacl url=http://100.0.0.1:80/ user=everyone (100.0.0.1 為預設)
```

###配合 Virtualbox 進行 port 轉至 VM 內的 httpd (CentOS-based)
---

* 首先需要先從 host OS (WinVista) 下，找出 NAT 連接的乙太網路卡 VirtualBox Host-Only Network，舉例而言為 192.168.56.1，而此 VM 的 httpd port 為 80

* 之後於 VM CentOS 下利用 ifconfig 找出改  NAT 給予的 ip，舉例為 10.0.2.15

* 於 Host OS 開啟 VirtualBox，進入[設定值] -> [網路] -> [NAT 介面卡] -> [連接埠轉送] -> [新增 rule] -> 主機 ip 輸入 192.168.56.1 (host 看到的部分) -> 主機連接埠預設為 9000 (此需用來與 vista os 的 forwarding port 連接) -> 客機 IP 為 10.0.2.15 (VM 內自己看到的) -> port 80 (httpd) -> [確定] -> 啟動  VM -> [ WinVista 允許防火牆]

* 設定 host firewall，將傳入規則中 port 7373 等開啟，準備給外部連入使用

* 於 host OS 中，直接利用 cmd 輸入底下命令

```Bash
netsh interface portproxy add v4tov4 listenport=7373 listenaddress=100.0.0.1 connectport=9000 connectaddress=192.168.56.1
```

* 如此便可以完成外部連入 ip 100.0.01 的 7373 port，藉由 Virtualbox 內網卡的虛擬 IP 192.168.56.1 中的 port 9000 傳入給 VM OS 對應的 IP 10.0.2.15 中的 80 port

###Host 的完整啟動
---

* 開機後，先啟動 Virtual Box，開啟 VM1 (CentOS)

* 啟動 IISexpressGUI，啟動 iisexpress.exe

* 將 portproxy 啟動

###關閉 IIS express
---

* 開啟 command，並鍵入

```Bash
taskkill.exe /IM iisexpress.exe
```







