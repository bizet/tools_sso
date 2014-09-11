define(function() {
  return (function() {require.config({
    baseUrl: '/javascripts',
    paths: {
      'jquery': '//172.24.186.245/jslib/jquery/jquery-1.9.1.min',
      'bootstrap': '//172.24.186.245/jslib/bootstrap/bootstrap3.0.3/dist/js/bootstrap.min'
    },
    shim: {
      'bootstrap':  ['jquery']
    }
  });})();
});
