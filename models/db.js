var setting = require('../setting'),
    mongodb = require('mongodb'),
    Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;

var poolModule = require('generic-pool');
var mpool = poolModule.Pool({
  name: 'mongodb',
  create: function(callback) {
    mongodb.MongoClient.connect(setting.db.url, {
      server: {
        poolSize: 1
      }
    }, function(err, db) {
      callback(err, db);
    });
  },
  destroy: function(db) {db.close();},
  max: 10,
  idleTimeoutMillis: 30000,
  log: false
});

var dbopen = function(callback) {
  mpool.acquire(function(err, db) {
    var release = function() {
      mpool.release(db);
    };
    if (err) {
      release();
    }
    callback(err, db, release);
  });
};

module.exports = dbopen;

module.exports.insert = function(doc_name, doc_insert, callback) {
  dbopen(function(err, db, release) {
    if (err) {
      release();
      return callback(err);
    } else{
      db.collection(doc_name, function (err, collection) {
        if (err) {
          release();
          return callback(err);
        }
        collection.insert(doc_insert, {
          safe: true
        }, function (err, _doc) {
          release();
          if (err) {
            return callback(err);
          }
          callback(null, _doc[0]);
        });
      });
    }
  });
};

module.exports.update = function(doc_name, find_cond, doc_update, callback) {
  dbopen(function(err, db, release) {
    if (err) {
      release();
      callback(err);
    } else {
      db.collection(doc_name, function(err, collection) {
        if (err) {
          release();
          return callback(err);
        }
        collection.update(find_cond, doc_update, {
          safe: true
        }, function(err) {
          release();
          if (err) {
            return callback(err);
          }
          callback(null);
        });
      });
    }
  });
};

module.exports.find = function(doc_name, callback) {
  dbopen(function(err, db, release) {
    if (err) {
      release();
      return callback(err);
    } else {
      db.collection(doc_name, function(err, collection) {
        if (err) {
          release();
          return callback(err);
        }
        collection.find().toArray(function(err, _docs) {
          release();
          if (err) {
            return callback(err);
          }
          callback(null, _docs);
        });
      });
    }
  });
};



module.exports.find_one = function(doc_name, find_cond, callback) {
  dbopen(function(err, db, release) {
    if (err) {
      release();
      return callback(err);
    } else {
      db.collection(doc_name, function(err, collection) {
        if (err) {
          release();
          return callback(err);
        }
        collection.findOne(find_cond, function (err, _doc) {
          release();
          if (err) {
            return callback(err);
          }
          callback(null, _doc);
        });
      });
    }
  });
};

