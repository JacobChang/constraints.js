var should = require('should');
var check = require('../index').check;

var types = {
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
  ]  
};

var definitions = {
};

var configurations = {
};

describe('constraints', function() {
  it('should check required constraint', function(done) {
    var definitions = {
      A: null
    };
    var configurations = {
      A: {
        required: true,
        constraints: {
        }
      }
    };

    check(definitions, configurations).then(function() {
      console.log('resolved', arguments);
      done();
    }, function() {
      console.log('reject', arguments);
      done();
    });
  });

  it('should check type constaint', function(done) {
    done();
  });
});
