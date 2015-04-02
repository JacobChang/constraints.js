var util = require('util');
var should = require('should');
var check = require('../index').check;

describe('constraints.js range', function() {
  var minSize = 10;
  var maxSize = 100;
  var definitions = {
    A: {
      required: true,
      constraints: {
        range: {
          min: minSize,
          max: maxSize
        }
      }
    }
  };

  it('should resovle when value in range', function(done) {
    var configurations = {
      A: 20
    };

    check(definitions, configurations).then(function() {
      done();
    }, function(result) {
      console.log(result);
    });
  });

  it('should reject when value larger than max', function(done) {
    var configurations = {
      A: 200
    };

    check(definitions, configurations).then(function() {
    }, function(result) {
      result.should.be.an.Error;
      result.message.should.be.a.String;
      result.message.should.be.exactly('max size of A: ' + maxSize);
      done();
    });
  });

  it('should reject when value less than min', function(done) {
    var configurations = {
      A: 0
    };

    check(definitions, configurations).then(function() {
    }, function(result) {
      result.should.be.an.Error;
      result.message.should.be.a.String;
      result.message.should.be.exactly('min size of A: ' + minSize);
      done();
    });
  });
});
