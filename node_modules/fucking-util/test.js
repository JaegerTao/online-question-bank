
var Type = require ( './Type' );

console.log ( '------Type get Test------' );
console.log ( 'number', Type.get ( 1 ) );
console.log ( 'string', Type.get ( "1" ) );
console.log ( 'boolean', Type.get ( false ) );
console.log ( 'array', Type.get ( [ ] ) )
console.log ( 'object', Type.get ( { } ) );
console.log ( 'null', Type.get ( null ) );
console.log ( 'undefined', Type.get ( undefined ) );
console.log ( 'function', Type.get ( function(){} ) );
console.log ( 'NaN', Type.get ( NaN ) );
console.log ( 'infinity', Type.get ( Infinity ) );
console.log ( 'symbol', Type.get ( Symbol("test") ) );

console.log ( '------Type is Test------' );
console.log ( 'number', Type.number ( 1 ) );
console.log ( 'string', Type.string ( "1" ) );
console.log ( 'boolean', Type.boolean ( false ) );
console.log ( 'array', Type.array ( [ ] ) )
console.log ( 'object', Type.object ( { } ) );
console.log ( 'null', Type.null ( null ) );
console.log ( 'undefined', Type.undefined ( undefined ) );
console.log ( 'function', Type.function ( function(){} ) );
console.log ( 'NaN', Type.NaN ( NaN ) );
console.log ( 'infinity', Type.infinity ( Infinity ) );
console.log ( 'symbol', Type.symbol ( Symbol("test") ) );
console.log ( 'objectForce object', Type.objectForce( { } ) );
console.log ( 'objectForce array', Type.objectForce( [ ] ) );

console.log ( '------Type empty Test------' );
console.log ( 'number', Type.empty ( 1 ) );
console.log ( 'string', Type.empty ( "1" ) );
console.log ( 'string empty', Type.empty ( "" ) );
console.log ( 'boolean', Type.empty ( false ) );
console.log ( 'array', Type.empty ( [ 1 ] ) )
console.log ( 'array empty', Type.empty ( [ ] ) )
console.log ( 'object', Type.empty ( { x: 1 } ) );
console.log ( 'object empty', Type.empty ( { } ) );
console.log ( 'null', Type.empty ( null ) );
console.log ( 'undefined', Type.empty ( undefined ) );
console.log ( 'function', Type.empty ( function(){} ) );
console.log ( 'NaN', Type.empty ( NaN ) );
console.log ( 'infinity', Type.empty ( Infinity ) );
console.log ( 'symbol', Type.empty ( Symbol("test") ) );
