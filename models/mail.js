var setting = require('../setting');
var nodemailer = require('nodemailer');

/*
 * _opt -
 *      --- to: email wanna send to
 *      --- cc(optional):
 *      --- subject:
 *      --- msg:
 */

var sendmail = module.exports.sendmail = function(_opt) {
  var option = _opt;
  var mailOptions = {
    from: setting.mail.mail_name,
    to: option.to,
    cc: option.cc || '',
    subject: option.subject,
    html: option.msg,
    replyTo: setting.mail.reply_to
  };

  var transport = nodemailer.createTransport('sendmail');
  transport.sendMail(mailOptions, function(err) {
    transport.close();
    option.callback(err);
  });
};

/*
 * _opt -
 *      --- user: user object
 */
var reg_mail_template = module.exports.reg_mail_template = function(_opt) {
  var option = _opt;
  var fs = require('fs');
  var ejs = require('ejs');
  var compiled = ejs.compile(fs.readFileSync(__dirname + '/mail_template/reg_mail.ejs', 'utf8'));
  var html = compiled({user: option.user, setting: setting});
  return html;
};


