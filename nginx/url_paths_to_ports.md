# URL Paths to Ports



## 設定不同 url 對應不同 port 服務



```ini
server {
    listen 80;
    server_name example.com;

    charset     utf8;
    access_log    /var/log/nginx/example.access.log;

	# the default proxy_pass
    location / {
        proxy_pass http://127.0.0.1:3838;
        proxy_set_header Host      $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    
    # the second service proxy_pass under /service1/
    location /service1/ {
        proxy_pass http://127.0.0.1:8787/;
    }

	# the third service proxy_pass under /ws/ with the websocket service
    location /ws/ {
        proxy_pass http://127.0.0.1:8899/ws/;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $http_host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # web socket
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
    }
}
```

