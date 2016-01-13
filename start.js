var express = require('express'),
  bodyParser = require('body-parser'),
  handlebars = require('express3-handlebars'),
  router = require ('./router.js'),
  fs = require('fs'),
  path = require('path');

var app = express();

app.use(bodyParser.json());
app.use('/ssd/static',express.static('static'));

// Create reverse each
var hbs = handlebars.create({
    helpers: {
        reverse: function( collection, options ){
                  	var result = '';
                  	for( var i = collection.length - 1; i >= 0; i-- ){
                  		result += options.fn( collection[i] );
                  	}
                  	return result;
                  }
    }
});

app.engine('handlebars',hbs.engine);
app.set('view engine','handlebars');

app.set('x-powered-by',false);
app.use('/ssd/',router);

app.listen(process.env.PORT || 8081);
