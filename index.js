var express = require('express');
var http = require('http');
var expressHbs = require('express3-handlebars');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorhandler = require('errorhandler');
var throng = require('throng');
// var browserSync = require('browser-sync');

var routes = require('./routes');
var app = express();

var WORKERS = process.env.WEB_CONCURRENCY || 1;

throng(start, {
  workers: WORKERS,
  lifetime: Infinity
});

function start() {
	app.engine('hbs', expressHbs({extname:'hbs', defaultLayout:'main.hbs'}));
	app.set('view engine', 'hbs');
	app.set('port', process.env.PORT || 7001);
	app.use(express.static(__dirname + '/public'));
	app.use(morgan('combined'));

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
		// browserSync({
		// 	proxy: 'localhost:' + app.get('port'),
		// 	files: ['public/**/*.{js,css}']
		// });
	});
}

