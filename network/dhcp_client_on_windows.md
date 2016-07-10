# DHCP Client On Windows

<script type="text/javascript" src="../js/general.js"></script>

常會有下面的情況發生：

* 在學校、機關、公司、研究室等，會給予一組固定連線資訊(固定 IP, mask, gateway 等) -> static mode

* 離開上述地方後，進入一般民營企業的網路設置範疇，則是動態的取得 IP -> dhcp mode

然而一直需要開啟 " 網路和共用中心 " 來進行設置 IP 等資訊頗為麻煩，因此接下來用兩個 script 來直接設置 dhcp 模式或是 static IP 模式。

###dhcp mode to static mode
---

```Bash
netsh interface ip set address "區域連線" static 140.112.117.203 255.255.255.0 140.112.117.254 1
netsh interface ip add dns name="區域連線" addr=140.112.1.2
netsh interface ip add dns name="區域連線" addr=140.112.1.21 index=2
```

* netsh interface 表示進入 network shell 的介面操作(interface)

* set address "區域網路" -> " 區域網路 "名稱必須視你目前的網路硬體設置狀況來決定(由 cmd -> ipconfig 來查看)

* static x.x.x.x y.y.y.y z.z.z.z 1 -> x 為固定 IP 位置, y 為子網路遮罩, z 為預設閘道

* add dns name="區域網路" addr=w -> 此需要配合上述 set address 後的名稱一致, w 為 dns 查詢主機位置

* index=2 -> 表示新增到第二個 dns 伺服器位置

* 然後存成 .bat 檔案，若在 windows vista 以上的版本，可以按右鍵中 "以系統管理員身分進行" 來執行組態更換

###static mode → dhcp mode
---

```Bash
netsh interface ip set address "區域連線" dhcp
netsh int ip set dns "區域連線" source=dhcp
ipconfig/release
ipconfig/renew
```

* set address "區域連線" dhcp -> 表示將此連線模式改成動態取得 IP, mask, gateway 等資訊

* set dns "區域連線" source=dhcp -> 概念和上述一樣

* ipconfig/release 與 ipconfig/renew -> 表示刪除目前的組態，然後根據現在的網路狀況自動取得新組態

* 然後存成 .bat 檔案，若在 windows vista 以上的版本，可以按右鍵中 "以系統管理員身分進行" 來執行組態更換

如此一來，便可以直接利用兩個 .bat 批次處理檔案來完成轉換網路 dhcp 與 static mode 的設置，到需要固定 IP 的網路環境，可以用 static mode(atWork.bat) 來設置，到動態取得網路組態環境，則用 dhcp mode(atHome.bat) 來設置。
















