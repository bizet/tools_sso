

define(['controllers/user.control', 'models/input_alert.model', 'controllers/validation.control'], 
  function(_User_Control, _Input_Alert, _Validation) {
    return new (function() {
      var email_static_validation = function(_item) {
        var email = _item.get_input_val();
        if (!_Validation.check_require(email)) {
          _item.show_danger('username required');
          return false;
        }
        return true;
      };
      var password_static_validation = function(_item) {
        var password = _item.get_input_val();
        if (!_Validation.check_require(password)) {
          _item.show_danger('password required');
          return false;
        }
        return true;
      };

      var password_confirm_static_validation = function(_item_password, _item_confirm) {
        var password = _item_password.get_input_val();
        var password_confirm = _item_confirm.get_input_val();
        if (password != password_confirm) {
          _item_confirm.show_danger('confirm password not same');
          return false;
        }
        return true;
      };

      this.init = function(_opt) {
        var option = _opt;
        var elem = option.elem;
        var input_email = new _Input_Alert({
          input: elem.input_email,
          alert: elem.input_email_alert,
          validation: function(_item) {
            var email = _item.get_input_val();
            if (!email_static_validation(_item)) return false;
            _User_Control.check_user_exists({
              email: email,
              if_exists: function() {
                _item.show_danger('username exists');
              },
              if_not_exists: function() {
                _item.show_success('user account ok for register');
              },
            });
          }
        });
        var input_password = new _Input_Alert({
          input: elem.input_password,
          alert: elem.input_password_alert,
          validation: function(_item) {
            if(!password_static_validation(_item)) return false;
          }
        });

        var input_password_confirm = new _Input_Alert({
          input: elem.input_password_confirm,
          alert: elem.input_password_confirm_alert,
          validation: function(_item) {
            if (!password_confirm_static_validation(input_password, _item)) return false;
          }
        });

        elem.btn_submit.click(function() {
          if (!email_static_validation(input_email)
          || !password_static_validation(input_password)
          || !password_confirm_static_validation(input_password, input_password_confirm)) {
            return false;
          }
          _User_Control.reg({
            email: input_email.get_input_val(), 
            password: input_password.get_input_val(),
            nick_name: elem.input_nick_name.val(),
            if_username_already_exists: function() {
              input_email.show_danger('username exists');
            }
          });
        });
      };
    })();
  }
);


