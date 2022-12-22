var path = require("path");

var express = require('express');
var http = require('http');
var { engine } = require('express-handlebars');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var errorhandler = require('errorhandler');
var throng = require('throng');
const helmet = require("helmet");

var routes = require('./routes');
var app = express();

var WORKERS = process.env.WEB_CONCURRENCY || 1;

throng(start, {
  workers: WORKERS,
  lifetime: Infinity
});

function start() {
	app.engine('handlebars', engine({extname: '.hbs', layoutsDir: path.resolve(__dirname, './views/layouts')}));
	app.set('view engine', 'handlebars');
	app.set("views", path.resolve(__dirname, "./views"));

	app.set('port', process.env.PORT || 7002);
	app.use(express.static(__dirname + '/public'));
	app.use(morgan('combined'));
	app.use(helmet());

	if (process.env.NODE_ENV === 'development') {
	  // only use in development 
	  app.use(errorhandler())
	}

	app.get('/', routes.index);
	app.get('/venue', routes.venue);
	app.get('/accommodations', routes.accommodations);
	app.get('/events', routes.weddingEvents);
	app.get('/registry', routes.registry);
	app.get('/engagement', routes.engagement);
	app.get('/filter', routes.filter);

	http.createServer(app).listen(app.get('port'), function() {
		console.log('Express server listening on port ' + app.get('port'));
	});
}

