var express = require('express');
var http = require('http');
var expressHbs = require('express3-handlebars');
var compressor = require('node-minify');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorhandler = require('errorhandler');

var routes = require('./routes');
var app = express();

app.engine('hbs', expressHbs({extname:'hbs', defaultLayout:'main.hbs'}));
app.set('view engine', 'hbs');
app.set('port', process.env.PORT || 7001);
app.use(express.static(__dirname + '/public'));
//app.use(favicon());
app.use(morgan('combined'));

if (process.env.NODE_ENV === 'development') {
  // only use in development 
  app.use(errorhandler())
}

//new compressor.minify({
//    type: 'gcc',
//    fileIn: 'public/js/**/*.js',
//    fileOut: 'public/js-dist/wildcards-match-gcc.js'
//});

// Using Clean-css for CSS 
new compressor.minify({
    type: 'clean-css',
    fileIn: 'publics/css/**/**.css',
    fileOut: 'public/css/base-min-cleancss.css'
});

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
