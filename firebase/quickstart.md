# Quick Start



## Prepare the enviroment



* surf the webpage https://console.firebase.google.com/

* create or select a new project
* click `database` and select the `rule`
* edit the rule to read and write without permission, for example,

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```



## Access the service



Here we demo how to send data to and fetch data from Firebase database in nodejs.



* send the data into firebase, for example in nodejs

```javascript
/*
 * author : jiankaiwang
 * platform : nodejs
 * feature : the firebase API template in NodeJS server side
 * description : continuously send iot sensor data to the firebase
 */
var firebase = require("firebase");

function get_time(type) {
    function __formatMDHMS(getValue) {
        return (getValue < 10 ? '0' + getValue : getValue);
    }
    var varTime = new Date(),
        varYears = varTime.getFullYear(),
        varMonths = varTime.getMonth()+1,
        varDate = varTime.getDate(),
        varHours = varTime.getHours(),
        varMinutes = varTime.getMinutes(),
        varSeconds = varTime.getSeconds();
    switch(type) {
        case "Y":
            return(varYears);
        case "M":
            return(__formatMDHMS(varMonths));
        case "D":
            return(__formatMDHMS(varDate));
        case "h":
            return(__formatMDHMS(varHours));
        case "m":
            return(__formatMDHMS(varMinutes));
        case "s":
            return(__formatMDHMS(varSeconds));
        case "YMD":
            return(varYears + "/" + __formatMDHMS(varMonths) + "/" + __formatMDHMS(varDate));
        case "hm":
            return(__formatMDHMS(varHours) + "/" + __formatMDHMS(varMinutes));
        case "hms":
            return(__formatMDHMS(varHours) + ":" + __formatMDHMS(varMinutes) + ":" + __formatMDHMS(varSeconds));
    }
}

var config = {
    apiKey : "",
    authDomain : "",
    databaseURL : "https://(xxx).firebaseio.com/",
    storageBucket : ""
}
firebase.initializeApp(config);
var db = firebase.database();
var deviceID = "dev1";

setInterval(function(){ 
    var ref = db.ref("/cluster1/" + deviceID + "/" + get_time("YMD") + "/" + get_time("h"));
    var value = {
        humi: "28",
        temp: "26",
        time: get_time("hms")
    }
    ref.set(value);
}, 10000);
```



* fetch data from firebase

```javascript
/*
 * author : jiankaiwang
 * platform : nodejs
 * feature : the firebase API template in NodeJS server side
 * description : continuously fetch iot sensor data from the firebase
 * reference : push data into firebase (https://gist.github.com/jiankaiwang/635f40bb5609033e922337b7aa2a44e6)
 */
var firebase = require("firebase");

// firebase configuration
var config = {
    apiKey : "",
    authDomain : "",
    databaseURL : "https://xxx.firebaseio.com/"
    storageBucket : ""
}
firebase.initializeApp(config);
var db = firebase.database();

// Get the key list of the dictionary.
var getDictionaryKeyList = function(getDictObj) {
	var keyList = [];
	for(var key in getDictObj) {
		keyList.push(key);
	}
	return keyList;
}

// Get the value from the firebase.
var ref = db.ref("/cluster1/dev1");
ref.once("value", function(data) {
    // output format is json-encoded
    console.log(data.val());
    // example to get the whole key
    console.log(getDictionaryKeyList(data.val()));
    // end nodejs application
    process.exit();
});
```

