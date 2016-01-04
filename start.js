var express = require('express'),
  imongo = require('./mongoHelper.js'),
  bodyParser = require('body-parser');

var app = express(),
  router = express.Router();

app.use(bodyParser.json());
app.use('/ssd/static',express.static('static'));

router.param('epoch', function (req, res, next, epoch) {
  console.log("request to ssd/fetchafter " + epoch);
  imongo.fetchAfter(epoch, function(err, data){
    if (err){
      next(err);
    }
    console.log("data fetched " + JSON.stringify(data));
    req.op = data;
    next();
  });
});

router.get('/fetchAfter/:epoch', function (req, res) {
    res.jsonp(req.op);
});

router.put('/update/:deployment_id/:deployment_status', function (req, res) {
  var deployment_id = req.params.deployment_id;
  var deployment_status = req.params.deployment_status;
  console.log("request to ssd/update " + deployment_id + " and " + deployment_status);
  if ( deployment_id == "" ){
    req.httpStatus = 404;
    req.result = "deployment_id not provided";
    res.status(Number(req.httpStatus)).send(req.result);
  };
  if ( deployment_status != "failure"  && deployment_status != "success" ){
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

router.post('/add', function (req, res) {
  var inputJSON = req.body;
  if ( inputJSON.deployment_id != undefined ){
		inputJSON._id=inputJSON.deployment_id;
		inputJSON._status="Running";

		imongo.saveToMongo(inputJSON,function(err){
			if(err){
        res.status(404).send("Error saving input data");
			} else {
        res.status(200).send("OK");
			}
		});
	} else {
    res.status(404).send("Missing deployment_id in JSON.");
	};
});

app.set('x-powered-by',false);
app.use('/ssd/',router);

app.listen(8082);
