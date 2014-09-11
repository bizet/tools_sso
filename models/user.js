var mongodb = require('./db');

function User(_user) {
  var user = _user || {};
  this._id = user._id || '';
  this.password = user.password || '';
  this.user_sec = user.user_sec || '';
  this.email = user.email || '';
  this.nick_name = user.nick_name || '';
  this.mail_active = user.mail_active || 'false';
};

module.exports = User;

User.prototype.update = function(find_cond, doc_update, callback) {
  mongodb.update('users', find_cond, doc_update, callback);
}

User.prototype.save = function(callback) {
  var user = {
      password: this.password,
      email: this.email,
      user_sec: this.user_sec,
      nick_name: this.nick_name,
      mail_active: this.mail_active
  };
  mongodb.insert('users', user, callback);
};

User.prototype.get_by_id = function(id, callback) {
  mongodb.find_one('users', {
    _id: id
  }, callback);
};

User.prototype.find_one = function(find_cond, callback) {
  mongodb.find_one('users', find_cond, callback);
};

/* callback = function(err, _docs) */
User.prototype.find = function(callback) {
  mongodb.find('users', callback);
};

User.prototype.get = function(email, callback) {
  mongodb.find_one('users', {
    email: {$regex: new RegExp("^" + email + "$", "i")}
  }, callback);
};

User.prototype.get_return_info = function() {
  return {
    email: this.email,
    nick_name: this.nick_name
  };
};

User.prototype.get_cookie_info = function() {
  return {
    user_id: this._id.toHexString(),
    user_sec: this.user_sec
  };
};

User.prototype.update = function(find_cond, doc_update, callback) {
  mongodb.update('users', find_cond, doc_update, callback);
};



