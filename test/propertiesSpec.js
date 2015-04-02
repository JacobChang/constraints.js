var util = require('util');
var should = require('should');
var check = require('../index').check;

describe('constraints.js properties', function() {
  var definitions = {
    A: {
      required: true,
      constraints: {
        properties: {
          min: {
            required: false,
            constraints: {
              type: "number"
            }
          },
          max: {
            required: true,
            constraints: {
              type: "number"
            }
          }
        }
      }
    }
  };

  it('should resovle when properties of object are valid', function(done) {
    var configurations = {
      A: {
        min: 100,
        max: 100
      }
    };

    check(definitions, configurations).then(function() {
      done();
    }, function(result) {
      console.log(result.stack);
    });
  });

  it('should resovle when properties of array are valid', function(done) {
    var configurations = {
      A: [
        {
          min: 100,
          max: 100
        },
        {
          min: 100,
          max: 100
        }
      ]
    };

    check(definitions, configurations).then(function() {
      done();
    }, function(result) {
      console.log(result.stack);
    });
  });

  it('should reject when properties are invalid type', function(done) {
    var configurations = {
      A: {
        min: "100",
        max: 100
      }
    };

    check(definitions, configurations).then(function() {
    }, function(result) {
      result.should.be.an.Error;
      result.message.should.be.a.String;
      result.message.should.be.exactly('wrong type of min: expect number');
      done();
    });
  });

  it('should reject when properties are invalid type', function(done) {
    var configurations = {
      A: [
        {
          min: 100,
          max: 100
        },
        {
          min: "100",
          max: 100
        }
      ]
    };

    check(definitions, configurations).then(function() {
    }, function(result) {
      result.should.be.an.Error;
      result.message.should.be.a.String;
      result.message.should.be.exactly('wrong type of min: expect number');
      done();
    });
  });
});
