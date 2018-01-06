var dbconn = require('../data/dbconnection');
var ObjectId = require('mongodb').ObjectId;

module.exports.getAll = function (req, res) {
    var db = dbconn.get();
    var collection = db.collection('books');
    var offset = 0;
    var count = 5;
    var maxValue = 10;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    if (isNaN(count) || isNaN(offset) || (count > maxValue)) {
        res
            .status(400)
            .json({ "Error": "Bad request" });
            return;
    }
    collection
        .find()
        .skip(offset)
        .limit(count)
        .toArray(function (err, docs) {
            if (err) {
                res
                    .status(500)
                    .json('internal Error');
                return;
            }
            res
                .status(200)
                .json(docs);
        });
};

module.exports.getOne = function (req, res) {
    var db = dbconn.get();
    var collection = db.collection('books');
    var bookId = req.params.bookId;
    console.log('book index is: ' + bookId);
    collection
    .findOne({
        _id : ObjectId(bookId)
        }, function(err, doc){
        if (err) {
            res
                .status(500)
                .json(err);
            console.log('Error ocured: ' + err);
            return;
        } else if (!doc) {
            res
                .status(404)
                .json({
                    "message" : "404 Not Found"
                });
            console.log('Not found');
            return;
        }
        res
        .status(200)
        .json(doc);
    });
};

module.exports.addNew = function (req, res) {
    var db = dbconn.get();
    var collection = db.collection('books');
    
    if (req.body && req.body.title && req.body.author_fl) {
        collection.insertOne(req.body, function(err, response){
            if (err) {
                res
                    .status(500)
                    .json(err);
                console.log('Error ocured: ' + err);
                return;
            }
            console.log(response.ops);
            res
                .status(201)
                .json(response.ops);
        });
    } else {
        res
            .status(400)
            .json({ "Error": "Bad request" });
    }
    
};