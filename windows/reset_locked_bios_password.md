# Reset locked BIOS password

<script type="text/javascript" src="../js/general.js"></script>

前言：遺失進入 BIOS 的密碼，且已連續輸入三次錯誤而取得已鎖住密碼的提示

###原測試方法
---

硬體解方法：

* 將 BIOS 電池取下閒置超過 1 小時

* 過程幾次長按開機紐進行硬體放電

* 將主機板 JUMP 重新安裝

軟體解方法：

* 透過萬用密碼

* 透過 [Online BIOS Password Generator](https://bios-pw.org/) 取得密碼

* 透過 Cmospwd_win 進行 CMOS 清除 (ioperm.exe 不能啟動，1275 防止驅動載入)

* 透過 CMOS De-Animator v3 進行完整抹除 BIOS

###成功的測試方法
---

| 註解 |
| -- |
| 因上述常見方法皆無效，因為一般使用者指令及 APP 皆無法有效存取 BIOS ，有可能是 ring 3 問題，也可能有 EEPROM 支援而導致無效。因此接下來直接透過 Win98 環境搭配 clnpwd 進行 BIOS 密碼移除。 |

* 下載 UltraISO, Win98E boot 映像檔 (.iso) 及 clnpwd 執行檔

* 製作 USB bootable USB
  1. 開啟 UltraISO
  2. 載入.iso 映像檔
  3. [選單] 可開機的，寫入磁碟映像檔


* 將 clnpwd.exe 複製到 bootable USB 中

* 利用 USB 開機 (若是開機順序 1st 為硬碟，則可以先將硬碟取出)

* 在 DOS 環境下，直接執行 clnpwd.exe，然後選取 2 (Clean Supervisor Password)

* 之後就可進入 BIOS，可以設定新的 BIOS 管理者密碼
