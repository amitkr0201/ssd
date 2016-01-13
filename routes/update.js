var express = require('express'),
  imongo = require('./mongoHelper.js'),
  router = express.Router();

router.put('/:deployment_id/:deployment_status', function (req, res) {
  var deployment_id = req.params.deployment_id;
  var deployment_status = req.params.deployment_status;
  console.log("request to ssd/update " + deployment_id + " and " + deployment_status);
  if ( deployment_id == "" ){
    req.httpStatus = 404;
    req.result = "deployment_id not provided";
    res.status(Number(req.httpStatus)).send(req.result);
  };
  if ( deployment_status != "failure"  && deployment_status != "success" && deployment_status != "aborted" ){
    req.httpStatus = 404;
    req.result = "Correct deployment_status not provided.";
    res.status(Number(req.httpStatus)).send(req.result);
  };
  imongo.updateInMongo(deployment_id,deployment_status, function(err){
    if (err){
      console.log("Update not successful");
      req.httpStatus = 500;
      req.result = "Errors while updating";
    }
    console.log("Update successful");
    req.httpStatus = 200;
    req.result = "OK";
    res.status(Number(req.httpStatus)).send(req.result);
  });
});

module.exports = router;
