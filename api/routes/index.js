var express = require('express');
var router = express.Router();
var ctrlBooks = require('../controllers/books.controllers.js');

router
    .route('/books')
    .get(ctrlBooks.getAll)
    .post(ctrlBooks.addNew);
    
router
    .route('/books/:bookId')
    .get(ctrlBooks.getOne);

router
    .route('/')
    .get(function(req, res){
        res
            .status(200)
            .json({"api": "get all books",
                "postBook": "insert a book"});
    });

module.exports = router;