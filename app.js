var express = require('express');
var app = express();
var path = require('path');

app.set('port', 7777);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/status', function(req, res){
    res.send('every thing is good :)');
    console.log('working!');
});

var server = app.listen(app.get('port'), function(){
    var port = server.address().port;
    console.log('start listening to the port ' + port);
});