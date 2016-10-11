# CSR from OpenSSL

<script type="text/javascript" src="../js/general.js"></script>

### 首先產生 private.key (私密金鑰)
---

* 私鑰可用於之後 CSR 加密使用

```bash
# private.key 為產生私鑰的檔案名稱
# 2048 為私鑰 byte 長度
$ openssl genrsa -out private.key 2048
```

### 配合使用私鑰產生 CSR (certificate signing request)

```bash
# private.key 為上一步產生私鑰
# example.csr 為產生的檔案
$ openssl req -new -sha256 -key private.key -out example.csr
```

* 執行會出現底下資訊需要填入

```bash
# 國名, 如 TW
Country Name (2 letter code) [XX]:TW

# 州郡名, 如 Taiwan
State or Province Name (full name) []:Taiwan 

# 城市名稱，如 Taipei
Locality Name (eg, city) [Default City]:Taipei

# 組織名稱，如 Example Inc
Organization Name (eg, company) [Default Company Ltd]:Example Inc

# 單位名稱，如 IT
Organizational Unit Name (eg, section) []:Security Dept

# 網域名稱，如 www.example.com
Common Name (eg, your name or your server's hostname) []:www.example.com

# 電子郵件，可不填
Email Address []:

Please enter the following 'extra' attributes to be sent with your certificate request

# 用來產生部分的 CSR 內容，可不填，建議留白
A challenge password []:

# 公司別稱，可不填
An optional company name []:
```

