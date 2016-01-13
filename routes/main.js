var express = require('express'),
  imongo = require('./mongoHelper.js'),
  router = express.Router();

router.get('/',function(req,res){
  console.log("staring monitor page");
  imongo.fetchAfter(0, function(err, data){
    if (err){
      res.status(500).send("Error while startup. Refresh page to try again.");
    }
    var op = {
      deployments: data
    };
    res.render('index',op);
  });
});

router.get('/newindex',function(req,res){
  console.log("staring newindex page");
  imongo.fetchAfter(0, function(err, data){
    if (err){
      res.status(500).send("Error while startup. Refresh page to try again.");
    }
    var op = {
      deployments: data
    };
    res.render('newindex',op);
  });
});

router.get('/modify',function(req,res){
  console.log("staring temp page");
  res.render('modify');
});

module.exports = router;
