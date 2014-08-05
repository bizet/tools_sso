var request = require('request')
  , config = require('./mail.config');


exports.sendmail = function(mail_option, callback) {
  request.post(config.host.url, function(error, response, body){
    if (error) {
      callback(error);
    }
    else if (response.statusCode != 200) {
      callback('wrong url');
    }
    else {
      callback(null);
    }
  }).form(mail_option);
  
};
