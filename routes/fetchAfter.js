var express = require('express'),
  imongo = require('./mongoHelper.js'),
  router = express.Router();

router.param('epoch', function (req, res, next, epoch) {
  console.log("request to ssd/fetchafter " + epoch);
  imongo.fetchAfter(epoch, function(err, data){
    if (err){
      next(err);
    }

    // Customize JSON
    for (var i = 0; i<data.length;i++){
      // Add stack data
      if ( data[i].stack != undefined ){
        if (data[i].stack.artefact != undefined ){
          data[i].stackInfo = data[i].stack.artefact;
        } else {
          data[i].stackInfo = "No Stack";
        }
      } else {
        data[i].stackInfo = "No Stack";
      }

      // Add artifact data
      data[i].components = [];
      for (var j = 0; j<data[i].objective.components.length;j++){
        tempComponent = {};
        tempComponent.parameter = data[i].objective.components[j];
        tempComponent.description = "WIP";
        if ( data[i].artefacts[data[i].objective.components[j]] != undefined ){
          tempComponent.artifact = data[i].artefacts[data[i].objective.components[j]].artefact;
        } else {
          tempComponent.artifact = "No artifact";
        }
        console.log("i::: " + tempComponent)
        data[i].components.push(tempComponent);
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
