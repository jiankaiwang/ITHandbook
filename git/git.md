# Git

<script type="text/javascript" src="../js/general.js"></script>

###安裝 Git 於 Linux
---

* 取得必要安裝檔案：
  1. Git 主要安裝檔 : [Linux-based Tarballs](https://www.kernel.org/pub/software/scm/git/)
  2. asciidoc 安裝檔 : [Sourceforge](https://sourceforge.net/projects/asciidoc/files/latest/download)

* 安裝步驟：

| 註解 |
| -- |
| 安裝可以參考 git 解壓後的文件 INSTALL |

```Bash
# 安裝必要套件
# 將檔名轉成 .zip 並解壓縮
# 取得 asciidoc 壓縮檔，解壓縮後安裝
$ sudo wget https://sourceforge.net/projects/asciidoc/files/latest/download
$ mv ./download ./download.zip
$ sudo mv ./download ./download.zip
$ sudo mv /home/jkw/桌面/asciidoc-8.6.9.zip ./
$ sudo unzip ./asciidoc-8.6.9.zip 
$ sudo chown -R jkw:jkw ./asciidoc-8.6.9
$ cd ./asciidoc-8.6.9/
$ ./configure 
$ sudo make install

# 將資料夾移動至 /usr/local/src/
# 安裝 git
$ sudo mv ./git-2.8.2 /usr/local/src/
$ cd /usr/local/src/git-2.8.2/
$ make configure
$ ./configure --prefix=/usr
$ make all doc
# make install install-doc install-html
```

* 檢查 git 版本確認是否安裝完成

```Bash
git --version
```

