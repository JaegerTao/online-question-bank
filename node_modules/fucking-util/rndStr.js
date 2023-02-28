'use strict';

const string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const map = string.split('');

const len = map.length;

function rndStr(size){

  (!size || isNaN(size) || size < 1 || size > len) && (size = 32);

  const tmp = size === len ? map : map.slice(0,size);

  const res = tmp.map(v=>map[Math.floor(Math.random() * len)]).join('');

  return res;
}

const extRndStr = rndStr;

module.exports = extRndStr;