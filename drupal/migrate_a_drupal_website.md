# Migrate a drupal website

<script type="text/javascript" src="../js/general.js"></script>

###完整備份網站資料夾，並移至另一主機
---

舉例而言，若 drupal 網站放置於 /var/www/html/nexus 下，則需要將整個網站進行備份，並放置於 jkw 的桌面上

```Bash
# 複製資料夾於主機中
$ sudo cp -r /var/www/html/nexus /home/jkw/桌面

# 移至桌面
cd /home/jkw/桌面

# 壓縮打包此網站內容
$ sudo tar -jcv -f ./nexus.tar.bz2 ./nexus

# 設定讀取權限
$ sudo chown jkw:jkw ./nexus.tar.bz2
```

可利用 FTP 將此資料傳輸到要架設的主機上，並將之置於使用者 admin 桌面，假設要放置網站於 /var/www/html 下

```Bash
# 先移至 admin 桌面
$ cd /home/admin/桌面

# 解壓縮
$ tar -jxv -f ./nexus.tar.bz2 -C ./nexus

# 複製至 apache 網站根目錄下
$ sudo cp -r ./nexus /var/www/html
```

###設定權限與 SELinux
---

```Bash
# 將使用此資料夾權限設定給 apache
$ sudo chown apache:apache -R /var/www/html/nexus

# 設定此資料夾底下目錄為 html 內容
$ sudo chcon -Rv --type=httpd_sys_content_t /var/www/html/nexus

# 查看 selinux 是否已經標籤
$ ls -alZ /var/www/html/nexus

# 還原預設 selinux 安全性
$ sudo restorecon -Rv /var/www/html/nexus
```

###設定資料庫與 htaccess
---

假設原資料庫是透過 sqlite 進立於 sites/default/file/.ht.sqlite，而 htaccess 建立於 sites/default/file/.htaccess，需要將此兩項設定權限為全部皆可讀寫；

```Bash
# 設定 sqlite 資料庫讓全部人都能用
$ sudo chmod 777 /var/www/html/nexus/sites/default/file/.ht.sqlite 

# 設定 htaccess 
$ sudo chmod 777 /var/www/html/nexus/sites/default/file/.htaccess 
```

###重新取得資料庫設定
---

因新的網站需要使用新的設定，可以直接刪除 sites/default/setting.php 檔案，並重新讓 drupal 進行設定即可：

```Bash
# 先備份原始設定檔
$ sudo mv /var/www/html/nexus/sites/default/settings.php /var/www/html/nexus/sites/default/settings.php.backup

# 直接刪除 settings.php 檔案即可
$ sudo rm -f /var/www/html/nexus/sites/default/settings.php
```

此時需要透過瀏覽器連入此網站進行設定，例如 http://localhost/nexus/ ，之後在設定時輸入與資料庫相同的設定，並點擊「檢視現有網站」即完成移轉 drupal 網站。














