exports.session = {
  cookieSecret: 'tools_sso'
};

exports.server = {
  host: '172.24.186.248',
  port: '3000',
};

exports.db = {
  db_name: 'tools_sso',
  host: 'localhost',
  user: 'tools_sso',
  pass: 'tools_sso',
  url: 'mongodb://tools_sso:tools_sso@localhost:27017/tools_sso'
};

var tools_mail_list = exports.tools_mail_list = [
  '<shenjun.wang@alcatel-sbell.com.cn>', 
  '<haojie.wang@alcatel-sbell.com.cn>',
  '<Xiang.Yaling@alcatel-sbell.com.cn>',
  '<Hui.X.Wang@alcatel-sbell.com.cn>',
  ].join(',');

exports.mail = {
  mail_name: 'LTE TOOLS<tools_sso@lte-tools.com>',
  reply_to: tools_mail_list
};

exports.sso_result_id = {
  result_ok: 0,
  result_username_not_exists: 1,
  result_password_not_correct: 2,
  result_username_already_exists: 3,
  result_unexpected_terminated: 99
};
