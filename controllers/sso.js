var mongodb = require('../models/db');
var User = require('../models/user');
var setting = require('../setting');
var App = require('../models/app');

var error_fun = function(res) {
  res.send('error, please contact tools team');
  return false;
};


exports.do = function(req, res) {
  var key = req.param('key');
  var ref = req.param('ref');
  var app_id = req.param('app_id');
  var sign_method = req.param('sign_method') || '';
  if (!key || !ref || !app_id) {
    return error_fun(res);
  }
  req.session.key = key;
  req.session.ref = ref;

  var app = new App();
  app.find_one({
    app_id: app_id
  }, function(err, _app) {
    if (err) {
      return error_fun(res);
    }
    if (!_app) {
      return error_fun(res);
    }
    req.session.app_sec = _app.app_sec;
    if (req.signedCookies.tools_sso_user_info && sign_method != 'change_user') {
      var user_cookie = req.signedCookies.tools_sso_user_info;
      u = new User();
      u.find_one({
        _id: new require('mongodb').ObjectID.createFromHexString(user_cookie.user_id),
        user_sec: user_cookie.user_sec
      }, function(err, user) {
        if (err) {
          return error_fun(res);
        }
        else if (!user) {
          res.render('sso', {});
        } else {
          var return_result = {};
          var u = new User(user);
          var user_info = u.get_return_info();
          var callbackpage = gen_callbackpage(user_info, req);
          return_result.result_id = setting.sso_result_id.result_ok;
          return_result.callbackpage = callbackpage;
          return res.redirect(callbackpage);
        }
      });
    } else {
      res.render('sso', {});
    }
  });
};

var crypto = require('crypto');

var gen_callbackpage = function(user, req) {
  var key = req.session.key || '',
    app_sec = req.session.app_sec || '',
    hash = crypto.createHash('md5'),
    return_key = hash.update(key + app_sec).digest('hex'),
    user_str = JSON.stringify(user),
    app_site = req.session.ref;

  var callbackpage = app_site + '?user_str=' + user_str + '&return_key=' + return_key;
  return callbackpage;
};

exports.gen_callbackpage = gen_callbackpage;

