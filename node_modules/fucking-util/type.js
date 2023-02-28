'use strict';

const Type = {};

function callObjectToString(object) {

  return Object.prototype.toString.call(object);
}

Type.get = function(object) {

  let softType = typeof object;

  if (softType in Type) {

    if (softType === 'object') {

      if (!object) {

        return 'null';
      } else if (Type.array(object)) {

        return 'array';
      } else {

        return softType;
      }
    } else if (softType === 'number') {

      if (Type.number(object)) {

        return softType;
      } else if (Type.NaN(object)) {

        return 'NaN';
      } else {

        return 'infinity';
      }
    } else {

      return softType;
    }
  } else {

    return 'unknown';
  }
};

Type.empty = function ( object ) {

  let type = Type.get ( object );

  switch ( type ) {

    case 'undefined': return true;
    case 'null': return true;
    case 'string': return '' === object;
    case 'array': return object.length === 0;
    case 'object': 
      return object.constructor === Object 
        ? Object.keys ( object ).length === 0
        : false;
    default: return false;
  }
};

Type.function = function(object) { return 'function' === typeof object };

Type.undefined = function(object) { return object === undefined };

Type.null = function(object) { return object === null };

// contain array
Type.object = function(object) { return object && 'object' === typeof object };

Type.objectForce = function(object) { return callObjectToString(object) === '[object Object]' };

Type.number = function(object) { return 'number' === typeof object && !isNaN(object) && isFinite(object) };

Type.NaN = function(arg) { return isNaN(arg) };

Type.infinity = function(arg) { return !isFinite(arg) };

Type.boolean = function(object) { return 'boolean' === typeof object };

Type.string = function(object) { return 'string' === typeof object };

Type.array = function(object) { return callObjectToString(object) === '[object Array]' };

Type.symbol = function(object) { return 'symbol' === typeof object };

Type.parse = { };

Type.parse.string = function parseTOString ( object ) { return Type.object ( object ) ? JSON.stringify ( object ) : String ( object ) };

module.exports = Type;
