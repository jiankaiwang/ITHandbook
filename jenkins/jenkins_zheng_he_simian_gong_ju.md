# Jenkins 整合 Simian 工具

<script type="text/javascript" src="../js/general.js"></script>

* 可以透過整合 Simian 入 Jenkins 查看新開發的程式碼中是否有高度重複的程式碼區塊。

###加入 Simian 入每日建置的環境中
---

* 選擇要進行 Simian 分析的專案後，點擊「組態」進入建置設定。

* 選擇「建置」中的「新增建置步驟」，透過 windows batch 方式執行 simian 即可。

* 在指令方面可以參考「[Simian : a similarity analyser](https://jiankaiwang.gitbooks.io/programming_languages/content/software_engineering/simian_a_similarity_analyser.html)」，如下：

```Bash
# 假設要檢查的程式碼位於 D:\code\openshift\welcome\interface\dynamic\
java -jar "C:\Program Files (x86)\simian\bin\simian-2.4.0.jar" -formatter=xml:"C:\Users\JianKaiWang\Desktop\SimianReport.xml" -threshold=20 -language=java -excludes=**/perldoc "D:\code\openshift\welcome\interface\dynamic\*.java"

# 需要注意的是，一定要為 exit 0，確認程式正確執行完畢
exit 0
```

###顯示建置結果
---

* 於「建置後動作」選項中，新增「Report Violations」

* 於「Simian」項目中，加入 SimianReport.xml 項目

