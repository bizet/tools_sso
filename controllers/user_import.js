
var User = require('./user');
var mysql = require('mysql');

var conn = mysql.createConnection({
  host: '135.251.227.165',
  user: 'root',
  password: 'root',
  database: 'tools_dataset'
});
conn.connect();

var sql = 'select * from EPISODE_PATCH_LOGIN';

conn.query(sql, function(err, rows) {
  for (var i in rows) {
    User.add_user({
      email: rows[i].email,
      password: rows[i].passwd
    });
  }
});

conn.end();

