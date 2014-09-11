
require(['requirejs.config'] , function() {
  require(['jquery', 'bootstrap'], function($) {
    $(function(){
      require(['views/reg.view', 'views/login.view'], function(_Reg_View, _Login_View) {
        var elem = {
          reg: {
            input_email: $('#reg_input_email'),
            input_email_alert: $('#reg_input_email_alert'),
            input_password: $('#reg_input_password'),
            input_password_alert: $('#reg_input_password_alert'),
            input_password_confirm: $('#reg_input_password_confirm'),
            input_password_confirm_alert: $('#reg_input_password_confirm_alert'),
            input_nick_name: $('#reg_input_nick_name'),
            btn_submit: $('#reg_submit'),
          },
          login: {
            input_email: $('#login_input_email'),
            input_email_alert: $('#login_input_email_alert'),
            input_password: $('#login_input_password'),
            input_password_alert: $('#login_input_password_alert'),
            btn_submit: $('#login_submit'),
          }
        };
        _Reg_View.init({elem: elem.reg,});
        _Login_View.init({elem: elem.login,});

      });
    });
  });
});
