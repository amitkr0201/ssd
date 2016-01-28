var express = require('express'),
  imongo = require('./mongoHelper.js'),
  router = express.Router();

router.post('/', function (req, res) {
  var inputJSON = req.body;
  if ( inputJSON.deployment_id != undefined ){

		imongo.saveToMongo(inputJSON,function(err){
			if(err){
        res.status(404).send("Error saving input data. Error is: " + err.errormessage );
			} else {
        res.status(200).send("OK");
			}
		});
	} else {
    res.status(404).send("Missing deployment_id in JSON.");
	};
});

module.exports = router;
