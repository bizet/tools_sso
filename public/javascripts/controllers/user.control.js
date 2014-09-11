
define(['models/user.model', 'setting', 'util/const'], function(_User, _Set, _Const) {
  return new (function () {
    this.reg = function(_opt) {
      if (!_opt.email || !_opt.password) {
        return false;
      }
      var default_opt = {
        if_username_already_exists: _Const.blank_function,
        if_error: _Const.blank_function
      };
      var option = $.extend({}, default_opt, _opt);
      var u = new _User({
        email: option.email,
        password: option.password,
        nick_name: option.nick_name
      });
      u.reg(function(res) {
        if (res.result_id == _Set.sso_result_id.result_ok) {
          window.location = res.callbackpage; return;
        }
        else if (res.result_id == _Set.sso_result_id.result_username_already_exists) {
          option.if_username_already_exists(); return;
        }
        else {
          option.if_error(); return;
        }
      }, this);
    };

    this.login = function(_opt) {
      if (!_opt.email || !_opt.password) {
        return false;
      }
      var default_opt = {
        if_username_not_exists: _Const.blank_function,
        if_password_not_correct: _Const.blank_function,
        if_error: _Const.blank_function
      };
      var option = $.extend({}, default_opt, _opt);
      var u = new _User({
        email: option.email, 
        password: option.password
      });
      u.login(function(res) {
        if (res.result_id == _Set.sso_result_id.result_ok) {
          window.location = res.callbackpage; return;
        }
        else if (res.result_id == _Set.sso_result_id.result_username_not_exists) {
          option.if_username_not_exists(); return;
        }
        else if (res.result_id == _Set.sso_result_id.result_password_not_correct) {
          option.if_password_not_correct(); return;
        }
        else {
          option.if_error(); return;
        }
      }, this);
    }

    this.check_user_exists = function(_opt) {
      var default_opt = {
        email: '',
        if_exists: _Const.blank_function,
        if_not_exists: _Const.blank_function,
        if_error: _Const.blank_function
      };

      var _this = this;
      var u = new _User();
      var option = $.extend({}, default_opt, _opt);
      u.get(option.email, function(res) {
        if (res.result_id == _Set.sso_result_id.result_ok) {
          if (res.user) {
            option.if_exists(); return;
          }
          option.if_not_exists(); return;
        }
        option.if_error(); return;
      }, _this);
    };
  })();
});

