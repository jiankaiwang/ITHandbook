# Example YML



## Nodejs



* Install necessary packages.

```shell
npm install --save -G mocha
npm install --save -G http
npm install --save -G shoud
npm install --save -G start-server-and-test
```



* Add test javascript under `test/browsers.js`.

Here we test whether the webapp (running over http on port 8081) is starting correctly.

```javascript
var http = require('http')
    , should = require('should');

describe("Test App Starting", function() {
    it('should return the status code 200', done => {
        var options = { host: 'localhost', path: '/', port:8081 }
        var request = http.request(options, function (res) {
            res.on('data', function (chunk) {});
            res.on('end', function () {
                var statuscode = res.statusCode;
                statuscode.should.equal(200);
                done();
            });
        });
        request.on('error', function (e) {
            console.log(e.message);
        });
        request.end();
    })
})
```



* Edit the section `scripts` in `package.json`.

Add `ci` command in section `scripts` like the following.

```javascript
{
  ...
  "scripts": {
    "start": "node app.js",
    "start-server": "npm start",
    "test": "mocha test/browsers.js",
    "ci": "start-server-and-test start-server http://localhost:8081 test"
  },
  "dependencies": {
	// ...
    "mocha": "^5.1.1",
    "start-server-and-test": "^1.4.1",
    "should": "^13.2.1",
    // ...
  },
  // ...
}
```



* Create a `.travis.yml`.

Notice the script command is to test the app.

```ini
sudo:          true
language:      node_js
node_js:
  - "node"
install:       npm install
script:
  - npm run ci
cache:
  directories:
    - node_modules
```