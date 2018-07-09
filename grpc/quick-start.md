# Quick Start



* Refer to https://yami.io/grpc/.



## Install 



* Protocol Buffers: https://github.com/google/protobuf/releases/

```shell
$ protoc --version
```



* Install grpc tools:

```shell
# install tools
$ go get google.golang.org/grpc

# install plugins
$ go get -u github.com/golang/protobuf/{proto,protoc-gen-go}
```



## Preparation



* Create a directory with the following structures.

```text
+ grpc_example
  + client			// the client
  + pb			    // the protobuf docs
  + server			// the server
```



* Create a file (`calc.proto`) under `/pb`.

```protobuf
// the format is Proto v3。
syntax = "proto3";  
// the generated Golang file is belonging to `pb` package
package pb;

// Calculator define a service for calculation
service Calculator {  
    // Plus 會接收 CalcRequest 資料作加總，最終會回傳 CalcReply。
    rpc Plus (CalcRequest) returns (CalcReply) {}
}

// CalcRequest 包含了兩個數字，將會傳送至計算服務並對兩個數字進行計算。
message CalcRequest {  
    int32 number_a = 1;
    int32 number_b = 2;
}

// CalcReply 是計算結果，將會回傳給客戶端。
message CalcReply {  
    int32 result = 1;
}
```

And generate a proto file for Golang.

```shell
$ cd ./pb
$ protoc --go_out=plugins=grpc:. *.proto
```

And the directory structure is as the following.

```text
+ grpc_example
  + client			// the client
  + pb			    // the protobuf docs
    - calc.pb.go
    - calc.proto
  + server			// the server
```



## Create a gRPC Server



* Create a `main.go` under path `/server`.

```go
package main

import (
    "log"
    "net"
    "golang.org/x/net/context"
    "google.golang.org/grpc"
    "google.golang.org/grpc/reflection"
    "./../pb"
)

// server 建構體會實作 Calculator 的 gRPC 伺服器。
type server struct{}

// Plus 會將傳入的數字加總。
func (s *server) Plus(ctx context.Context, in *pb.CalcRequest) (*pb.CalcReply, error) {

    // 計算傳入的數字。
    result := in.NumberA + in.NumberB

    // 包裝成 Protobuf 建構體並回傳。
    return &pb.CalcReply{Result: result}, nil
}

func main() {
    // 監聽指定埠口，這樣服務才能在該埠口執行。
    lis, err := net.Listen("tcp", ":50051")
    if err != nil {
        log.Fatalf("Can not listen to the port：%v", err)
    }

    // 建立新 gRPC 伺服器並註冊 Calculator 服務。
    s := grpc.NewServer()
    pb.RegisterCalculatorServer(s, &server{})

    // 在 gRPC 伺服器上註冊反射服務。
    reflection.Register(s)

    // 開始在指定埠口中服務。
    if err := s.Serve(lis); err != nil {
        log.Fatalf("無法提供服務：%v", err)
    }
}
```



## Create a gRPC Client



* Create a `main.go` under path `/client`.

```go
package main

import (  
    "log"
    "golang.org/x/net/context"
    "google.golang.org/grpc"
    "./../pb"
)

func main() {  
    // 連線到遠端 gRPC 伺服器。
    conn, err := grpc.Dial("localhost:50051", grpc.WithInsecure())
    if err != nil {
        log.Fatalf("連線失敗：%v", err)
    }
    defer conn.Close()

    // 建立新的 Calculator 客戶端，所以等一下就能夠使用 Calculator 的所有方法。
    c := pb.NewCalculatorClient(conn)

    // 傳送新請求到遠端 gRPC 伺服器 Calculator 中，並呼叫 Plus 函式，讓兩個數字相加。
    r, err := c.Plus(context.Background(), &pb.CalcRequest{NumberA: 256, NumberB: 128})
    if err != nil {
        log.Fatalf("無法執行 Plus 函式：%v", err)
    }
    log.Printf("回傳結果：%d", r.Result)
}
```



## Running the gRPC



```shell
# 啟動 gRPC 伺服器。
$ go run ./server/main.go  

# 開啟客戶端與伺服器溝通。
$ go run ./client/main.go  
```





