var express = require('express'),
  imongo = require('./mongoHelper.js'),
  router = express.Router();

router.param('epoch', function (req, res, next, epoch) {
  console.log("request to ssd/fetchafter " + epoch);
  imongo.fetchAfter(epoch, function(err, data){
    if (err){
      next(err);
    }
    // data = JSON.parse(data);

    for (var i=0; i<data.length;i++){
      if ( data[i].stack != undefined ){
        if (data[i].stack.artefact != undefined ){
          data[i].stackInfo = data[i].stack.artefact;
        } else {
          data[i].stackInfo = "No Stack";
        }
      } else {
        data[i].stackInfo = "No Stack";
      }
    }
    req.op = data;
    next();
  });
});

router.get('/:epoch', function (req, res) {
  res.jsonp(req.op)
});

module.exports = router;
