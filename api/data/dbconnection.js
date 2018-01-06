var mongoC = require('mongodb').MongoClient;

var dburl = 'mongodb://localhost:27017/booksdb';
var _connection = null;


var open = function () {
    mongoC.connect(dburl, function (err, client) {
        if (err) {
            console.log('Error, connection failed: ' + err);
            return;
        }
        _connection = client.db('booksdb');
        console.log('Connectes successfuly :)');
    });
};

var get = function () {
    return _connection;
};

module.exports = {
    open: open,
    get: get
};