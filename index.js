var express = require('express');
var fs = require('fs');
var router = express.Router();
var request = require('request');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('weather.html', { root: 'Public' });
});

router.get('/getcity', function(req, res, next) {
  var jsonresult = [];
  console.log("In getcity route");
  fs.readFile(__dirname + '/cities.dat.txt',function(err,data) {
    if(err) throw err;
    var cityStr = data.toString();
    var cities = cityStr.split("\n");
    var myRe = new RegExp("^" + req.query.q);
    for(var i = 0; i < cities.length; i++) {
      var result = cities[i].search(myRe);
      if (result != -1) {
        jsonresult.push({city:cities[i]});
      }
    }
  res.status(200).json(jsonresult);
  });
});

router.get('/owl', function(req, res, next) {
    var url = "https://owlbot.info/api/v1/dictionary/";
    console.log("Query: ",req.query);
    url += req.query['q'];
    url += "?format=json";
    request(url).pipe(res);
});
module.exports = router;
