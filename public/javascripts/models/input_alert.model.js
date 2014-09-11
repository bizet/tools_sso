
define(function() {
  var default_option = {
    input: null,
    alert: null,
    validation: function(t){},
    valid_action: 'focusout',
    required: false,
  };
  function Input_Alert(_option) {
    var _this = this;
    this.option = $.extend({}, default_option, _option);
    this.option.input.on(this.option.valid_action, function() {
      _this.option.validation(_this);
    });
    this.option.input.on('keydown', function() {
      _this.hide();
    });
  };
  Input_Alert.prototype.check_valid = function() {
    return this.option.validation(this);
  };
  Input_Alert.prototype.get_input = function() {
    return this.option.input;
  };
  Input_Alert.prototype.get_input_val = function() {
    return this.get_input().val();
  };
  Input_Alert.prototype.hide = function() {
    this.option.alert.fadeOut();
  };
  Input_Alert.prototype.show_danger = function(msg) {
    this.show({
      level: 'danger',
      msg: msg
    });
  };
  Input_Alert.prototype.show_success = function(msg) {
    this.show({
      level: 'success',
      msg: msg
    });
  };
  Input_Alert.prototype.show = function(_o) {
    var _this = this;
    this.option.alert.fadeOut(function() {
      _this.option.alert.html(_o.msg);
      _this.option.alert.removeClass('text-active text-success text-warning text-danger').addClass('text-' + _o.level);
    });
    this.option.alert.fadeIn();
  };

  return Input_Alert;
});

