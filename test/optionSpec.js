var util = require('util');
var should = require('should');
var check = require('../index').check;

describe('constraints.js option', function() {
  var options = ["ShangHai", "BeiJing"];
  var definitions = {
    A: {
      required: true,
      constraints: {
        options: options
      }
    }
  };

  it('should resovle when value in option', function(done) {
    var configurations = {
      A: "ShangHai"
    };

    check(definitions, configurations).then(function() {
      done();
    }, function(result) {
      console.log(result);
    });
  });

  it('should reject when value not in option', function(done) {
    var configurations = {
      A: 200
    };

    check(definitions, configurations).then(function() {
    }, function(result) {
      result.should.be.an.Error;
      result.message.should.be.a.String;
      result.message.should.be.exactly('A must be element of array: ' + options);
      done();
    });
  });
});
