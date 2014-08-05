var sendmail = require('./mail.model').sendmail;
sendmail({
  from: 'test@test.com',
  //to: 'lte-tdd-st@lists.alcatel.de',
  to: 'shenjun.wang@alcatel-sbell.com.cn',
  subject: 'please ignore this mail',
  html: '<h4>This is a test for tools team new mail service</h4><p>to check if mail send succefully for the lte st mail list</p><p>sorry for disturb</p>'
}, function(error) {
  console.log(error);
});
