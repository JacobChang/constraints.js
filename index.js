var Promise = require("es6-promise").Promise;
var util = require("util");

var typeCheckers = {
  boolean: util.isBoolean,
  number: util.isNumber,
  string: util.isString,
  array: util.isArray,
  object: util.isObject,
  date: util.isDate
};

var checkType = function(definitionName, configuration, constraint) {
  console.log('check type', arguments);
  return new Promise(function(resolve, reject) {
    if(typeCheckers[constraint](configuration)) {
      resolve(true);
    } else {
      reject(new Error('wrong type: expect' + definition.type));
    }
  });
}

var checkMin = function(definitionName, configuation, constraint) {
  console.log("check min: ", arguments);
  if(!util.isNumber(constraint)) {
    return Promise.reject(new Error("constrainturation of min constraint must be number"));
  }

  if(!util.isString(configuation) && !util.isNumber(configuation)) {
    return Promise.reject(new Error("configuation must be number or string when apply min constraints"));
  }

  var size = util.isString(configuation) ? configuration.length : configuration;
  if(size >= constraint) {
    return Promise.resolve(true);
  } else {
    return Promise.reject(new Error("min size: " + constraint));
  }
};

var checkMax = function(definitionName, configuation, constraint) {
  console.log("check max: ", arguments);
  if(!util.isNumber(constraint)) {
    return Promise.reject(new Error("constrainturation of min constraint must be number"));
  }

  if(!util.isString(configuation) && !util.isNumber(configuation)) {
    return Promise.rejct(new Error("configuation must be number or string when apply min constraints"));
  }

  var size = util.isString(configuation) ? configuration.length : configuration;
  if(size <= constraint) {
    return Promise.resolve(true);
  } else {
    return Promise.reject(new Error("max size: " + constraint));
  }
};

var checkProperties = function(definitionName, configuation, constraint) {
  console.log("check properties: ", arguments);
  if(!util.isObject(constraint)) {
    Promise.reject(new Error("constrainturation of properties constraint must be number"));
  }

  if(!util.isObject(configuation) && !util.isObject(configuation)) {
    Promise.reject(new Error("configuation must be object or array when apply properties constraints"));
  }

  if(util.isObject(configuation)) {
    return check(configuraton, constraint);
  } else {
    return new Promise(function(resolve, reject) {
      var promises = configuation.map(function(member) {
        return check(member, constraint);
      });

      Promise.all(promises).then(function(results) {
        resolve();
      }, function(results) {
        reject(results);
      });
    });
  }
};

var constraintCheckers = {
  type: {
    check: checkType,
  },
  min: {
    check: checkMin,
  },
  max: {
    check: checkMax,
  },
  properties: {
    check: checkProperties,
  }
};

var checkRequired = function(definitonName, configuation, definition) {
  console.log("check required: ", arguments);
  if(!util.isBoolean(definition.required)) {
    return Promise.reject(new Error("required constraint of " +
                                     definitionName +
                                    " must be boolean"));
  }

  if(definition.required === true && utils.isNullOrUndefined(configuation)) {
    return Promise.reject(new Error("missing configuration of" +
                                     definitionName));
  } else {
    return Promise.resovle(true);
  }
};

var checkConstraints = function(definitionName, definition, configuration) {
  console.log('check constraints', arguments);
  var constraints = definition.constraints;

  return new Promise(function(resolve, reject) {
    var promises = Object.keys(constraints).map(function(constraintName) {
      var checker = constraintCheckers[constraintName];
      var constraint = constraints[constraintName];

      return checker.check(definitionName, configuration, constraint);
    });

    Promise.all(promises).then(function(results) {
      resolve(results);
    }, function(results) {
      reject(results);
    });
  });
};

var check = function(definitions, configurations) {
  console.log('check', arguments);
  var definitionNames = Object.keys(definitions);

  return new Promise(function(resolve, reject) {
    // check type first
    var promises = definitionNames.map(function(definitionName) {
      var definition = definitions[definitionName];
      var configuration = configurations[definitionName];

      return checkRequired(definitionName, definition, configuration);
    });

    Promise.all(promises).then(function(results) {
      var promises = definitionsNames.map(function(definitionName) {
        var definition = definitions[definitionName];
        var configuration = configurations[definitionName];

        return checkConstraints(definitionName, definition, configuration);
      });

      Promise.all(promises).then(function(results) {
        resolve(results);
      }, function(results) {
        // only return errors to caller
        reject(results.filter(function(result) {
          return util.isError(result)
        }));
      });
    }, function(results) {
      // only return errors to caller
      reject(results);
    });
  });
};

var addTypeChecker = function(typeName, checker) {
  typeCheckers[key] = checker;
};

var removeTypeChecker = function(constraintName, checker) {
  if(typeCheckers[key] === checker) {
    typeCheckers[key] = null;
  }
};

var addConstraintChecker = function(constraintName, checker) {
  constraintCheckers[key] = checker;
};

var removeConstraintChecker = function(constraintName, checker) {
  if(constraintCheckers[key] === checker) {
    constraintCheckers[key] = null;
  }
};

module.exports = {
  check: check,
  checkRequired: checkRequired,
  checkType: checkType,
  checkConstraints: checkConstraints,
  addTypeChecker: addTypeChecker,
  removeTypeChecker: removeTypeChecker,
  addConstraintChecker: addConstraintChecker,
  removeConstraintChecker: removeConstraintChecker
};
