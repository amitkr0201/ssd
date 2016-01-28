var express = require('express'),
  imongo = require('./mongoHelper.js'),
  router = express.Router();

router.param('epoch', function (req, res, next, epoch) {
  console.log("request to ssd/fetchafter " + epoch);
  imongo.fetchAfter(epoch, function(err, data){
    if (err){
      next(err);
    }
    req.op = data;
    next();
  });
});

router.get('/:epoch', function (req, res) {
  res.jsonp(req.op)
});

module.exports = router;
