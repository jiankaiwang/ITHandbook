# VirtualBox (.vmdk) 發布到 Microsoft Azure VM

<script type="text/javascript" src="../gitbook/app.js"></script>
<script type="text/javascript" src="../js/general.js"></script>

很多時候開發團隊會在本機或組織內將服務以 local VM 進行開發，例如 VirtualBox 或是 VMware 等，但隨著雲端技術的演進，便需要將此 local VM 上到雲端，例如 Azure 等。因此本篇將介紹如何將建立在 VirtualBox 的 VM (副檔名為 .vmdk) 轉換到 Azure VM (.vhd)。

過程主要包含三個步驟；
1. 將 VirtualBox 的 .vmdk 檔案轉換成 .vhd 檔案
2. 透過 Azure SDK (PowerShell) 上傳 .vhd 虛擬機檔案 : 透過建立儲存體方式存入
3. 透過網頁來部署虛擬機 : 建立虛擬機並連結含有虛擬機檔案的儲存體

###將 .vmdk 檔案轉換成 .vhd 檔案
---

有下列三種方式來轉換

* 透過微軟的 MVMC (Microsoft Virtual Machine Converter) 工具 : 不推薦

MVMC 工具僅支援少數幾種 VM ，如 VMware vSphere, VMware vCenter 等，與更常見的 VMware Workstation 不相同，雖然 vSphere 可以達成更完整的硬體虛擬化，但對於大部分的開發條件過於大材小用，所以並不常見。

* 透過第三方免費軟體 Vmdk2Vhd ([Offical Download Link](http://www.softpedia.com/get/System/File-Management/Vmdk2Vhd.shtml)) : 推薦使用

相當直覺化的操作，選取代轉換的 vmdk 檔案，並選擇要輸出的路徑，之後便點擊 convert 即可，如下圖；

![](../../images/vmdk2vhd.png)

* 透過第三方共享軟體 WinImage ([Offical Download Website](http://www.winimage.com/download.htm))


