var util = require('util');
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

describe('constraints.js', function() {
  it('should reject when required property is undefined', function(done) {
    var definitions = {
      A: {
        required: true,
        constraints: {
        }
      },
      B: {
        required: true,
        constraints: {
        }
      }
    };
    var configurationsA = {
      B: 100
    };

    check(definitions, configurationsA).then(function(results) {
    }, function(result) {
      result.should.be.an.Error;
      result.message.should.be.a.String;
      result.message.should.be.exactly('missing configuration of A');
      done();
    });
  });

  it('should reject when required property is null', function(done) {
    var definitions = {
      A: {
        required: true,
        constraints: {
        }
      },
      B: {
        required: true,
        constraints: {
        }
      }
    };
    var configurationsA = {
      A: null,
      B: 100
    };

    check(definitions, configurationsA).then(function(results) {
    }, function(result) {
      result.should.be.an.Error;
      result.message.should.be.a.String;
      result.message.should.be.exactly('missing configuration of A');
      done();
    });
  });

  it('should omit unrequired property', function(done) {
    var definitions = {
      A: {
        required: false,
        constraints: {
        }
      },
      B: {
        required: true,
        constraints: {
        }
      }
    };
    var configurationsA = {
      A: null,
      B: null 
    };

    check(definitions, configurationsA).then(function(results) {
    }, function(result) {
      result.should.be.an.Error;
      result.message.should.be.a.String;
      result.message.should.be.exactly('missing configuration of B');
      done();
    });
  });
});
