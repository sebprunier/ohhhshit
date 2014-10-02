'use strict';

var CodeHorrorService = function () {

    var CODE_HORRORS_COLLECTION_NAME = 'codehorrors';

    var ObjectID = require('mongodb').ObjectID;
    var mongoDbConnection = require('./mongoConnection.js');

    var _count = function (callback) {
        mongoDbConnection(function (connection) {
            var collection = connection.collection(CODE_HORRORS_COLLECTION_NAME);
            collection.count(function (err, count) {
                if (err) throw err;
                callback(count);
            });

        });
    };

    var _groupByLanguage = function (callback) {
        mongoDbConnection(function (connection) {
            var collection = connection.collection(CODE_HORRORS_COLLECTION_NAME);
            collection.aggregate([
                {$group: {_id: "$language", total: {$sum: 1}}},
                {$sort: {_id: -1}}
            ], function (err, byLanguage) {
                if (err) throw err;
                callback(byLanguage);
            });

        });
    };

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

    var _findById = function (id, callback) {
        mongoDbConnection(function (connection) {
            var collection = connection.collection(CODE_HORRORS_COLLECTION_NAME);
            collection.findOne({_id: new ObjectID(id)}, function (err, item) {
                if (err) throw err;
                callback(item);
            });
        });
    };

    var _findLatest = function (skip, limit, callback) {
        mongoDbConnection(function (connection) {
            var collection = connection.collection(CODE_HORRORS_COLLECTION_NAME);
            collection.find().sort({creationDate: -1}).limit(limit).skip(skip).toArray(function (err, items) {
                if (err) throw err;
                callback(items);
            });
        });
    };

    var _insert = function (ip, code, callback) {
        mongoDbConnection(function (connection) {
                var collection = connection.collection(CODE_HORRORS_COLLECTION_NAME);
                var document = {
                    version: 1,
                    creationDate: new Date(),
                    ip: ip,
                    name: code.name || 'Anonymous Coder',
                    code: code.code,
                    title: code.title,
                    language: code.language,
                    votes: {
                        good: 0,
                        bad: 0
                    },
                    reviewed: false
                }
                collection.insert(document, {w: 1}, function (err, records) {
                    if (err) throw err;
                    callback(records[0]);
                });
            }
        )
        ;
    };

    return {
        count: _count,
        groupByLanguage: _groupByLanguage,
        findOneRandomly: _findOneRandomly,
        findById: _findById,
        findLatest: _findLatest,
        insert: _insert
    };
};

module.exports = CodeHorrorService;
