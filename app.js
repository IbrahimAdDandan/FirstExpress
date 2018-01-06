require('./api/data/dbconnection').open();
var express = require('express');
var app = express();
var path = require('path');
var routes = require('./api/routes');
var bodyParser = require('body-parser');

app.set('port', 7777);

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.urlencoded());

app.use('/api', routes);

app.get('/status', function(req, res){
    res.send('every thing is good :)');
    console.log('working!');
});

var server = app.listen(app.get('port'), function(){
    var port = server.address().port;
    console.log('start listening to the port ' + port);
});