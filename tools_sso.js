
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var MongoStore = require('connect-mongo')(express);
var setting = require('./setting');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('tools_sso'));
app.use(express.session({
  secret: 'tools_sso',
  key: 'tools_sso',
  cookie: {
    maxAge: 1000*60*60*24*30
  },
  store: new MongoStore({
    url: setting.db.url
  })

}));
app.use(app.router);

var less_compile_force = false;

// development only
//NODE_ENV == 'development'
if ('development' == app.get('env')) {
  console.log('env development');
  app.use(express.errorHandler());
  less_compile_force = true;
}

//support less
var less = require('less-middleware');
app.use(less({
  src: __dirname + '/public/stylesheets/less',
  dest: __dirname + '/public/stylesheets',
  prefix: '/stylesheets',
  force: less_compile_force,
}));

app.use(express.static(path.join(__dirname, 'public')));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

routes(app);

// client  

//login  -session save url, head server _search cookie,head client_callback ? user={email:xxxx; } -read session url, set session, head url

// server

/*
-> php
  $_GET['url'] $_GET['user']
  if url:
    session.url = url
    session.scret = md5(xx)
    head(SSO_Sever?scret=session.scret)
  if user:
    $_GET['scret'] == session.scret:
    callback (mysql check user, insert, session.user = user)
    head(session.url)

*/
