var util = require('util');
var should = require('should');
var check = require('../index').check;

describe('constraints.js required', function() {
  it('should resolve when all required property were present', function(done) {
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
    var configurations = {
      A: 100,
      B: 100
    };

    check(definitions, configurations).then(function(results) {
      done();
    }, function(result) {
    });
  });

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
    var configurations = {
      B: 100
    };

    check(definitions, configurations).then(function(results) {
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
    var configurations = {
      A: null,
      B: 100
    };

    check(definitions, configurations).then(function(results) {
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
    var configurations = {
      A: null,
      B: null 
    };

    check(definitions, configurations).then(function(results) {
    }, function(result) {
      result.should.be.an.Error;
      result.message.should.be.a.String;
      result.message.should.be.exactly('missing configuration of B');
      done();
    });
  });
});
