var util = require('util');
var should = require('should');
var check = require('../index').check;

var typeMap = {
  string: "string",
  number: 100,
  boolean: true,
  object: {
    propString: "string",
    propNumber: 100,
    propBoolean: true
  },
  array: [
    {
      propString: "string",
      propNumber: 100,
      propBoolean: true
    },
    {
      propString: "string",
      propNumber: 100,
      propBoolean: true
    }
  ],
  date: new Date() 
};

var types = Object.keys(typeMap);

describe('constraints.js type', function() {
  types.forEach(function(type) {
    var value = typeMap[type];

    it('should resovle when ' + type + ' type does match', function(done) {
      var definitions = {
        A: {
          required: true,
          constraints: {
            type: type
          }
        }
      };

      var configurations = {
        A: value
      };

      check(definitions, configurations).then(function() {
        done();
      }, function(result) {
        result.should.be.an.Error;
        result.message.should.be.a.String;
        result.message.should.be.exactly('wrong type of A: expect string');
        done();
      });
    });
  });

  types.map(function(type) {
    types.filter(function(_type) {
      return _type != type;
    }).forEach(function(_type) {
      it('should reject when type does not match', function(done) {
        var definitions = {
          A: {
            required: true,
            constraints: {
              type: type
            }
          }
        };

        var configurations = {
          A: typeMap[_type]
        };

        check(definitions, configurations).then(function() {
          done();
        }, function(result) {
          result.should.be.an.Error;
          result.message.should.be.a.String;
          result.message.should.be.exactly('wrong type of A: expect ' + type);
          done();
        });
      });
    });
  });
});
