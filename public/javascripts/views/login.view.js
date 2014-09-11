
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
              },
              if_not_exists: function() {
                _item.show_danger('user account not exists, try register');
              },
            });
          }
        });
        var input_password = new _Input_Alert({
          input: elem.input_password,
          alert: elem.input_password_alert,
          validation: function(_item) {
            if (!password_static_validation(_item)) return false;
          }
        });
        elem.btn_submit.click(function() {
          if (email_static_validation(input_email)
            && password_static_validation(input_password)) {
            _User_Control.login({
              email: input_email.get_input_val(), 
              password: input_password.get_input_val(),
              if_password_not_correct: function() {
                input_password.show_danger('password wrong');
              }
            });
          }
        });
      };
    })();
  }
);

