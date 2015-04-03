var util = require('util');
var should = require('should');
var check = require('../index').check;

describe('constraints.js properties', function() {
  var definitions = {
    A: {
      required: true,
      constraints: {
        type: "array",
        members: {
          type: "string",
          range: {
            min: 5,
            max: 10
          }
        }
      }
    }
  };

  it('should resovle when properties of array are valid', function(done) {
    var configurations = {
      A: [ 'aaaaaaaa', 'aaaaaaaa' ]
    };

    check(definitions, configurations).then(function() {
      done();
    }, function(result) {
      console.log(result.stack);
    });
  });

  it('should reject when array are invalid', function(done) {
    var configurations = {
      A: [ 100, 100]
    };

    check(definitions, configurations).then(function() {
    }, function(result) {
      console.log(result.message);
      result.should.be.an.Error;
      result.message.should.be.a.String;
      result.message.should.be.exactly('wrong type of A[0]: expect string');
      done();
    });
  });
});
