# Google VR

<script type="text/javascript" src="../js/general.js"></script>

### Build Cardboard and Daydream Environemt for Android in Unity
---

* 下載並安裝開發環境與必要套件
    * Unity 5.6.0f3 (64-bit)
    * UnitySetup-Android-Support-for-Editor-5.6.0f3
    * [僅下載，不需安裝] GoogleVRForUnity.unitypackage
    * QuickTimeInstaller 7.7.9
    * Java 1.8.0_121
    * android SDK
        * Android SDK Tools v.25.2.5
        * Android SDK Platform-tools v.25.0.4
        * Android 7.0 (API 24) SDK Platform
        * Android 6.0 (API 23) SDK Platform
        * Android 5.1.1 (API 22) SDK Platform
        * Android 5.0.1 (API 21) SDK Platform
        * Android 4.4.2 (API 19) SDK Platform    
    
* Android for Unity 設定
    * 位置 Edit > Preferences > External Tools > Android，設定 Android 底下 SDK 與 JDK 資料夾

* Google VR SDK 套件匯入
    * 位置 Assets > Import Packages > Custom Package ，將上述已下載但尚未安裝的套件 `GoogleVRForUnity.unitypackage` 匯入
    * 此時 GoogleVR 預設專案已套入

* 建置組態設定
    * 位置 File > Build Settings > Platform 底下，選擇 Android > 點擊 `switch platform`
    * 一樣在 Platform 底下，點擊 `Player Settings` 後，修改 `PlayerSettings`
    * [Optional] 修改 `Company Name` (公司或組織名)、`Product Name`(軟體名稱，Android APP 中顯示名稱)、`Default Icon`(Android APP 圖示) 等。
    * 修改 `Other Settings` 中選項
        * 點選 `Virtual Reality Supported` 
        * 並於 `Virtual Reality SDKs` 中加入 `Cardboard` 或 `Daydream` (視要開發的環境為何)
        * 修改 Identification 中的 `Package Name` (此為 google play 唯一識別碼)，若用 GoogleVR 套件內的範例，則必要修改，否則不能進行建置
        * [Optional] 修改 Identification 中的 Version (版本名，可以為字串) 及 Bundle Version Code (內部識別用版本，需數字且一定要比前次高)
        * 修改 Identification 中的 Minimum API Level，若為 `Cardboard` 則建議為 `Android 4.4 Kit Kat (API Level 19)`，若為 `Daydream` 則建議為 `Android 7.0 Nougat (API Level 24)`

* 載入及預覽 GoogleVR demo scene
    * 於底下的編輯者專案欄的 Porject 選項，選擇路徑 Assets > GoogleVR > Demos > Scenes > GVRDemo 的專案並載入。
    * [Daydream] 此時可以透過 USB 線連接你的 Controller Phone (不是 Headset Phone)，並在 Controller Phone 上開始模擬。
    * 在上方設計畫面中的 Scene View 中出現 VR 的預設場景，可以點選位於場景上方的按鈕 `Play` 初始化 VR 視角後，於 Game View 中可以按住 `Alt` 按鈕及使用滑鼠來觀看整個 Scene。
        * [Daydream] 可以使用 Controller Phone 作為 Daydream 控制模擬器
        * [Cardboard] 透過點擊滑鼠來傳遞輸入

* 建置及部署 demo 場景
    * 僅連結你的 headset phone 至電腦
    * [方法一 : 建置及執行] 點擊位置 File > Build & Run ，並開始建置及運行在 headset phone
    * [方法二 : 建置及編譯] 點擊位置 File > Build Settings > Build，並產出一個 .apk 檔，可用於放置於 android 中進行安裝即可









