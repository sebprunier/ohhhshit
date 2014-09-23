'use strict';

var CodeHorrorService = function () {

    var CODE_HORRORS_COLLECTION_NAME = 'codehorrors';

    var mongoDbConnection = require('./mongoConnection.js');

    var _findOneRandomly = function (callback) {
        mongoDbConnection(function (connection) {
            var collection = connection.collection(CODE_HORRORS_COLLECTION_NAME);
            // 1- Count code horrors
            collection.count(function (err, count) {
                if (err) throw err;
                // 2- Find one randomly
                var random = Math.floor((Math.random() * count));
                collection.find().skip(random).limit(1).toArray(function (err, items) {
                    if (err) throw err;
                    callback(items[0]);
                });
            });

        });
    };

    return {
        findOneRandomly: _findOneRandomly
    };
};

module.exports = CodeHorrorService;
