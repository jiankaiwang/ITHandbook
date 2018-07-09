# Use Certificate



## Let's Encrypt Service

- get the certificate

```bash
$ git clone https://github.com/letsencrypt/letsencrypt
$ cd letsencrypt
$ ./letsencrypt-auto certonly --manual --email admin@example.com -d example.com
```

- [optional] no http server, then run on python server

```bash
$ sudo -s
$ mkdir -p /tmp/certbot/public_html/.well-known/acme-challenge
$ cd /tmp/certbot/public_html
$ printf "%s" code1.code2 > .well-known/acme-challenge/code1

# run only once per server:
$(command -v python2 || command -v python2.7 || command -v python2.6) -c \
"import BaseHTTPServer, SimpleHTTPServer; \
s = BaseHTTPServer.HTTPServer(('', 80), SimpleHTTPServer.SimpleHTTPRequestHandler); \
s.serve_forever()"
```

## On Nodejs

```javascript
var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('/etc/letsencrypt/live/example.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/example.com/cert.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/example.com/chain.pem')
};

https.createServer(options, function (req, res) {
  res.writeHead(200);
  res.end("hello world\n");
}).listen(8000);
```

## On Apache

```conf
LoadModule ssl_module libexec/apache2/mod_ssl.so
Listen 443
<VirtualHost *:443>
  ServerName example.com
  SSLEngine on
  SSLCertificateFile "/etc/letsencrypt/live/example.com/cert.pem"
  SSLCertificateKeyFile "/etc/letsencrypt/live/example.com/privkey.pem"
  SSLCertificateChainFile "/etc/letsencrypt/live/example.com/chain.pem"
</VirtualHost>
```

## On Nginx

```conf
server {
    listen              443 ssl;
    server_name         example.com;
    ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
}
```



