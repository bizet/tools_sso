var crypto = require('crypto');

exports.md5 = function(str) {
  var hash = crypto.createHash('md5');
  return hash.update(str + 'tools').digest('hex');
}
