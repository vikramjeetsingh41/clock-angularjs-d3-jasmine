var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

var isDev = app.get('env') === 'development';

app.set('port', process.env.PORT || 3000);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.use(app.router);

var routes = require('./routes');
app.get('/partials/*', routes.partials);

app.get('/', routes.index);

var port = app.get('port');
this.server = http.createServer(app).listen(port, function() {
  console.log('Express server listening on port ' + port);
});

module.exports = app;
