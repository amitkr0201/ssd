var mongodb = require("mongodb");

var MongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017/phased-deploy";
function saveToMongo(input,cb){
	MongoClient.connect(url, function (err, db) {
		if (err) {
			err.errormessage = "Unable to connect to the mongoDB server";
			console.log("Unable to connect to the mongoDB server. Error:", err);
			cb(err);
		} else {
			var collection = db.collection("deployments");

			// Add created and modified time
			var currentEpoch = (new Date).getTime();
			input._createdTime = currentEpoch;
			input._modifiedTime = currentEpoch;

			collection.insert([input], function (err, result) {
			if (err) {

				err.errormessage = err.errmsg;
				cb(err);
				console.log(err.errormessage);
			} else {
					console.log("Inserted "+ result.result.ok+ " documents into collection. The documents inserted is: " + JSON.stringify(result.ops));
					cb(null);
			}
			db.close();
		});
  }
	});
};

function updateInMongo(deployment_id, finalStatus,cb){
	MongoClient.connect(url, function (err, db) {
	if (err) {
		err.errormessage = "Unable to connect to the mongoDB server";
		console.log("Unable to connect to the mongoDB server. Error:", err);
		cb(err);
	} else {
		var collection = db.collection("deployments");
		var currentEpoch = (new Date).getTime();

		collection.updateMany(
			{
				"deployment_id": { $eq : deployment_id }
			},
			{
				$set: {"_status": finalStatus, "_modifiedTime": currentEpoch}
			},
			function (err, result) {
				if (err) {
					err.errormessage = err.errmsg;
					cb(err);
				} else {
					if (result.result.n == 0){
						err = {};
						err.errormessage = "0 records modified. Deployment ID does not exist.";
						console.log(err.errormessage + " Deployment id: "+ deployment_id);
						cb(err);
						return;
					}
					console.log("Modified " +result.result.nModified + " records. Deployment id: "+ deployment_id + ", status: " + finalStatus);
					cb(null);
				}
				db.close();
			}
		);
	}
	});
};

function fetchAfter(epoch, cb){
	MongoClient.connect(url, function (err, db) {
	if (err) {
		err.errormessage = "Unable to connect to the mongoDB server";
		console.log("Unable to connect to the mongoDB server. Error:", err);
		cb(err,null);
	} else {
		var collection = db.collection("deployments");

		collection.find({ "_modifiedTime": { $gt : Number(epoch) }}, { "sort": "_modifiedTime", "limit": 10 }).toArray(function (err, result) {
			if (err) {
				err.errormessage = err.errmsg;
				cb(err,null);
			} else {
				console.log("Retrieved " + result.length + " results with _modifiedTime greater than " + epoch);
				cb(null,result);
			}
			db.close();
		});
	}
	});
};

module.exports = {
	saveToMongo : saveToMongo,
	updateInMongo : updateInMongo,
	fetchAfter : fetchAfter
};
