# RHC Commands

<script type="text/javascript" src="gitbook/app.js"></script>
<script type="text/javascript" src="js/general.js"></script>

###OpenShift Account, Namespace or Domain
---

| Command | Explanation |
| -- | -- | -- |
| rhc setup | 處理包含 SSH Key 等與 OpenShift Server 的認證資訊 |
| rhc account | 關於目前使用帳號的資訊 |
| rhc domain-show | 包含目前使用的服務概況 |

###創造 OpenShift 應用程式
---

| Command | Explanation |
| -- | -- |
| rhc app-create {myAppName} {aWebCartridge} | 創造一個使用 aWebCartridge 架構且名為 myAppName 的伺服器，且能對直接對應 HTTP 請求。 |
| example | $ rhc app create ezscrum jbossas-7 |