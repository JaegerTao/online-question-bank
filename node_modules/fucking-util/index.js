'use strict';
const util = {
  get Category()  { return require('./category') },
  get Decimal()   { return require('./decimal') },
  get Extend()    { return require('./extend') },
  get RndStr()    { return require('./rndStr') },
  get Str()       { return require('./str') },
  get Time()      { return require('./time') },
  get Type()      { return require('./type') }
};

module.exports = util;

util.use = function ( key, obj ) {

  let keys = Object.keys ( util );

  util [ key ] = obj;
};

util.useMap = function ( map ) {

  if ( util.Type.objectForce ( map ) ) {

    let keys = Object.keys ( map );

    for ( let i = 0; i < keys.length; i += 1 ) {

      let key = keys [ i ];

      let obj = map [ key ];

      util.use ( key, obj );
    }
  } else {

  }
};
