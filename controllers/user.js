
var User = require('../models/user');
var setting = require('../setting');
var crypto = require('../util/crypto');
var Sso = require('./sso');
var mail = require('../models/mail');

exports.get = function(req, res) {
  var email = req.param('email');
  var u = new User();
  var return_result = {};
  u.get(email, function(err, user) {
    return_result.result_id = (function(result_id) {
      if (err) {
        return result_id.result_unexpected_terminated;
      }
      return result_id.result_ok;
    })(setting.sso_result_id);
    return_result.user = user;
    return res.send(JSON.stringify(return_result));
  });
};

/*
exports.change_password = function(req, res) {
  try {
    var old_password = crypto.md5(req.param('old_password'))
    , new_password = crypto.md5(req.param('new_password'))
    , id = new require('mongodb').ObjectID.createFromHexString(req.param('id')),
  } 
  catch (e) {
  }
  var u = new User();
  u.find_one({_id: id, password: old_password}, function(err, user) {
    if (err) {
    }
    else if (user) {
      u.update({_id: id}, {$set: {password: new_password}}, function(err) {
        if (err) {
        }
      });
    }

  });
};
*/


exports.active = function(req, res) {
  var user_id = req.param('id') || '';
  var user_sec = req.param('sec');
  var u = new User();
  u.find_one({
    _id: new require('mongodb').ObjectID.createFromHexString(user_id),
    //_id: user_id,
    user_sec: user_sec
  }, function(err, user) {
    if (err) {
      res.send('active failed');
    }
    else if (!user) {
      res.send('active failed');
    }
    else if (user) {
      u.update({
        _id: user._id,
      }, {
        $set: {mail_active: true}
      }, function(err) {
        if (err) {
          res.send('active failed');
          return;
        }
        res.send('active successful');
      });
    }
    else {
      res.send('active failed');
    }
  });
};


var add_user = exports.add_user = function(_user) {
  var email = _user.email || '';
  var nick_name = _user.nick_name || email.split('@')[0];
  var u = new User({
    email: email,
    password: crypto.md5(_user.password || ''),
    user_sec: crypto.md5(email + Math.floor((Math.random()*1000 + 1)).toString()),
    nick_name: nick_name
  });
  u.get(email, function(err, user) {
    (function(){
      if (err) {
        console.log('get err ' + user);
        return ;
      }
      if (user) {
        console.log('exists ' + user);
        return ;
      }
      else {
        u.save(function(err, user) {
          if (err) {
            console.log('save err ' + user);
            return ;
          }
          else {
            console.log('add complete')
            return ;
          }
        });
      }
    })();
  })
};



exports.reg = function(req, res) {
  var return_result = {};
  var email = req.param('email');
  var nick_name = req.param('nick_name') || email.split('@')[0];
  var u = new User({
    email: email,
    password: crypto.md5(req.param('password')),
    user_sec: crypto.md5(email + Math.floor((Math.random()*1000 + 1)).toString()),
    nick_name: nick_name
  });
  u.get(email, function(err, user) {
    (function(result_id){
      if (err) {
        return_result.result_id = result_id.result_unexpected_terminated;
        return res.send(JSON.stringify(return_result));
      }
      if (user) {
        return_result.result_id = result_id.result_username_already_exists;          
        return res.send(JSON.stringify(return_result));
      }
      else {
        u.save(function(err, user) {
          if (err) {
            return_result.result_id = result_id.result_unexpected_terminated;
            return res.send(JSON.stringify(return_result));
          }
          else {
            var msg = mail.reg_mail_template({user: user});
            mail.sendmail({
              to: user.email,
              cc: setting.tools_mail_list,
              subject: 'Tools Account',
              msg: msg,
              callback: function(err){}
            });
            var u = new User(user);
            var user_info = u.get_return_info();
            var callbackpage = Sso.gen_callbackpage(user_info, req);
            return_result.callbackpage = callbackpage;
            res.cookie('tools_sso_user_info', u.get_cookie_info(), {maxAge: 10*24*60*60*1000, secret: true, signed: true});
            return_result.result_id = result_id.result_ok;
            return res.send(JSON.stringify(return_result));
          }
        });
      }
    })(setting.sso_result_id);
  });
};

exports.sign_on = function(req, res) {
  var email = req.param('email');
  var password = crypto.md5(req.param('password'));
  var u = new User();
  var return_result = {};
  u.get(email, function(err, user){
    return_result.result_id = (function(result_id) {
      if (err) {
        return result_id.result_unexpected_terminated;
      }
      if (user) {
        if (password != user.password) {
          return result_id.result_password_not_correct;
        }
        else {  // ok for sign on
          return result_id.result_ok;          
        }
      }
      else {
        return result_id.result_username_not_exists;
      }
    })(setting.sso_result_id);

    if (return_result.result_id == setting.sso_result_id.result_ok) {
      var u = new User(user);
      var user_info = u.get_return_info();
      var callbackpage = Sso.gen_callbackpage(user_info, req);
      return_result.callbackpage = callbackpage;

      res.cookie('tools_sso_user_info', u.get_cookie_info(), {maxAge: 10*24*60*60*1000, secret: true, signed: true});
      res.session.sso_user = u.get_cookie_info();
    }

    return res.send(JSON.stringify(return_result));
  });
};
