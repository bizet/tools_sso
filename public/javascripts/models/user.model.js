
define(["util/conn"], function(_c) {
  function User(_user) {
    var user = _user || {};
    this.email = user.email || '';
    this.password = user.password || '';
    this.nick_name = user.nick_name || '';
  };
  User.prototype.reg = function(anddothis, object) {
    _c.send_to_server('/user/reg', {
      email: this.email,
      password: this.password,
      nick_name: this.nick_name
    }, anddothis, object);
  };
  User.prototype.login = function(anddothis, object) {
    _c.send_to_server('/user/sign_on', {
      email: this.email,
      password: this.password
    }, anddothis, object);
  };
  User.prototype.get = function(email, anddothis, object) {
    _c.send_to_server('/user/get', {email: email}, anddothis, object);
  };

  return User;
});

