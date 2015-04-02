# constraints.js
A library to validate constraints on raw JavaScript Object


## Usage

define data structure and constraints

```js
var check = require("./constraints.js/index").check;

var definitions = {
  user: {
    name: {
      required: true,
      constraints: {
        type: "string"
      }
    },
    age: {
      required: true,
      constraints: {
        type: "number",
        range: {
          min: 20,
          max: 40
        }
      }
    },
    address: {
      required: true,
      constraints: {
        type: "object",
        properties: {
          city: {
            required: true,
            constraints: {
              type: "string"
            }
          },
          country: {
            required: true,
            constraints: {
              type: "string"
            }
          }
        }
      }
    }
  }
};

var valid = {
  user: {
    name: "Jacob Chang",
    age: 27,
    address: {
      city: "Shang Hai",
      country: "China"
    }
  }
};

check(definitions, valid).then(function() {
  // valid
}, function() {
});


var invalid = {
  user: {
    name: "Jacob Chang",
    age: 50
  }
};

check(definitions, invalid).then(function() {
}, function() {
  // too old
});

```

## Support Types


## Support Constraints
type: "string", "number", "object", "array", "date"
range: min, max
properties: nested
