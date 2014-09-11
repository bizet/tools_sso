
define(function() {
  return new (function() {
    this.check_require = function(_val) {
      var input_value = _val;
      if (!input_value || input_value.replace(/^\s+|\s+$/g, '') == '') {
        return false;
      }
      return true;
    };
  })();
});
