# 更改 python 預設版本 (CentOS)



###安裝新版本的 python
---

以下舉安裝 python 2.7 為例

```Bash
wget http://python.org/ftp/python/2.7.6/Python-2.7.6.tar.xz
tar xf Python-2.7.6.tar.xz
cd Python-2.7.6
sudo ./configure --prefix=/usr/local --enable-unicode=ucs4 --enable-shared LDFLAGS="-Wl,-rpath /usr/local/lib"
sudo make && make altinstall
```

###修改新版本的 python 成預設使用
---

* 主要可以分成兩步驟
  1. 移除 python 預設的連結
  2. 新增一連結到 /usr/bin，並連接到新的版本

```Bash
sudo rm /usr/bin/python
sudo ln -s /usr/local/bin/python2.7 /usr/bin/python
```