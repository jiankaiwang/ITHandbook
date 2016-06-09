# Migrate a drupal website

<script type="text/javascript" src="js/general.js"></script>

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
```







