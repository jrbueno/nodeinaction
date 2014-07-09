var memdb = require('..');
var assert = require('assert');


describe('memdb', function () {
  beforeEach(function () {
    memdb.clear();
  });

  describe('.save(doc)', function () {
    it('should save the document', function (done) {
      var pet = { name: 'tobi' };
      memdb.save(pet);
      var ret = memdb.first({name: 'tobi'});
      assert(ret == pet);
      done();
    });
  });

  describe('.first(obj)', function () {
    it('should return the first matching document', function () {
      var tobi = { name: 'tobi' };
      var loki = { name: 'loki' };

      memdb.save(tobi);
      memdb.save(loki);

      var ret = memdb.first({name: 'tobi'});
      assert(ret == tobi);
      var ret = memdb.first({name: 'loki'});
      assert(ret == loki);
    });
    it('should return null when no doc matches', function () {
      var ret = memdb.first({name: 'manny'});
      assert(ret == null);
    });
  });
});

////Export Style
// module.exports = {
//   'memdb': {
//     '.save(doc)': {
//       'should save the document': function () {
//
//       }
//     }
//   }
// }
