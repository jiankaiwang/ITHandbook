# Shiny
#####一個將 R 語言包裝成網頁應用程式的解決方案，由 RStudio 開發。前端能向下支援接近原生 HTML, CSS, Javascript 等架構；後端亦能支援原生 R 語言，是近年來隨著高通量資料與大數據等應用下的一項技術。
#####因為 R 語言背後蘊含豐富的資料函式庫，包含機器學習、資料探勘、統計與數學模型等而具有相當大的潛力。

###架構
---
* 由 ui.R (使用者介面) 與 server.R (伺服器與程式執行主體) 共同組成
* 透過介面溝通函式進行前後端資料共享，如 server.R 中 function(input, output) 取出前端資料及輸出執行結果，與 ui.R 中 input$var 取出執行完結果等。

###與 Plotly 結合
---
[Plotly](https://plot.ly/) 是一套以 R 語言為基底進行資料視覺化與能使用者進行互動性的函式庫。透過結合 Shiny 執行分析與計算再透過 Plotly 進行進階視覺化設計，便能打造出類似 BI 工具等效果，且更具有延展性。

###資源
---
* Shiny
    * [Shiny Tutorial](http://shiny.rstudio.com/tutorial/)
    * [Shiny Server by RStudio](https://www.rstudio.com/products/shiny/shiny-server2/)
* Plotly
    * [Plotly Public](https://plot.ly/feed/)
    * [With Shiny](https://plot.ly/r/shiny-tutorial/)




