'use strict';

const RndStr = require('./rndStr');

const Type = require('./type');

const Extend = require ( './extend' );

const Str = {};

Str.rnd = RndStr;

Str.path = {};

Str.path.separate = '/';
Str.path.restfulID = '*';

Str.path.trim = function(path) {

  return Str.trim(path, Str.path.separate);
};

Str.path.split = function(path) {

  return Str.path.trim(path).split(Str.path.separate);
};

Str.url = {};

Str.url.querys = {};


Str.url.querys.mixKeyVal = function mixKeyVal(key, val) {

  let source = JSON.parse ( JSON.stringify ( [ key, val ] ) );

  key = source [ 0 ], val = source [ 1 ];

  /* [BUG] JSON.stringify => circle refrence */
  let _val = Type.parse.string ( val );

  return [encodeURIComponent(key), encodeURIComponent(_val)].join('=');

  // return [key, _val].join('=');
};

Str.url.querys.splitKeyVal = function splitKeyVal(keyValStr) {

  let keyVal = keyValStr.split('=');

  let key = '';
  let val = '';

  try { key = decodeURIComponent(keyVal[0]) } catch ( e ) { key = keyVal[0] }
  try { val = decodeURIComponent(keyVal[1]||'') } catch ( e ) { val = keyVal[1] }

  return [key, val||''];

  // return keyVal;
};

// object to Url 'key=val' Array
Str.url.querys.objToUrlKeyValArr = function objToUrlKeyValArr(source, ignoreArr) {

  source = JSON.parse ( JSON.stringify ( source ) );

  let keyValArr = [];

  let keys = Object.keys(source);

  keys.sort ( );

  for (let i = 0; i < keys.length; i++) {

    // ignore [sign & signKey]

    let key = keys [ i ];

    if (!ignoreArr || ignoreArr.indexOf(key) === -1) {

      if ( Type.empty ( source [ key ] ) ) {

      } else {

        let keyValStr = Str.url.querys.mixKeyVal(key, source[key]);

        keyValArr.push(keyValStr);
      }
    }
  }

  return keyValArr;
};

Str.url.querys.urlStrToObj = function urlStrToObj(source, ignoreArr) {

  let sourceObj = {};

  if ( Type.string ( source ) ) {

    let keyValArr = source.replace(/^\?/,'').split('&');

    for (let i = 0; i < keyValArr.length; i++) {

      let keyValStr = keyValArr [ i ];

      let keyVal = Str.url.querys.splitKeyVal(keyValStr);

      let key = keyVal[0],
          val = keyVal[1];

      if ( Type.empty ( val ) ) { } else 
      if (!ignoreArr || ignoreArr.indexOf(key) === -1) {

        sourceObj[key] = val;
      }
    }
  } else { }

  return sourceObj;
};

Str.url.querys.objToUrlStr = function objToUrlStr(source, ignoreArr) {

  source = JSON.parse ( JSON.stringify ( source ) );

  let keyValArr = Str.url.querys.objToUrlKeyValArr(source, ignoreArr);

  return keyValArr.join('&');
};

Str.querys = Str.url.querys;

Str.url.build = function buildURL(urlObject) {

  var urlString = '';

  if ( urlObject.schema ) {

    urlString = urlString.concat ( urlObject.schema ).concat ( '://' );
  } else { }

  if ( urlObject.host ) {

    urlString = urlString.concat ( urlObject.host );
  } else if ( urlObject.hostname ) {

    urlString = urlString.concat ( urlObject.hostname );
  } else { }

  if ( urlObject.port ) {

    urlString = urlString.concat ( ':' ).concat ( urlObject.port );
  } else { }

  if ( urlObject.path ) {

    if ( urlObject.path.indexOf ( '/' ) === 0 ) {

    } else {

      urlString = urlString.concat ( '/' );
    }

    urlString = urlString.concat ( urlObject.path );
  } else { }

  if ( urlObject.anchor ) {

    urlString = urlString.concat ( '#' ).concat ( urlObject.anchor );
  } else { }

  if ( Object.keys ( urlObject.querys ).length > 0 ) {

    var queryString = Str.url.querys.objToUrlStr ( urlObject.querys );

    urlString = urlString.concat ( '?' ).concat ( queryString );
  } else { }

  return urlString;
};

Str.url.parse = function parseURL(urlString) {

  let finalUrlString = Str.trim ( urlString );

  let parsedArray = finalUrlString.match ( /^(?:(?:([A-Za-z]+):?\/{2})?(?:(\w+)?:?([^\x00-\x1F^\x7F^:]*)@)?([\w\-\.]+)?(?::(\d+))?)\/?(([^\x00-\x1F^\x7F^\#^\?^:]+)?(?::([^\x00-\x1F^\x7F^\#^\?]+))?(?:#([^\x00-\x1F^\?]+))?)(?:\?(.*))?$/ );

  let urlObject = {
      'schema': parsedArray[1],
      'host': parsedArray[4],
      'hostname': parsedArray[4],
      'port': parsedArray[5],
      'path': parsedArray[7],
      'querys': Str.url.querys.urlStrToObj(parsedArray[10]),
      'anchor': parsedArray[9]
  };

  return urlObject;
};

Str.url.fix = function(str) {

  let url = String(str);

  if (url.indexOf('//') === 0) {

    return 'https:'.concat(url);
  } else if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {

    return url;
  } else if (url.indexOf('/') === 0) {

    return url;
  } else {

    return url;
  }
};

Str.trim = function(str, char=' ') {

  let nStr = String(str);

  // if (nStr.slice(0, 1) === char) {

  if (nStr[0] === char) {

    return Str.trim(nStr.slice(1), char);
  } else 

  // if (nStr.slice(-1) === char) {

  if (nStr[nStr.length - 1] === char) {

    return Str.trim(nStr.slice(0, -1), char);
  } else 

  return nStr;
};

module.exports = Str;
