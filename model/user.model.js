var connection = require('./db.model').connection
  , sendmail = require('./sendmail/mail.model').sendmail
  , crypto = require('../util/crypto')
  , mongoose = require('mongoose');
var schema = new mongoose.Schema({
  email: String,
  password: String,
  user_sec: String,
  nick_name: String,
  mail_active: String
});

var User = connection.model('users', schema);

exports.reg = function(_email, _password, _nick_name, next) {
  var user = new User({
    email: _email,
    password: crypto.md5(_password),
    user_sec: crypto.md5(_email + Math.floor((Math.random()*1000 + 1)).toString()),
    nick_name: _nick_name
  })
  User.findOne({email: _email}, function(err, _u_exist) {
    if (err) {
      next(new Error('db save error: ' + err));
    };
    if (_u_exist) {
      next(new Error('email exists'));
    };
    user.save(function(err, _u_saved, n) {
      if (err) {
        next(new Error('db save error: ' + err))
      }
      next(null, _u_saved);
    });
  })
};