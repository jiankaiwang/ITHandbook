# SSL / TLS

<script type="text/javascript" src="../js/general.js"></script>

### Certificate Authority
---

* Certificate Authority (CA), including
  * generating a private key 
  * and a signed certificate (.crt) by the key, the crt containing company information

```bash
$ openssl req -new -x509 -days <duration> -extensions v3_ca -keyout ca.key -out ca.crt
```

### Server
---

* Server Side

```bash
# generate private key without encryption as the server key
$ openssl genrsa [-rsa|-des3|-aes256] -out server.key 2048

# generate a certificate signing request to send to the CA
# server.csr saves lots of information of the company
$ openssl req -out server.csr -key server.key -new
```

* After sending the server.csr to the CA, or sign it with your CA

```bash
$ openssl x509 -req -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out server.crt -days <duration>
```

### Client
---

* Client Side

```bash
# generate a client key
$ openssl genrsa [-rsa|-des3|-aes256] -out client.key 2048

# generate a certificate signing request to send to the CA
$ openssl req -out client.csr -key client.key -new
```

* After sending the client.csr to the CA, or sign it with your CA

```bash
$ openssl x509 -req -in client.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out client.crt -days <duration>
```

### Flow
---

![](/images/ssl-tls.png)










