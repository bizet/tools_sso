
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
  });
};

var para = '';
for (var i = 2; i < process.argv.length; i++ ) {
  para += process.argv[i];
}
var option = JSON.parse(para);
sendmail(option);
