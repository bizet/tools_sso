
var mail = require('../models/mail');
var User = require('../models/user');
var setting = require('../setting');
var sys = require('sys');
var exec = require('child_process').exec;


var send_init_mail_to = function(user, callback) {
  var msg = mail.reg_mail_template({user: user});
  try {
    console.log('start sendmail to user: ' + user.nick_name);
    var param_str = JSON.stringify({
      to: '<' + user.email + '>',
      cc: setting.tools_mail_list,
      subject: 'Tools Account',
      msg: msg,
    });
    var child = exec("node sendmail.js '" + param_str + "'", function(error, stdout, stderr) {
      sys.print('stderr: ' + stderr);
      sys.print('stdout: -----' + stdout + ' -----');
      if (error != null) {
        console.log('failed for user: ' + user.nick_name);
      } 
      else {
        console.log('user: ' + user.nick_name + ' sendmail ok');
        callback(error);
      }
    });
  }
  catch (err) {
    console.log(err);
    console.log('failed for user: ' + user.nick_name);
  }
};

var send_init_mail = exports.send_init_mail = function() {
  var u = new User();
  u.find(function(err, users) {
    if (err) {
      console.log('find err');
      return;
    }
    for (var i in users) {
      (function(user) {
        if (!user.init_mail) {
          send_init_mail_to(user, function(err) {
            u.update({'_id': user._id}, {$set: {'init_mail': 'true'}}, function(err) {
              if (err) {
                console.log(err);
              }
            });
          });
        }
      })(users[i]);
    };
  });
};





