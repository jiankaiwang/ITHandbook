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
# 取得 xmlto 套件並進行安裝
$ sudo yum install -y xmlto.x86_64

# 取得 asciidoc 壓縮檔，解壓縮後安裝
$ wget https://sourceforge.net/projects/asciidoc/files/latest/download
$ mv ./download ./asciidoc-8.6.9.tar.gz
$ gunzip ./asciidoc-8.6.9.tar.gz
$ tar xvf ./asciidoc-8.6.9.tar
$ cd ./asciidoc-8.6.9/
$ ./configure 
$ sudo make install

# 將資料夾移動至 /usr/local/src/
# 安裝 git
$ wget https://www.kernel.org/pub/software/scm/git/git-2.9.0.tar.gz
$ gunzip ./git-2.9.0.tar.gz
$ tar xvf ./git-2.9.0.tar
$ sudo mv ./git-2.9.0 /usr/local/src/
$ cd /usr/local/src/git-2.9.0/
$ make configure
$ ./configure --prefix=/usr
$ make all doc
$ sudo make install install-doc install-html
```

* 檢查 git 版本確認是否安裝完成

```Bash
git --version
```

