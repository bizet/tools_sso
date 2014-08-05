var assert = require('assert');
var User = require('../model/user.model.js');
describe('User', function() {
  describe('reg', function() {
    it('should reg without error', function(done) {
      User.reg('abcd@test.com', 'abc', 'nick', function(err, _user) {
        if (err) return done(err);
        _user['email'].should.equal('abcd@test.com');
        done();
      });
    })
  })
})