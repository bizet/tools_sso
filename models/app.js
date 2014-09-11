var mongodb = require('./db');

function App(_app) {
  var app = _app || {};
};

module.exports = App;

App.prototype.find_one = function(find_cond, callback) {
  mongodb.find_one('apps', find_cond, callback);
};


