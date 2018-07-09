# Websocket



## 設定 WebSocket Proxy 服務



```shell
server {
    listen 80;
    server_name example.com;

    charset     utf8;
    access_log    /var/log/nginx/example.access.log;

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



